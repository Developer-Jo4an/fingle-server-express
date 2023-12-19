class ErrorServiceHandler {
    getUserInfo(e) {
        console.log('Add user info error', e.message)
        return { status: false, message: 'Failed to search user (500)' }
    }

    addTransaction(e) {
        console.log('Add transaction error', e.message)
        return { status: false, message: 'Failed to add transaction (500)' }
    }

    deleteTransaction(e) {
        console.log('Delete transaction error', e.message)
        return { status: false, message: 'Failed to delete transaction (500)' }
    }
    addAccount(e) {
        console.log('Add account error', e.message)
        return { status: false, message: 'Failed to add account (500)' }
    }
}

class ErrorControllerHandler {

}

module.exports = {
    ErrorServiceHandler: new ErrorServiceHandler(),
    ErrorControllerHandler: new ErrorControllerHandler()
}

