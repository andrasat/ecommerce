const mongoose =  require('mongoose')
let Schema = mongoose.Schema

const transactionSchema = new Schema ({
  customerId: { type: String, ref: 'Customer'},
  in_date: Date,
  item: [ {type: Schema.Types.ObjectId, ref: 'Item'} ]
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction