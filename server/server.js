const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = 3000 || process.env.PORT
const app = express()

mongoose.connect('mongodb://localhost/ecommerce_dummy')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=> {
  console.log('Mongo Database Connection established')
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

/* Routes */
const customer = require('./routes/customer')

app.use('/cust', customer)

app.listen(port)
console.log('Listening to '+port)