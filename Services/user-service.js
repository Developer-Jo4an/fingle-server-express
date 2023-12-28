const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { models } = require('../models/schemes/schemes')
const { Purpose, Account, Contribution, Investment, Debt, Transaction, Category } = models
const User = require('../models/user')
const { ErrorServiceHandler } = require('../error-handlers/error-handlers')
const {add} = require('nodemon/lib/rules');

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

    async addAccount(id, account) {
        try {
            if (
                typeof account.accountName === 'string'
                && account.accountName.length >= 1 && account.accountName.length <= 30
                && typeof account.count === 'number'
                && account.count !== 'NaN'
                && (account.accountType === 'cash' || account.accountType === 'card')
            ) {
                const userData = await User.findByIdAndUpdate(
                    { _id: new ObjectId(id) },
                    { $push: { accounts: {...account, deleted: true } } },
                    { new: true, projection: { accounts: 1 } }
                )
                const { accounts } = userData

                const checker = () => Array.isArray(accounts) || accounts.length

                if ( checker() ) return { status: true, accounts }
                else throw new Error('Incorrect account data from server!')

            } else throw new Error('Incorrect account data from client!')
        } catch (e) { return ErrorServiceHandler.addAccount(e) }
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

    async deleteAccount(id, accountId) {
        try {
            if (accountId === '260627062003200315265252') throw new Error('This account cannot be deleted!')

            const userData = await User.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $pull: { accounts: { _id: new ObjectId(accountId) } } },
                {
                    projection: { accounts: 1 },
                    new: true
                }
            )

            const checker = () => Array.isArray(userData.accounts) && userData.accounts.length > 0

            if ( checker() ) return { status: true, accounts: userData.accounts }
            else throw new Error('Checker was not passed (server)')

        } catch (e) { return ErrorServiceHandler.deleteAccount(e) }
    }

    async modifiedAccount(id, account) {
        try {
            const { _id } = account

            const delResult = await this.deleteAccount(id, _id)
            const addResult = await this.addAccount(id, account)

            if (delResult.status && addResult.status) {

                const userData = await User.findById({ _id: new ObjectId(id) }, { transactions: 1 })
                const { transactions } = userData

                const updatedTransactions = transactions.map(transaction => {
                    const { transactionType, transferAccount } = transaction
                    const currentId = transaction._id
                    const currentAccount = transaction.account

                    if ((transactionType === 'expense' || transactionType === 'income') && currentId === account._id)
                        return { ...transaction, account: { ...currentAccount, accountName: account.accountName }}
                    else if (transactionType === 'transfer') {
                        if (currentId === account._id) return { ...transaction, account: { ...currentAccount, accountName: account.accountName }}
                        if (transferAccount === account._id) return { ...transaction, transferAccount: { ...transferAccount, accountName: account.accountName }}
                    }
                })

                console.log(updatedTransactions)

                const lastUserData = await User.findByIdAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { transactions:  updatedTransactions } },
                    {
                        projection: { transactions: 1, accounts: 1 },
                        new: true
                    }
                )

                const checker = () => Array.isArray(lastUserData.transactions) && Array.isArray(lastUserData.accounts) && lastUserData.accounts.length

                if ( checker() ) return { status: true, transactions: lastUserData.transactions, accounts: userData.accounts }
                else throw new Error('Checker was not passed (server)')

            } else throw new Error('Del || Add action was destroyed!')

        } catch (e) { return ErrorServiceHandler.modifiedAccount(e) }
    }
}

module.exports = new UserService()