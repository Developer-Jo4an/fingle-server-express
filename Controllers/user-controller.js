const UserService = require('../Services/user-service')
const {indexPath} = require("../index-path/index-path")

const handleError = (e, res) => console.log('Error: ', e, res)


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

    async addTransaction(req, res) {
        try {
            const {id} = req.params
            !id ? res.status(404).json({message: 'Invalid id'}) : null

            const {transaction} = req.body

            const userData = await UserService.addTransaction(id, transaction)
            res.json(userData)
        } catch (e) {handleError(e, res)}
    }

    async deleteTransaction(req, res) {
        try {
            const {id, transactionId} = req.params
            !id ? res.status(404).json({message: 'Invalid id'}) : null
            !transactionId ? res.status(404).json({message: 'Invalid transaction id'}) : null
            const newTransactions = await UserService.deleteTransaction(id, transactionId)
            res.json(newTransactions)
        } catch (e) {handleError(e, res)}
    }
}

module.exports = new UserController()