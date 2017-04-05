const mongoose =  require('mongoose')
let Schema = mongoose.Schema

const itemsSchema = new Schema ({
  name: String,
  description: String,
  price: Number,
  img_url: String,
  stock: Number
})

const Item = mongoose.model('Item', itemsSchema)

module.exports = Item