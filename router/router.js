const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/user-controller')
// get
router.get('/:id', UserController.getStartPage)
router.get('/', (req, res) => {res.status(301).redirect('/6511a3840f9e98d5baa854eb')})
router.get('/get-user-info/:id', UserController.getUserInfo)
// post
router.post('/:id/get-transactions', UserController.getTransactions)
router.post('/:id/add-transaction', UserController.addTransaction)
//delete
router.delete('/:id/del-transaction', UserController.delTransaction)
module.exports = router

