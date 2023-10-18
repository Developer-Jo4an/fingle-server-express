const UserService = require('../Services/user-service')
const {indexPath} = require("../index-path/index-path")

const handleError = (e, res) => {
    res.status(500).json({message: e})
}

class UserController {
    async getStartPage(req, res) {
        try {res.sendFile(indexPath)}
        catch (e) {handleError(e, res)}
    }

    async getUserInfo(req, res) {
        try {
            const {id} = req.params
            !id ? res.status(404).json({message: 'Invalid id'}) : null
            const userData = await UserService.getUserInfo(id)
            res.json(userData)
        } catch (e) {handleError(e, res)}
    }

    async getTransactions(req, res) {
        try {
            const {id} = req.params
            !id ? res.status(404).json({message: 'Invalid id'}) : null
            const {interval} = req.body
            const transactions = await UserService.getTransactions(id, interval)
            res.json(transactions)
        } catch (e) {handleError(e, res)}
    }

    async addTransaction(req, res) {
        try {
            const {id} = req.params
            !id ? res.status(404).json({message: 'Invalid id'}) : null
            const {transaction} = req.body
            const newTransactions = await UserService.addTransaction(id, transaction)
            res.json(newTransactions)
        } catch (e) {handleError(e, res)}
    }
}

module.exports = new UserController()