const nowDate = new Date().toLocaleDateString().split('/').join('.')
const toDate = date => date.toLocaleDateString().split('/').join('.')

module.exports = {
    nowDate,
    toDate
}