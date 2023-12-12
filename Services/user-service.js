const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { models } = require('../models/schemes/schemes')
const { Purpose, Account, Contribution, Investment, Debt, Transaction, Category } = models
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
            const { account, count, transactionType, transferAccount } = transaction
            // functions
            const changes = () => ({
                expense: { $inc: { 'accounts.$[account].count': -count } },
                income: { $inc: { 'accounts.$[account].count': count } },
                transfer: {
                    $inc: {
                        'accounts.$[account].count': -count,
                        'accounts.$[transferAccount].count': count
                    }
                }
            })

            const settings = () => transactionType !== 'transfer' ?
                []
                :
                [{ 'transferAccount._id': new ObjectId(transferAccount._id) }]
            // functions
            const userData = await User.findOneAndUpdate(
                { _id: new ObjectId(id) },
                {
                    $push: { transactions: transaction },
                    ...changes()[transactionType]
                },
                {
                    new: true,
                    projection: { transactions: 1, accounts: 1 },
                    arrayFilters: [{ 'account._id': new ObjectId(account._id) }, ...settings()]
                }
            )

            const checker = () => Array.isArray(userData.transactions) && Array.isArray(userData.accounts)

            if ( checker() ) return { status: true, transactions: userData.transactions, accounts: userData.accounts }
            else throw new Error('Checker was not passed (server)')

        } catch (e) { return ErrorServiceHandler.addTransaction(e) }
    }

    async deleteTransaction(id, transactionId) {
        try {
            const remoteTransactions = await User.findOne(
                { _id: new ObjectId(id), 'transactions._id': new ObjectId(transactionId) },
                { 'transactions.$': 1 }
            )
            const remoteTransaction = remoteTransactions.transactions[0]
            const { transactionType, account, count, transferAccount } = remoteTransaction

            // functions
            const changes = () => {
                const settingsObj = { 'accounts.$[account].count': transactionType !== 'income' ? count : -count }
                transactionType === 'transfer' ?
                    settingsObj['accounts.$[accountTransfer].count'] = -count
                    :
                    null
                return { $inc: { ...settingsObj } }
            }
            const arrayFilters = () => {
                const array = [{ 'account._id': new ObjectId(account._id) }]
                transactionType === 'transfer' ?
                    array.push({ 'accountTransfer._id': new ObjectId(transferAccount._id) })
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
                    projection: { transactions: 1, accounts: 1 },
                    arrayFilters: arrayFilters(),
                    new: true
                }
            )

            const checker = () => Array.isArray(userData.transactions) && Array.isArray(userData.accounts)

            if ( checker() ) return { status: true, transactions: userData.transactions, accounts: userData.accounts }
            else throw new Error('Checker was not passed (server)')

        } catch (e) { return ErrorServiceHandler.deleteTransaction(e) }
    }
}

module.exports = new UserService()