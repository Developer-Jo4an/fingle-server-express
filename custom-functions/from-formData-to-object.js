const fromFormDataToObject = (data) => {
    const parsedData = {}
    for (let key in data) {
        let value = data[key]
        try {parsedData[key] = JSON.parse(value) }
        catch (e) { parsedData[key] = value }
    }
    return parsedData
}

module.exports = fromFormDataToObject