const base64Img = (img) => 'data:image/jpeg;base64,' + Buffer.from(img).toString('base64')

module.exports = base64Img