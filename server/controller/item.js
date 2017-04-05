const Item = require('../models/item')

module.exports = {

  createItem : (req, res)=> {
    let newItem = Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img_url: req.body.img_url,
      stock: req.body.stock
    })
    newItem.save((err)=> {
        if(err) {
          res.send(`Failed to add`)
        } else {
          res.send(`Item ${req.body.name} added to database`)
        }
    })
  },
  listItem : (req, res)=> {
    Item.find({}, (err, items)=> {
      if(err) {
        res.send('Request Data to server failed')
      } else {
        res.send(items)
      }
    })
  },
  deleteItem : (req, res)=> {
    Item.findByIdAndRemove(req.params.objectId, (err, item)=> {
      if(err){
        res.send('Delete item failed')
      } else {
        res.send(`Item ${item.name} deleted`)
      }
    })
  },
  editItem : (req, res)=> {
    Item.findOneAndUpdate(
      { _id: req.params.objectId},
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        img_url: req.body.img_url,
        stock: req.body.stock
      }, (err, item)=> {
        if(err) {
          res.send('Update item Failed')
        } else {
          res.send(`Item ${item.name} updated`)
        }
      }
    )
  }

}