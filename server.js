const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

const dotenv = require('dotenv')
dotenv.config()

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
       await mongoose.connect(process.env.DB)
       app.listen(PORT)
       console.log(`Server started on PORT ${PORT}`)
   } catch (e) { console.log(e) }
})()
