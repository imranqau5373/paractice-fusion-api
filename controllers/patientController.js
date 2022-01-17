const fs = require("fs");
const documentController = require('./documentController');
const docx = require("docx");
const { Document, Packer, Paragraph, TextRun } = docx;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.addNewPatientRecord = (req, response, next) => {
  MongoClient.connect(url, function(err, db) {
    console.log('New patient data.');
    console.log(req.body);
    const patientData = req.body;
    const dir = './public/patientRecords';
    createPatientRecordFolder(dir);
    const folderPath = createTodayFolder(dir);
    const filePath = getFilePath(folderPath,'new-patient');
    const consentPath = getConsentPath(folderPath);
    const signaturePath = getSignaturePath(folderPath);
    patientData.signaturePath = signaturePath;
    patientData.filePath = filePath;
    patientData.consentPath = consentPath;
    saveSignatureImage(patientData.signatureImg,signaturePath);
    if(patientData.adult == "Yes"){
      createConsentDoc(consentPath,patientData.fullName,patientData.guardianName,patientData.witnessName);
    }
    const doc = documentController.writeNewPatientData(patientData);
    try{
      Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(filePath, buffer);
        var dbo = db.db("mydb");
        dbo.collection("NewPatientRecords").insertOne(patientData, function(err, res) {
          if (err) throw err;
          console.log("New Patient Record Inserted");
          db.close();
          response.json('file created successfully.');
        });

    });
    }
    catch(e){
      console.log(e);
    }

  });



  };

  
exports.addExistingPatientRecord = (req, response, next) => {

    MongoClient.connect(url, function(err, db) {
      const patientData = req.body;
      const dir = './public/existingPatientRecords';
      const folderPath = createTodayFolder(dir);
      createPatientRecordFolder(folderPath);
      const filePath = getFilePath(folderPath,'existing-patient');
      const signaturePath = getSignaturePath(folderPath);
      const consentPath = getConsentPath(folderPath);
      patientData.signaturePath = signaturePath;
      patientData.filePath = filePath;
      patientData.consentPath = consentPath;
      saveSignatureImage(patientData.signatureImg,signaturePath);
      const doc = documentController.writeExistingPatientData(patientData);
      if(patientData.adult == "Yes"){
        createConsentDoc(consentPath,patientData.firstName+' '+patientData.lastName,patientData.guardianName,patientData.witnessName);
      }
      Packer.toBuffer(doc).then((buffer) => {
          fs.writeFileSync(filePath, buffer);
          var dbo = db.db("mydb");
          dbo.collection("ExistingPatientRecords").insertOne(patientData, function(err, res) {
            if (err) throw err;
            console.log("Existing Patient Record Inserted");
            db.close();
            response.json('existing patient created successfully.');
          });
      });
    });

  };

  exports.getAllNewPatients = (req, response, next) => {
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("mydb");
      dbo.collection("NewPatientRecords").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log("New Patient Record Inserted");
        db.close();
        response.json(result);
        });
    });
  
  };

  exports.getAllExistingPatients = (req, response, next) => {
    MongoClient.connect(url, function(err, db) {
      var dbo = db.db("mydb");
      dbo.collection("ExistingPatientRecords").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log("New Patient Record Inserted");
        db.close();
        response.json(result);
        });
    });
  
  };


  function createPatientRecordFolder(dir){

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
          recursive: true
      });
    }
  }

  function createConsentDoc(filePath,patientName,guardianName,witnessName){
    const doc = documentController.writeConsentForm(patientName,guardianName,witnessName);
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(filePath, buffer);
    });

  }

  function createTodayFolder(dir){

    var now = new Date();
    const today_folder = now.getFullYear() + "-"+ (now.getMonth()+1) + "-" + now.getDate();
      if (!fs.existsSync(dir+'/'+today_folder)) {
        fs.mkdirSync(dir+'/'+today_folder, {
          recursive: true
      });
    }
    return dir+'/'+today_folder;
}

function getFilePath(dir,fileStartName){
    var now = new Date();
    return dir + '/'+fileStartName+"-"+(now.getHours())+'-'+now.getMinutes()+'-'+now.getSeconds()+".docx";
}
function getConsentPath(dir){
  var now = new Date();
  return dir + '/consent-'+ (now.getHours())+'-'+now.getMinutes()+'-'+now.getSeconds()+".docx";
}

function getSignaturePath(dir){
  var now = new Date();
  return dir + '/signature-'+ (now.getHours())+'-'+now.getMinutes()+'-'+now.getSeconds()+".png";
}

function saveSignatureImage(imageData,path){
  var base64Data = imageData.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync(path, base64Data, 'base64', function(err) {
    console.log(err);
  });
}

