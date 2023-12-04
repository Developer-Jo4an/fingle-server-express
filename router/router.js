const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/user-controller')

// GET
router.get('/:id', UserController.getStartPage)
router.get('/get-user-info/:id', UserController.getUserInfo)
// POST
router.post('/:id/add-transaction', UserController.addTransaction)
// PUT
router.put('/:id/modified-transaction', UserController.modifiedTransaction)
// DELETE
router.delete('/:id/delete-transaction/:transactionId', UserController.deleteTransaction)
module.exports = router

