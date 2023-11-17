const dotenv = require('dotenv')
dotenv.config()
const PORT = 5000
const express = require('express')
const app = express()
const router = require('./router/router')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')

app.use(cors())
app.use(fileUpload({}))
app.use(express.json())
app.use(express.static('public'))
app.use(router)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

(async () => {
   try {
       await mongoose.connect('mongodb+srv://joh4n:Kot1902kot2606@fingle.kv5njwb.mongodb.net/?retryWrites=true&w=majority')
       await app.listen(PORT)
       console.log('Server started on port 5000')
   } catch (e) {console.log(e)}
})()
