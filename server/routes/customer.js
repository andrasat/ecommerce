var express = require('express');
var router = express.Router();
const Customer = require('../controller/customer')

/* GET users listing. */
router.get('/list', Customer.listCustomer);

/* POST user login */
router.post('/login',  Customer.signIn)

module.exports = router;
