var express = require('express')
var router = express.Router()
var User = require('../models/user')
var jwt = require('jsonwebtoken')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017/'

router.post('/register', function (req, res, next) {
  var user = {
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now(),
  };

  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('mydb')
    dbo
    .collection('User')
    .insertOne(user, function (err, result) {
      db.close()
      if (err){
        return res.status(501).json({ message: 'Error registering user.' })
      }
      else{
        return res.status(201).json(user);
      }
    })
  });
})

router.post('/login', function (req, res, next) {
  console.log('in login',req.body);
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('mydb')
    dbo
    .collection('User')
    .findOne({ email: req.body.email }, function (err, result) {
      db.close()
      if (err){
        return res.status(501).json({ message: 'Error registering user.' })
      }
      else{
        let token = jwt.sign({ username: doc.username }, 'secret', {
          expiresIn: '3600h',
        })

        return res.status(200).json(token);
      }
    })
  });

  // let promise = User.findOne({ email: req.body.email }).exec()

  // promise.then(function (doc) {
  //   if (doc) {
  //     if (doc.isValid(req.body.password)) {
  //       // generate token
  //       let token = jwt.sign({ username: doc.username }, 'secret', {
  //         expiresIn: '3h',
  //       })

  //       return res.status(200).json(token)
  //     } else {
  //       return res.status(401).json({ message: ' Invalid Credentials' })
  //     }
  //   } else {
  //     return res.status(501).json({ message: 'User email is not registered.' })
  //   }
  // })

  // promise.catch(function (err) {
  //   return res.status(501).json({ message: 'Some internal error' })
  // })
})

router.get('/username', verifyToken, function (req, res, next) {
  return res.status(200).json(decodedToken.username)
})

var decodedToken = ''
function verifyToken(req, res, next) {
  let token = req.query.token

  jwt.verify(token, 'secret', function (err, tokendata) {
    if (err) {
      return res.status(400).json({ message: ' Unauthorized request' })
    }
    if (tokendata) {
      decodedToken = tokendata
      next()
    }
  })
}

module.exports = router
