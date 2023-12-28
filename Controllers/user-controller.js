const UserService = require('../Services/user-service')
const { indexPath } = require("../index-path/index-path")

const handleError = (e, res) => console.log('Error: ', e, res)

class UserController {
    async getStartPage(req, res) {
        try { res.sendFile(indexPath) }
        catch (e) { handleError(e, res) }
    }

    async getUserInfo(req, res) {
        try {
            const { id } = req.params
            !id ? res.status(404).json({ message: 'Invalid id' }) : null

            const userData = await UserService.getUserInfo(id)

            res.json(userData)
        } catch (e) { handleError(e, res) }
    }

    async addTransaction(req, res) {
        try {
            const { id } = req.params
            !id ? res.status(404).json({ message: 'Invalid id' }) : null

            const { transaction } = req.body

            const userData = await UserService.addTransaction(id, transaction)

            res.json(userData)
        } catch (e) { handleError(e, res) }
    }

    async addAccount(req, res) {
        try {
            const { id } = req.params
            !id ? res.status(404).json({ message: 'Invalid id' }) : null

            const { account } = req.body

            const userData = await UserService.addAccount(id, account)

            res.json(userData)
        } catch (e) { handleError(e, res) }
    }

    async deleteTransaction(req, res) {
        try {
            const { id, transactionId } = req.params
            !id || !transactionId ? res.status(404).json({ message: 'Invalid id' }) : null

            const userData = await UserService.deleteTransaction(id, transactionId)

            res.json(userData)
        } catch (e) { handleError(e, res) }
    }

    async modifiedTransaction(req, res) {
        try { // Это нужно оптимизировать!
            const { id } = req.params
            const { modified } = req.body
            const transactionId = modified._id

            !id || !transactionId ? res.status(404).json({ message: 'Invalid id' }) : null

            const withoutId = {}
            for (const key in modified) if (key !== '_id') withoutId[key] = modified[key]

            await UserService.deleteTransaction(id, transactionId)
            const userData = await UserService.addTransaction(id, withoutId)

            res.json(userData)
        } catch (e) { handleError(e, res) }
    }

    async deleteAccount(req, res) {
        try {
            const { id, accountId } = req.params
            !id || !accountId ? res.status(404).json({ message: 'Invalid id' }) : null

            const userData = await UserService.deleteAccount(id, accountId)

            res.json(userData)

        } catch (e) { handleError(e, res) }
    }

    async modifiedAccount(req, res) {
        try {
            const { id } = req.params
            const { account } = req.body
            !id ? res.status(400).json({ message: 'Invalid id'}) : null

            const userData = await UserService.modifiedAccount(id, account)

            res.json(userData)
        } catch (e) { handleError(e, res) }
    }
}

module.exports = new UserController()