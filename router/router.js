const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/user-controller')

router.get('/:id', UserController.getStartPage)
router.get('/get-user-info/:id', UserController.getUserInfo)
router.post('/:id/add-transaction', UserController.addTransaction)
router.delete('/:id/delete-transaction/:transactionId', UserController.deleteTransaction)
module.exports = router

