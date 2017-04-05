const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {

  signIn : (req, res)=> {
    console.log(req.body)
    Customer.findOne({id : req.body.id}, (err, cust)=> {
      if(err) {
        res.send('Error finding data')
      } else if(cust){
        let token = jwt.sign({id: cust.id, name: cust.name}, process.env.SECRET_KEY)
        res.send(token)
      } else {
        let newCust = new Customer({
          id : req.body.id,
          name : req.body.name
        })
        newCust.save(function(err) {
          if(err) {
            res.send('Failed to add data')
          } else {
            let token = jwt.sign({id: req.body.id, name: req.body.name}, process.env.SECRET_KEY)
            res.send(token)
          }
        })
      }
    })
  },
  listCustomer : (req, res)=> {
    Customer.find({}, (err, customers)=> {
      if(err) {
        res.send('Request Data to server failed')
      } else {
        res.send(customers)
      }
    })
  }
}