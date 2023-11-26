class ErrorHandler {
    getUserInfo (e) {
        console.log('Add user info error', e)
        return { status: false, message: 'Failed to search user (500)' }
    }

    addTransaction(e) {
        console.log('Add transaction error', e)
        return { status: false, message: 'Failed to add transaction (500)' }
    }

    deleteTransaction () {}

    getStartPage () {}
}

module.exports = new ErrorHandler()