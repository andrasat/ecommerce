const mongoose =  require('mongoose')
let Schema = mongoose.Schema

const customerSchema = new Schema ({
  id : String,
  name : String
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer