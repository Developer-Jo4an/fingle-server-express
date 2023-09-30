const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/user-controller')

router.get('/:id', UserController.getStartPage)
router.get('/', (req, res) => {
    res.status(301).redirect('/6511a3840f9e98d5baa854eb')
})
router.get('/get-user-info/:id', UserController.getUserInfo)
router.post('/:id/get-transactions', UserController.getTransactions)
module.exports = router

