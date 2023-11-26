const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const {models} = require('../models/schemes/schemes')
const {Purpose, Card, Contribution, Investment, Debt, Transaction, Category} = models
const User = require('../models/user')

const ErrorHandler = require('../error-handler/error-handler')

const handleError = () => ({ message: 'Error 500(db)' })

class UserService {
    async getUserInfo (id) {
        try {
            const userInfo = await User.findById({ _id: new ObjectId(id) })
            if (userInfo._id) return { status: true, userInfo }
            else return { status: false, message: 'Failed to search data for id (500)'}
        }
        catch (e) { return ErrorHandler.getUserInfo(e) }
    }

    async addTransaction(id, transaction) {
        try {
            const {card, count, transactionType, transferCard } = transaction

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

            const checker = () => {
                return userData.transactions.length &&
                    Array.isArray(userData.transactions) &&
                    userData.allCards.length &&
                    Array.isArray(userData.allCards)
            }

            if ( checker() ) return { status: true, transactions: userData.transactions, allCards: userData.allCards }
            else return { status: false, message: 'Checker was not passed (server)' }
        } catch (e) { return ErrorHandler.addTransaction(e) }
    }

    async deleteTransaction(id, transactionId) {
        try {
            const userTransactionsData = await User.findByIdAndUpdate(
                {_id: new ObjectId(id) },
                { $pull: { transactions: { _id: transactionId} } },
                { new: true }
            )
            return userTransactionsData.transactions
        } catch (e) { handleError(e) }
    }
}

module.exports = new UserService()