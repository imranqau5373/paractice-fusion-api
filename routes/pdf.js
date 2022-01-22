const pdfContoller = require('../controllers/pdfController');
var express = require('express');
var router = express.Router();


router.get('/read',pdfContoller.readPdfDocument);

module.exports = router;