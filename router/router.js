const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/user-controller')

// GET
router.get('/:id', UserController.getStartPage)
router.get('/get-user-info/:id', UserController.getUserInfo)
// POST
router.post('/:id/add-transaction', UserController.addTransaction)
router.post('/:id/add-account', UserController.addAccount)
// PUT
router.put('/:id/modified-transaction', UserController.modifiedTransaction)
router.put('/:id/modified-account', UserController.modifiedAccount)
// DELETE
router.delete('/:id/delete-transaction/:transactionId', UserController.deleteTransaction)
router.delete('/:id/delete-account/:accountId', UserController.deleteAccount)
module.exports = router

