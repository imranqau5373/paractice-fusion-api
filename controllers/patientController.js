const fs = require('fs')
const documentController = require('./documentController')
const pdfController = require('./pdfController')
const docx = require('docx')
const { Document, Packer, Paragraph, TextRun } = docx
var MongoClient = require('mongodb').MongoClient
const res = require('express/lib/response')
var url = 'mongodb://localhost:27017/'

exports.addNewPatientRecord = (req, response, next) => {
  console.log('test new data')
  MongoClient.connect(url, function (err, db) {
    console.log('New patient data.')
    const patientData = req.body
    const dir = './public/patientRecords'
    createPatientRecordFolder(dir)
    const folderPath = createTodayFolder(dir)
    const filePath = getFilePath(folderPath, 'new-patient')
    const doctorFilePath = getPdfPath(folderPath, 'doctor-form')
    const signaturePath = getSignaturePath(folderPath)
    patientData.signaturePath = signaturePath
    patientData.filePath = filePath
    patientData.doctorFormPath = doctorFilePath
    saveSignatureImage(patientData.signatureImg, signaturePath)
    createDoctorForm(doctorFilePath, patientData)
    if (patientData.adult == 'No') {
      const consentPath = getConsentPath(folderPath)
      patientData.consentPath = consentPath
      createConsentDoc(
        consentPath,
        patientData.firstName + ' ' + patientData.lastName,
        patientData.guardianName,
        patientData.witnessName
      )
    }
    if (patientData.insurance == 'No') {
      const cashSuperBillFilePath = getPdfPath(folderPath, 'cash-super-bill')
      patientData.cashSuperBillFilePath = cashSuperBillFilePath
      createCashSuperBill(cashSuperBillFilePath, patientData)
    } else {
      const imigrationFilePath = getPdfPath(folderPath, 'imigration-file')
      patientData.imigrationFilePath = imigrationFilePath
      createImgrationForm(imigrationFilePath, patientData)
      patientData.isNewPatient = 'Yes'
      const insuranceFilePath = getPdfPath(folderPath, 'insurance-file')
      patientData.insuranceFilePath = insuranceFilePath
      createInsuranceForm(insuranceFilePath, patientData)
    }
    const doc = documentController.writeNewPatientData(patientData)
    try {
      Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(filePath, buffer)
        var dbo = db.db('mydb')
        patientData.signatureImg = null
        dbo
          .collection('NewPatientRecords')
          .insertOne(patientData, function (err, res) {
            if (err) throw err

            console.log('New Patient Record Inserted')
            // res.json('file created successfully.')

            db.close()
          })
      })
    } catch (e) {
      console.log(e)
    }
  })
}

exports.addExistingPatientRecord = (req, response, next) => {
  MongoClient.connect(url, function (err, db) {
    const patientData = req.body
    console.log(patientData.idCardPicturePath)
    const dir = './public/existingPatientRecords'
    const folderPath = createTodayFolder(dir)
    createPatientRecordFolder(folderPath)
    const filePath = getFilePath(folderPath, 'existing-patient')
    const signaturePath = getSignaturePath(folderPath)
    const consentPath = getConsentPath(folderPath)
    const guardianPath = getGuardianPath(folderPath)
    const doctorFilePath = getPdfPath(folderPath, 'doctor-form')
    patientData.signaturePath = signaturePath
    patientData.filePath = filePath
    patientData.consentPath = consentPath
    saveSignatureImage(patientData.signatureImg, signaturePath)
    const doc = documentController.writeExistingPatientData(patientData)
    createDoctorForm(doctorFilePath, patientData)
    if (patientData.adult == 'Yes') {
      const consentPath = getConsentPath(folderPath)
      patientData.consentPath = consentPath
      createConsentDoc(
        consentPath,
        patientData.firstName + ' ' + patientData.lastName,
        patientData.guardianName,

        patientData.witnessName
      )
    }
    if (patientData.reasonForVisit == 'Immigration') {
      const imigrationFilePath = getPdfPath(folderPath, 'imigration-file')
      patientData.imigrationFilePath = imigrationFilePath
      createImgrationForm(imigrationFilePath, patientData)
    }
    if (patientData.insurance == 'No') {
      const cashSuperBillFilePath = getPdfPath(folderPath, 'cash-super-bill')
      patientData.cashSuperBillFilePath = cashSuperBillFilePath
      createCashSuperBill(cashSuperBillFilePath, patientData)
    } else {
      patientData.isNewPatient = 'No'
      const insuranceFilePath = getPdfPath(folderPath, 'insurance-file')
      patientData.insuranceFilePath = insuranceFilePath
      createInsuranceForm(insuranceFilePath, patientData)
    }
    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(filePath, buffer)
      var dbo = db.db('mydb')
      patientData.signatureImg = null
      dbo
        .collection('ExistingPatientRecords')
        .insertOne(patientData, function (err, res) {
          if (err) throw err
          console.log('Existing Patient Record Inserted')
          db.close()
          response.json('existing patient created successfully.')
        })
    })
  })
}

exports.getAllNewPatients = (req, response, next) => {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('mydb')
    dbo
      .collection('NewPatientRecords')
      .find(
        {},
        {
          projection: {
            _id: false,
            firstName: true,
            lastName: true,
            email: true,
            dateOfBirth: true,
            insurance: true,
            filePath: true,
            insuranceFilePath: true,
            cashSuperBillFilePath: true,
            doctorFormPath: true,
            consentPath: true,
            someField: true,
            createdDate: true,
          },
        }
      )
      .toArray(function (err, result) {
        if (err) throw err
        console.log('New Patient Record Inserted')
        db.close()
        response.json(result)
      })
  })
}

exports.checkMRNNumber = (req, response, next) => {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('mydb')
    dbo
      .collection('NewPatientRecords')
      .find({ mrnNumber: req.params.mrn })
      .toArray(function (err, result) {
        if (err) throw err
        db.close()
        if (result && result.length == 0)
          response.status(400).json({ error: 'No mrn number found.' })
        else response.status(200).json({ data: result })
      })
  })
}
// Email  Already Exists
exports.checkEmail = (req, response, next) => {
  console.log(req.params.email)
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('mydb')
    dbo
      .collection('NewPatientRecords')
      .find({ email: req.params.email })
      .toArray(function (err, result) {
        if (err) throw err
        db.close()
        if (result && result.length == 0) {
          response.status(200).json({})
        } else {
          response.status(200).json({ error: 'This Email is Already Exist' })
        }
      })
  })
}

exports.getAllExistingPatients = (req, response, next) => {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('mydb')
    dbo
      .collection('ExistingPatientRecords')
      .find({})
      .toArray(function (err, result) {
        if (err) throw err
        console.log('New Patient Record Inserted')
        db.close()
        result.json(result)
      })
  })
}

function createPatientRecordFolder(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    })
  }
}

function createConsentDoc(filePath, patientName, guardianName, witnessName) {
  const doc = documentController.writeConsentForm(
    patientName,
    guardianName,
    witnessName
  )
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(filePath, buffer)
  })
}

function createImgrationForm(filePath, patientData) {
  pdfController.writeImigrationData(filePath, patientData)
}

function createInsuranceForm(filePath, patientData) {
  pdfController.writeInsuranceSuperBill(filePath, patientData)
}

function createCashSuperBill(filePath, patientData) {
  pdfController.writeCashSuperBill(filePath, patientData)
}

function createDoctorForm(filePath, patientData) {
  pdfController.writeDoctorData(filePath, patientData)
}

function createTodayFolder(dir) {
  var now = new Date()
  const today_folder =
    now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
  if (!fs.existsSync(dir + '/' + today_folder)) {
    fs.mkdirSync(dir + '/' + today_folder, {
      recursive: true,
    })
  }
  return dir + '/' + today_folder
}

function getFilePath(dir, fileStartName) {
  var now = new Date()
  return (
    dir +
    '/' +
    fileStartName +
    '-' +
    now.getHours() +
    '-' +
    now.getMinutes() +
    '-' +
    now.getSeconds() +
    '.docx'
  )
}

function getPdfPath(dir, fileStartName) {
  var now = new Date()
  return (
    dir +
    '/' +
    fileStartName +
    '-' +
    now.getHours() +
    '-' +
    now.getMinutes() +
    '-' +
    now.getSeconds() +
    '.pdf'
  )
}
function getConsentPath(dir) {
  var now = new Date()
  return (
    dir +
    '/consent-' +
    now.getHours() +
    '-' +
    now.getMinutes() +
    '-' +
    now.getSeconds() +
    '.docx'
  )
}

function getGuardianPath(dir) {
  var now = new Date()
  return (
    dir +
    '/guardian-' +
    now.getHours() +
    '-' +
    now.getMinutes() +
    '-' +
    now.getSeconds() +
    '.png'
  )
}

function getSignaturePath(dir) {
  var now = new Date()
  return (
    dir +
    '/signature-' +
    now.getHours() +
    '-' +
    now.getMinutes() +
    '-' +
    now.getSeconds() +
    '.png'
  )
}

function saveSignatureImage(imageData, path) {
  var base64Data = imageData.replace(/^data:image\/png;base64,/, '')
  fs.writeFileSync(path, base64Data, 'base64', function (err) {
    console.log(err)
  })
}

function saveGuardianImage(imageData, path) {
  var base64Data = imageData.replace(/^data:image\/png;base64,/, '')
  fs.writeFileSync(path, base64Data, 'base64', function (err) {
    console.log(err)
  })
}
