const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { models } = require('../models/schemes/schemes')
const { Purpose, Card, Contribution, Investment, Debt, Transaction, Category } = models
const User = require('../models/user')
const { ErrorServiceHandler } = require('../error-handlers/error-handlers')

class UserService {
    async getUserInfo (id) {
        try {
            const userInfo = await User.findById({ _id: new ObjectId(id) })
            if (userInfo._id) return { status: true, userInfo }
            else throw new Error('Failed to search data for id (500)')
        }
        catch (e) { return ErrorServiceHandler.getUserInfo(e) }
    }

    async addTransaction(id, transaction) {
        try {
            const { card, count, transactionType, transferCard } = transaction
            // functions
            const changes = () => ({
                expense: { $inc: { 'allCards.$[card].count': -count } },
                income: { $inc: { 'allCards.$[card].count': count } },
                transfer: {
                    $inc: {
                        'allCards.$[card].count': -count,
                        'allCards.$[transferCard].count': count
                    }
                }
            })

            const settings = () => transactionType !== 'transfer' ?
                []
                :
                [{ 'transferCard._id': new ObjectId(transferCard._id) }]
            // functions
            const userData = await User.findOneAndUpdate(
                { _id: new ObjectId(id) },
                {
                    $push: { transactions: transaction },
                    ...changes()[transactionType]
                },
                {
                    new: true,
                    projection: { transactions: 1, allCards: 1 },
                    arrayFilters: [{ 'card._id': new ObjectId(card._id) }, ...settings()]
                }
            )

            const checker = () => Array.isArray(userData.transactions) && Array.isArray(userData.allCards)

            if ( checker() ) return { status: true, transactions: userData.transactions, allCards: userData.allCards }
            else throw new Error('Checker was not passed (server)')

        } catch (e) { return ErrorServiceHandler.addTransaction(e) }
    }

    async deleteTransaction(id, transactionId) {
        try {
            const remoteTransactions = await User.findOne(
                { _id: new ObjectId(id), "transactions._id": new ObjectId(transactionId) },
                { 'transactions.$': 1 }
            )
            const remoteTransaction = remoteTransactions.transactions[0]
            const { transactionType, card, count, transferCard } = remoteTransaction

            // functions
            const changes = () => {
                const settingsObj = { 'allCards.$[card].count': transactionType !== 'income' ? count : -count }
                transactionType === 'transfer' ?
                    settingsObj['allCards.$[cardTransfer].count'] = -count
                    :
                    null
                return { $inc: { ...settingsObj } }
            }
            const arrayFilters = () => {
                const array = [{ 'card._id': new ObjectId(card._id) }]
                transactionType === 'transfer' ?
                    array.push({ 'cardTransfer._id': new ObjectId(transferCard._id) })
                    :
                    null
                return array
            }
            // functions

            const userData = await User.findOneAndUpdate(
                { _id: new ObjectId(id) },
                {
                    $pull: { transactions: { _id: new ObjectId(transactionId) } },
                    ...changes()
                },
                {
                    projection: { transactions: 1, allCards: 1 },
                    arrayFilters: arrayFilters(),
                    new: true
                }
            )

            const checker = () => Array.isArray(userData.transactions) && Array.isArray(userData.allCards)

            if ( checker() ) return { status: true, transactions: userData.transactions, allCards: userData.allCards }
            else throw new Error('Checker was not passed (server)')

        } catch (e) { return ErrorServiceHandler.deleteTransaction(e) }
    }
}

module.exports = new UserService()