const res = require('express/lib/response')
const fs = require('fs')
const pdfDoc = require('pdf-lib')
const { degrees, PDFDocument, rgb, StandardFonts } = pdfDoc
exports.readPdfDocument = (req, res, next) => {
  modifyPdf()
  res.json('read the pdf file')
}

async function modifyPdf() {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/imigration.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  const fields = form.getFields()
  fields.forEach((field) => {
    const name = field.getName()
    console.log('Field name:', name)
  })
  // const textField = form.getTextField('form1[0].#subform[0].Pt1Line1c_MiddleName[0]');
  // textField.setText('Imran khan')
  // const textField = form.createTextField('best.gundam')
  // textField.setText('Exia')
  // fs.writeFileSync('./public/patientRecords/imigration-latest.pdf', await pdfDoc.save({updateFieldAppearances: false}));
  //const pdfBytes = await pdfDoc.save()
}

exports.writeImigrationData = (filePath, patientData) => {
  writeImigrationData(filePath, patientData)
}

exports.writeDoctorData = (filePath, patientData) => {
  writeDoctorData(filePath, patientData)
}

exports.writeCashSuperBill = (filePath, patientData) => {
  writeCashSuperBill(filePath, patientData)
}

exports.writeInsuranceSuperBill = (filePath, patientData) => {
  insuranceSuperBill(filePath, patientData)
}

async function writeImigrationData(filePath, patientData) {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/imigration.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  const lastNameTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line1a_FamilyName[0]'
  )
  lastNameTextField.setText(patientData.lastName)
  const cityOfBirthTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line1a_FamilyName[0]'
  )
  cityOfBirthTextField.setText(patientData.cityOfBirth)
  const countryOfBirthTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line9_CountryofBirth[0]'
  )
  countryOfBirthTextField.setText(patientData.countryOfBirth)
  const imgNumberTextField = form.getTextField(
    'form1[0].#subform[0].#area[0].Pt1Line3e_AlienNumber[0]'
  )
  imgNumberTextField.setText(patientData.imgNumber)
  const firstNameTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line1b_GivenName[0]'
  )
  firstNameTextField.setText(patientData.firstName)
  const middleNameTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line1c_MiddleName[0]'
  )
  middleNameTextField.setText(patientData.middleName)
  const addressTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line2_StreetNumberName[0]'
  )
  addressTextField.setText(patientData.address)
  const ssnTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line2_AptSteFlrNumber[0]'
  )
  ssnTextField.setText('123456')
  const daytimePhoneTextField = form.getTextField(
    'form1[0].#subform[1].Pt2Line2_DaytimePhone[0]'
  )
  daytimePhoneTextField.setText(patientData.dayTimePhoneNo)
  const dayTimeMobileField = form.getTextField(
    'form1[0].#subform[1].Pt2Line3_Mobilephone[0]'
  )
  dayTimeMobileField.setText(patientData.mobilePhoneNo)
  const emailTextField = form.getTextField(
    'form1[0].#subform[1].Pt2Line4_EmailAddress[0]'
  )
  emailTextField.setText(patientData.email)
  const zipCodeTextField = form.getTextField(
    'form1[0].#subform[0].P1Line2_ZipCode[0]'
  )
  zipCodeTextField.setText(patientData.zipCodeTextField)
  if (patientData.gender == 'Male') {
    const maleCheckBox = form.getCheckBox(
      'form1[0].#subform[0].Pt1Line3_Gender[0]'
    )
    maleCheckBox.check()
  } else {
    const femaleCheckBox = form.getCheckBox(
      'form1[0].#subform[0].Pt1Line3_Gender[1]'
    )
    femaleCheckBox.check()
  }
  const dobTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line7_DateOfBirth[0]'
  )
  dobTextField.setText(patientData.dateOfBirth)
  const birthCityTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line8_CityTownVillageofBirth[0]'
  )
  birthCityTextField.setText(patientData.city)
  const cityTextField = form.getTextField(
    'form1[0].#subform[0].P1Line2_CityOrTown[0]'
  )
  cityTextField.setText(patientData.city)
  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
}

async function writeCashSuperBill(filePath, patientData) {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/cashSuperBill.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  const lastNameTextField = form.getTextField('LAST NAME')
  lastNameTextField.setText(patientData.lastName)
  const firstNameTextField = form.getTextField('FIRST NAME')
  firstNameTextField.setText(patientData.firstName)
  // middle Name
  const middleNameTextField = form.getTextField('MIDDLE NAME')
  if ((patientData.middleName = '')) {
    middleNameTextField.setText('')
  } else {
    middleNameTextField.setText(patientData.middleName)
  }

  const dateTextField = form.getTextField('DATE')
  const d = new Date()
  let day = d.getDay()
  let month = d.getMonth()
  let year = d.getFullYear()
  dateTextField.setText(day + '/' + month + '/' + year)

  const timeTextField = form.getTextField('TIME')
  const date = new Date()
  let hours = date.getUTCHours()
  let min = date.getUTCMinutes()
  let sec = date.getUTCSeconds()

  timeTextField.setText(hours + ':' + min + ':' + sec)

  const gender = form.getTextField('SEX')
  gender.setText(patientData.gender)
  const dobTextField = form.getTextField('DOB')
  dobTextField.setText(patientData.dateOfBirth)
  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
}

async function writeDoctorData(filePath, patientData) {
  console.log('In write docotr data.')
  console.log('In write imigration data with doctor data.', patientData)

  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/doctorForm.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  const firstName = form.getTextField('PT FIRST NAME')
  firstName.setText(patientData.firstName)
  const lastName = form.getTextField('PT LAST NAME')
  lastName.setText(patientData.lastName)
  const gender = form.getTextField('GENDER')
  console.log(patientData.gender)
  gender.setText(patientData.gender)
  //Reason of Visit
  const reasonTextField = form.getTextField('CHIEF COMPLAINT')
  reasonTextField.setText(patientData.reasonForVisitOther)
  const dobTextField = form.getTextField('DOB')
  dobTextField.setText(patientData.dateOfBirth)
  const ageTextField = form.getTextField('AGE')
  ageTextField.setText(getAge(patientData.dateOfBirth))
  //ageTextField.setText('12');
  const dateTextField = form.getTextField('DATE')
  const d = new Date()
  dateTextField.setText(d.toString())
  const timeTextField = form.getTextField('TIME')
  timeTextField.setText(
    d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()
  )
  /// Alergic
  const alergiesTextField = form.getTextField('ALLERGIES')
  if ((patientData.alergic = 'No')) {
    alergiesTextField.setText(patientData.alergic)
  } else {
    alergiesTextField.setText(
      patientData.alergic + ',' + patientData.alergicExplain
    )
  }
  // Medical Family History
  const familyMedicialHistoryTextField = form.getTextField(
    'FAMILY MEDICAL HISTORY'
  )
  familyMedicialHistoryTextField.setText(
    patientData.familyMedicialHistory &&
      patientData.familyMedicialHistory != undefined &&
      patientData.familyMedicialHistory != 'undefined'
      ? patientData.familyMedicialHistory
      : ''
  )

  // Surgeries
  const surgeriesTextField = form.getTextField('SURGERIES')
  surgeriesTextField.setText(
    patientData.surgery == 'No'
      ? patientData.surgery
      : patientData.surgeryExplain
  )
  //Smoke
  const smokingTextField = form.getTextField('SMOKING')
  if (patientData.smoke == 'No') {
    smokingTextField.setText(patientData.smoke)
  } else {
    smokingTextField.setText(patientData.smokeExplain)
  }
  // Tobacco
  const tbaccoTextField = form.getTextField('TOBACCO')
  if (patientData.tobacco == 'No') {
    tbaccoTextField.setText(patientData.tobacco)
  } else {
    tbaccoTextField.setText(patientData.tobaccoExplain)
  }
  // Alcohol
  const alcoholTextField = form.getTextField('ALCOHOL')
  alcoholTextField.setText(
    patientData.alcohol == 'No'
      ? patientData.alcohol
      : patientData.alcoholExplain
  )

  const drugsTextField = form.getTextField('DRUGS')
  drugsTextField.setText(
    patientData.drugs == 'No' ? patientData.drugs : patientData.drugsExplain
  )
  // Marital Status
  const marriedTextField = form.getTextField('MARRIED')

  marriedTextField.setText(
    patientData.maritalStatus &&
      patientData.maritalStatus != undefined &&
      patientData.maritalStatus != 'undefined'
      ? patientData.maritalStatus
      : ''
  )

  // Empty values of Undefined Medications
  const medicationListTextField = form.getTextField('MEDICATIONS')
  medicationListTextField.setText(
    patientData.medicationList &&
      patientData.medicationList != undefined &&
      patientData.medicationList != 'undefined'
      ? patientData.medicationList
      : ''
  )

  // Empty values of Undefined Pharmacy Name
  const pharmacyNameTextField = form.getTextField('PHARMACY NAME 1')
  pharmacyNameTextField.setText(
    patientData.pharmacyName &&
      patientData.pharmacyName != undefined &&
      patientData.pharmacyName != 'undefined'
      ? patientData.pharmacyName
      : ''
  )

  // Empty Value of Undefined Pharmacy Street
  const streetPharmacyTextField = form.getTextField('CROSS STREETS')
  streetPharmacyTextField.setText(
    patientData.streetPharmacy &&
      patientData.streetPharmacy != undefined &&
      patientData.streetPharmacy != 'undefined'
      ? patientData.streetPharmacy
      : ''
  )

  if (patientData.gender == 'Male') {
    const maleLastPsaTextField = form.getTextField('MALES LAST PSA')
    maleLastPsaTextField.setText(patientData.ProstateExamDate)
  } else {
    const lmpPregnantTextField = form.getTextField('LMP PREGNANT')
    if (patientData.pregnant == 'No') {
      lmpPregnantTextField.setText(patientData.pregnant)
    } else {
      lmpPregnantTextField.setText(patientData.pregnantMonths)
    }

    const breastFeedingTextField = form.getTextField('BREAST FEEDINGLACTATING')
    breastFeedingTextField.setText(patientData.breastFeeding)
    const lastMamoTextField = form.getTextField('LAST MAMMO')
    lastMamoTextField.setText(
      patientData.lastMammogram &&
        patientData.lastMammogram != undefined &&
        patientData.lastMammogram != 'undefined'
        ? patientData.lastMammogram
        : ''
    )
    const lastPapTextField = form.getTextField('LAST PAPSMEAR')
    lastPapTextField.setText(
      patientData.lastmenstrualPeriod &&
        patientData.lastmenstrualPeriod != undefined &&
        patientData.lastmenstrualPeriod != 'undefined'
        ? patientData.lastmenstrualPeriod
        : ''
    )
  }

  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
  //const pdfBytes = await pdfDoc.save()
}

async function insuranceSuperBill(filePath, patientData) {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/insurace-superbill.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  const lastNameTextField = form.getTextField('LAST NAME')
  lastNameTextField.setText(patientData.lastName)
  const firstNameTextField = form.getTextField('FIRST NAME')
  firstNameTextField.setText(patientData.firstName)
  const middleNameTextField = form.getTextField('MIDDLE NAME')
  middleNameTextField.setText(
    patientData.middleName &&
      patientData.middleName != undefined &&
      patientData.middleName != 'undefined'
      ? patientData.middleName
      : ''
  )

  const phoneNumberTextField = form.getTextField('PHONE NUMBER')
  phoneNumberTextField.setText(
    patientData.mobilePhoneNo &&
      patientData.mobilePhoneNo != undefined &&
      patientData.mobilePhoneNo != 'undefined'
      ? patientData.mobilePhoneNo
      : ''
  )

  const alergiesTextField = form.getTextField('ALLERGIES')
  alergiesTextField.setText(patientData.alergic)
  const pharmacyNameTextField = form.getTextField('PHARMACY NAME')
  pharmacyNameTextField.setText(
    patientData.pharmacyName &&
      patientData.pharmacyName != undefined &&
      patientData.pharmacyName != 'undefined'
      ? patientData.pharmacyName
      : ''
  )

  const ptYesNoTextField = form.getTextField('NEW PATIENT YES OR NO')
  ptYesNoTextField.setText(patientData.isNewPatient)
  // Date
  const dateTextField = form.getTextField('DATE')
  const d = new Date()
  let day = d.getDay()
  let month = d.getMonth()
  let year = d.getFullYear()
  dateTextField.setText(day + '/' + month + '/' + year)
  // Time
  const timeTextField = form.getTextField('TIME IN')
  const date = new Date()
  let hours = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  timeTextField.setText(hours + ':' + min + ':' + sec)

  const gender = form.getTextField('SEX')
  gender.setText(patientData.gender)
  const dobTextField = form.getTextField('DOB')
  dobTextField.setText(patientData.dateOfBirth)
  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
}

function getAge(dateString) {
  var today = new Date()
  var birthDate = new Date(dateString)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age.toString()
}
