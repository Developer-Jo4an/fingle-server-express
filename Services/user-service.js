const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const {models} = require('../models/schemes/schemes')
const {Purpose, Card, Contribution, Investment, Debt, Transaction, Category} = models
const User = require('../models/user')

const handleError = (e) => {
    console.error(e)
    return {message: 'Error 500(db)'}
}

class UserService {
    async getUserInfo (id) {
        try {
            const userData = await User.findById({_id: new ObjectId(id)})
            return userData
        } catch (e) {handleError(e)}
    }

    async getTransactions(id, interval) {
        try {
            const formattedInterval = interval.map(date => new Date(date))
            const userTransactionsData = await User.findById({_id: new ObjectId(id)}, {transactions: 1})
            const transactions = userTransactionsData.transactions
            return transactions.filter(transaction => transaction.date >= formattedInterval[0] && transaction.date <= formattedInterval[1])

        } catch (e) {handleError(e)}
    }
}

module.exports = new UserService()