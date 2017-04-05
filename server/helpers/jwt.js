const jwt = require('jsonwebtoken')

module.exports = {

  verifyCust: (req, res, next)=> {
    jwt.verify(localStorage.token, process.env.SECRET_KEY, (err, verified)=> {
      if(verified) {
        next()
      } else {
        res.send('Login Failed')
      }
    })
  }
}