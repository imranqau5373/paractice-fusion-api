var express = require('express');
var router = express.Router();
const multer = require('multer');

var fileExtension = require('file-extension');
const PATH = './uploads';
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, PATH)
    },
  
    // Setting name of file saved
    filename: function (req, file, cb) {
        try{
            console.log(file.originalname);
            console.log(req.body.adult);
            if(req.body.insuranceForntPath && req.body.insuranceForntPath.includes(file.originalname)){
                cb(null, req.body.insuranceForntPath+ '.' + fileExtension(file.originalname))
            }
            else if(req.body.insuranceBackPath && req.body.insuranceBackPath.includes(file.originalname)){
                cb(null, req.body.insuranceBackPath+ '.' + fileExtension(file.originalname))
            }
            else if(req.body.adult == "No" && req.body.guardianIdPath && req.body.guardianIdPath.includes(file.originalname)){
                cb(null, req.body.guardianIdPath+ '.' + fileExtension(file.originalname))
            }
            else if(req.body.idCardPicturePath && req.body.idCardPicturePath.includes(file.originalname)){
                cb(null, req.body.idCardPicturePath+ '.' + fileExtension(file.originalname))
            }
        }
        catch(e){
            console.log(e);
        }



    }
  })
  
  var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
  })

const patientController = require('../controllers/patientController');
const { typedArrayFor } = require('pdf-lib');


router.post('/addNewPatient',upload.array("file"),patientController.addNewPatientRecord);

router.post('/addExistingPatient',upload.array("file"),patientController.addExistingPatientRecord);

router.get('/getAllNewPatients',patientController.getAllNewPatients);

router.get('/getAllExistingPatients',patientController.getAllExistingPatients);



module.exports = router;
