var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017/mydb'
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/SWU', { useUnifiedTopology: true,useNewUrlParser: true })
//mongoose.connect('mongodb://localhost:27017/mydb', { useUnifiedTopology: true,useNewUrlParser: true })

var cors = require('cors')

var indexRouter = require('./routes/index')
var patientRouter = require('./routes/patient')
var pdfRouter = require('./routes/pdf')
var usersRouter = require('./routes/users')

const bodyParser = require('body-parser')
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

// MongoClient.connect(url, function (err, db) {
// if (err) throw err
// console.log('Database created!')
// db.close()
// })

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use('/', indexRouter)
app.use('/patient', patientRouter)
app.use('/pdf', pdfRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
