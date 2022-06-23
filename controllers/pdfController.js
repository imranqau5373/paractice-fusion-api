const { time } = require('console')
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
    fs.readFileSync('./public/pdfFile/medicalexamination.pdf'),
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

/* Sport School Physical */
exports.writeSchoolData = (filePath, patientData) => {
  writeSchoolData(filePath, patientData)
}
/*  */
/* Covid */
exports.writeCovidData = (filePath, patientData) => {
  writeCovidData(filePath, patientData)
}
/*  */

/* Medical Certificate */
exports.writeMedicalCertificateData = (filePath, patientData) => {
  writeMedicalCertificateData(filePath, patientData)
}

exports.writeMedicalExaminationData = (filePath, patientData) => {
  writeMedicalExaminationData(filePath, patientData)
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

/* Write Sport School  */
async function writeSchoolData(filePath, patientData) {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/msportphysical.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  const firstName = form.getTextField('Name')
  firstName.setText(patientData.firstName)
  const gender = form.getTextField('Sex')
  gender.setText(patientData.gender)
  const phoneNumberTextField = form.getTextField('Phone2')
  phoneNumberTextField.setText(
    patientData.mobilePhoneNo &&
      patientData.mobilePhoneNo != undefined &&
      patientData.mobilePhoneNo != 'undefined'
      ? patientData.mobilePhoneNo
      : ''
  )

  const dobTextField = form.getTextField('Date of Birth')
  dobTextField.setText(patientData.dateOfBirth)

  const ageTextField = form.getTextField('Age')
  ageTextField.setText(getAge(patientData.dateOfBirth))

  const addressText = form.getTextField('Address')
  addressText.setText(patientData.inputAddress)

  const grade = form.getTextField('Grade')
  grade.setText(
    patientData.grade &&
      patientData.grade != undefined &&
      patientData.grade != 'undefined'
      ? patientData.grade
      : ''
  )

  const school = form.getTextField('School')
  school.setText(
    patientData.school &&
      patientData.school != undefined &&
      patientData.school != 'undefined'
      ? patientData.school
      : ''
  )

  const dateTextField = form.getTextField('Date of Examination')
  const d = new Date()
  dateTextField.setText(
    d.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )
  const emergencyName = form.getTextField('EmergencyName')
  emergencyName.setText(
    patientData.emergencyName &&
      patientData.emergencyName != undefined &&
      patientData.emergencyName != 'undefined'
      ? patientData.emergencyName
      : ''
  )

  const relationship = form.getTextField('Relationship')
  relationship.setText(
    patientData.emergencyRelation &&
      patientData.emergencyRelation != undefined &&
      patientData.emergencyRelation != 'undefined'
      ? patientData.emergencyRelation
      : ''
  )

  const contactPhone = form.getTextField('PhoneH')
  contactPhone.setText(
    patientData.emergencyPhone &&
      patientData.emergencyPhone != undefined &&
      patientData.emergencyPhone != 'undefined'
      ? patientData.emergencyPhone
      : ''
  )

  if (patientData.stdIllness == 'Yes') {
    const illnessCheckBox = form.getCheckBox('Check Box101')
    illnessCheckBox.check()
  } else {
    const noillnessCheckBox = form.getCheckBox('Check Box102')
    noillnessCheckBox.check()
  }

  /*  */
  if (patientData.stdHospitalized == 'Yes') {
    const HospitalizedCheckBox = form.getCheckBox('Check BoxA')
    HospitalizedCheckBox.check()
  } else {
    const noHospitalizedCheckBox = form.getCheckBox('Check Box104')
    noHospitalizedCheckBox.check()
  }
  /*  */
  if (patientData.stdSurgery == 'Yes') {
    const SurgeryCheckBox = form.getCheckBox('81')
    SurgeryCheckBox.check()
  } else {
    const noSurgeryCheckBox = form.getCheckBox('82')
    noSurgeryCheckBox.check()
  }
  /*  */
  if (patientData.stdHeartTest == 'Yes') {
    const HeartTestCheckBox = form.getCheckBox('83')
    HeartTestCheckBox.check()
  } else {
    const noHeartTestCheckBox = form.getCheckBox('84')
    noHeartTestCheckBox.check()
  }

  /*  */
  if (patientData.stdPassedOutEx == 'Yes') {
    const PassedOutExCheckBox = form.getCheckBox('Check Box3')
    PassedOutExCheckBox.check()
  } else {
    const noPassedOutExCheckBox = form.getCheckBox('1')
    noPassedOutExCheckBox.check()
  }
  /*  */
  if (patientData.stdChestPainEx == 'Yes') {
    const ChestPainExCheckBox = form.getCheckBox('Check Box2')
    ChestPainExCheckBox.check()
  } else {
    const noChestPainExCheckBox = form.getCheckBox('Check Box4')
    noChestPainExCheckBox.check()
  }
  /*  */
  if (patientData.stdTiredQuicklyEx == 'Yes') {
    const TiredQuicklyExCheckBox = form.getCheckBox('Check Box5')
    TiredQuicklyExCheckBox.check()
  } else {
    const noTiredQuicklyExCheckBox = form.getCheckBox('Check Box6')
    noTiredQuicklyExCheckBox.check()
  }
  /*  */
  if (patientData.stdSkipHeartbeatEx == 'Yes') {
    const SkipHeartbeatExCheckBox = form.getCheckBox('Check Box7')
    SkipHeartbeatExCheckBox.check()
  } else {
    const noSkipHeartbeatExCheckBox = form.getCheckBox('Check Box8')
    noSkipHeartbeatExCheckBox.check()
  }
  /*  */
  if (patientData.stdHighBlood == 'Yes') {
    const HighBloodCheckBox = form.getCheckBox('Check Box9')
    HighBloodCheckBox.check()
  } else {
    const noHighBloodCheckBox = form.getCheckBox('10')
    noHighBloodCheckBox.check()
  }
  /*  */
  if (patientData.stdHeartMurmur == 'Yes') {
    const HeartMurmurCheckBox = form.getCheckBox('11')
    HeartMurmurCheckBox.check()
  } else {
    const noHeartMurmurCheckBox = form.getCheckBox('12')
    noHeartMurmurCheckBox.check()
  }
  /*  */
  if (patientData.stdHeartProblemDeath == 'Yes') {
    const HeartProblemDeathCheckBox = form.getCheckBox('13')
    HeartProblemDeathCheckBox.check()
  } else {
    const noHeartProblemDeathCheckBox = form.getCheckBox('14')
    noHeartProblemDeathCheckBox.check()
  }
  /*  */
  if (patientData.stdFamilyHeartProblem == 'Yes') {
    const FamilyHeartProblemCheckBox = form.getCheckBox('2')
    FamilyHeartProblemCheckBox.check()
  } else {
    const noFamilyHeartProblemCheckBox = form.getCheckBox('3')
    noFamilyHeartProblemCheckBox.check()
  }
  /*  */
  if (patientData.stdViralInfection == 'Yes') {
    const ViralInfectionCheckBox = form.getCheckBox('4')
    ViralInfectionCheckBox.check()
  } else {
    const noViralInfectionCheckBox = form.getCheckBox('5')
    noViralInfectionCheckBox.check()
  }
  /*  */
  if (patientData.stdDenied == 'Yes') {
    const DeniedCheckBox = form.getCheckBox('6')
    DeniedCheckBox.check()
  } else {
    const noDeniedCheckBox = form.getCheckBox('7')
    noDeniedCheckBox.check()
  }

  /*  */
  if (patientData.stdHeadInjury == 'Yes') {
    const HeadInjuryCheckBox = form.getCheckBox('8')
    HeadInjuryCheckBox.check()
  } else {
    const noHeadInjuryCheckBox = form.getCheckBox('9')
    noHeadInjuryCheckBox.check()
  }
  /*  */
  if (patientData.stdMemoryLoss == 'Yes') {
    const MemoryLossCheckBox = form.getCheckBox('15')
    MemoryLossCheckBox.check()
  } else {
    const noMemoryLossCheckBox = form.getCheckBox('16')
    noMemoryLossCheckBox.check()
  }
  /*  */
  /*  */
  /*  */
  /*  */
  if (patientData.stdSeizure == 'Yes') {
    const SeizureCheckBox = form.getCheckBox('17')
    SeizureCheckBox.check()
  } else {
    const noSeizureCheckBox = form.getCheckBox('18')
    noSeizureCheckBox.check()
  }
  /*  */
  if (patientData.stdHeadache == 'Yes') {
    const HeadacheCheckBox = form.getCheckBox('19')
    HeadacheCheckBox.check()
  } else {
    const noHeadacheCheckBox = form.getCheckBox('20')
    noHeadacheCheckBox.check()
  }
  /*  */
  if (patientData.stdNumbness == 'Yes') {
    const NumbnessCheckBox = form.getCheckBox('21')
    NumbnessCheckBox.check()
  } else {
    const noNumbnessCheckBox = form.getCheckBox('22')
    noNumbnessCheckBox.check()
  }
  /*  */
  if (patientData.stdPinchedNerve == 'Yes') {
    const PinchedNerveCheckBox = form.getCheckBox('23')
    PinchedNerveCheckBox.check()
  } else {
    const noPinchedNerveCheckBox = form.getCheckBox('24')
    noPinchedNerveCheckBox.check()
  }
  /*  */
  if (patientData.stdMissingOrgan == 'Yes') {
    const MissingOrganCheckBox = form.getCheckBox('25')
    MissingOrganCheckBox.check()
  } else {
    const noMissingOrganCheckBox = form.getCheckBox('26')
    noMissingOrganCheckBox.check()
  }
  /*  */
  if (patientData.stdUnderDrCare == 'Yes') {
    const UnderDrCareCheckBox = form.getCheckBox('27')
    UnderDrCareCheckBox.check()
  } else {
    const noUnderDrCareCheckBox = form.getCheckBox('28')
    noUnderDrCareCheckBox.check()
  }
  /*  */
  if (patientData.stdTakingMed == 'Yes') {
    const TakingMedCheckBox = form.getCheckBox('29')
    TakingMedCheckBox.check()
  } else {
    const noTakingMedCheckBox = form.getCheckBox('30')
    noTakingMedCheckBox.check()
  }
  /*  */
  if (patientData.stdAlergic == 'Yes') {
    const AlergicCheckBox = form.getCheckBox('31')
    AlergicCheckBox.check()
  } else {
    const noAlergicCheckBox = form.getCheckBox('32')
    noAlergicCheckBox.check()
  }
  /*  */
  if (patientData.stdDizzy == 'Yes') {
    const DizzyCheckBox = form.getCheckBox('33')
    DizzyCheckBox.check()
  } else {
    const noDizzyCheckBox = form.getCheckBox('34')
    noDizzyCheckBox.check()
  }
  /*  */
  if (patientData.stdSkinProblem == 'Yes') {
    const SkinProblemCheckBox = form.getCheckBox('35')
    SkinProblemCheckBox.check()
  } else {
    const noSkinProblemCheckBox = form.getCheckBox('36')
    noSkinProblemCheckBox.check()
  }
  /*  */
  if (patientData.stdIllnessInHeat == 'Yes') {
    const IllnessInHeatCheckBox = form.getCheckBox('37')
    IllnessInHeatCheckBox.check()
  } else {
    const noIllnessInHeatCheckBox = form.getCheckBox('38')
    noIllnessInHeatCheckBox.check()
  }

  /*  */
  if (patientData.stdEyeProblem == 'Yes') {
    const EyeProblemCheckBox = form.getCheckBox('39')
    EyeProblemCheckBox.check()
  } else {
    const noEyeProblemCheckBox = form.getCheckBox('40')
    noEyeProblemCheckBox.check()
  }
  /*  */
  if (patientData.stdBreathness == 'Yes') {
    const BreathnessCheckBox = form.getCheckBox('Check Boxb')
    BreathnessCheckBox.check()
  } else {
    const noBreathnessCheckBox = form.getCheckBox('41')
    noBreathnessCheckBox.check()
  }
  /*  */
  if (patientData.stdAsthma == 'Yes') {
    const AsthmaCheckBox = form.getCheckBox('42')
    AsthmaCheckBox.check()
  } else {
    const noAsthmaCheckBox = form.getCheckBox('43')
    noAsthmaCheckBox.check()
  }
  /*  */
  if (patientData.stdSeasonalAlergy == 'Yes') {
    const SeasonalAlergyCheckBox = form.getCheckBox('44')
    SeasonalAlergyCheckBox.check()
  } else {
    const noSeasonalAlergyCheckBox = form.getCheckBox('45')
    noSeasonalAlergyCheckBox.check()
  }
  /*  */
  if (patientData.stdProtective == 'Yes') {
    const ProtectiveCheckBox = form.getCheckBox('46')
    ProtectiveCheckBox.check()
  } else {
    const noProtectiveCheckBox = form.getCheckBox('47')
    noProtectiveCheckBox.check()
  }
  if (patientData.stdInjurySwelling == 'Yes') {
    const InjurySwellingCheckBox = form.getCheckBox('48')
    InjurySwellingCheckBox.check()
  } else {
    const noInjurySwellingCheckBox = form.getCheckBox('49')
    noInjurySwellingCheckBox.check()
  }

  if (patientData.stdFracturedBone == 'Yes') {
    const FracturedBoneCheckBox = form.getCheckBox('50')
    FracturedBoneCheckBox.check()
  } else {
    const noFracturedBoneCheckBox = form.getCheckBox('51')
    noFracturedBoneCheckBox.check()
  }
  if (patientData.stdMusclePain == 'Yes') {
    const MusclePainCheckBox = form.getCheckBox('52')
    MusclePainCheckBox.check()
  } else {
    const noMusclePainCheckBox = form.getCheckBox('53')
    noMusclePainCheckBox.check()
  }

  const stdFracturedHeadCheckBox = form.getCheckBox('54')
  patientData.stdFracturedHead == 'true' ? stdFracturedHeadCheckBox.check() : ''

  const FracturedNeckCheckBox = form.getCheckBox('55')
  patientData.stdFracturedNeck == 'true' ? FracturedNeckCheckBox.check() : ''

  const FracturedBackCheckBox = form.getCheckBox('56')
  patientData.stdFracturedBack == 'true' ? FracturedBackCheckBox.check() : ''

  const FracturedChestCheckBox = form.getCheckBox('57')
  patientData.stdFracturedChest == 'true' ? FracturedChestCheckBox.check() : ''

  const FracturedShoulderCheckBox = form.getCheckBox('58')
  patientData.stdFracturedShoulder == 'true'
    ? FracturedShoulderCheckBox.check()
    : ''
  const FracturedUpperarmCheckBox = form.getCheckBox('59')
  patientData.stdFracturedUpperarm == 'true'
    ? FracturedUpperarmCheckBox.check()
    : ''

  const FracturedElbowCheckBox = form.getCheckBox('60')
  patientData.stdFracturedElbow == 'true' ? FracturedElbowCheckBox.check() : ''
  const FracturedForearmCheckBox = form.getCheckBox('61')
  patientData.stdFracturedForearm == 'true'
    ? FracturedForearmCheckBox.check()
    : ''

  const FracturedWristCheckBox = form.getCheckBox('62')
  patientData.stdFracturedWrist == 'true' ? FracturedWristCheckBox.check() : ''

  const FracturedHandCheckBox = form.getCheckBox('63')
  patientData.stdFracturedHand == 'true' ? FracturedHandCheckBox.check() : ''

  const FracturedFingerCheckBox = form.getCheckBox('64')
  patientData.stdFracturedFinger == 'true'
    ? FracturedFingerCheckBox.check()
    : ''

  const FracturedFootCheckBox = form.getCheckBox('65')
  patientData.stdFracturedFoot == 'true' ? FracturedFootCheckBox.check() : ''

  const FracturedHipCheckBox = form.getCheckBox('66')
  patientData.stdFracturedHip == 'true' ? FracturedHipCheckBox.check() : ''

  const FracturedThighCheckBox = form.getCheckBox('67')
  patientData.stdFracturedThigh == 'true' ? FracturedThighCheckBox.check() : ''

  const FracturedKneeCheckBox = form.getCheckBox('68')
  patientData.stdFracturedKnee == 'true' ? FracturedKneeCheckBox.check() : ''

  const FracturedShinCheckBox = form.getCheckBox('69')
  patientData.stdFracturedShin == 'true' ? FracturedShinCheckBox.check() : ''

  const FracturedAnkleCheckBox = form.getCheckBox('70')
  patientData.stdFracturedAnkle == 'true' ? FracturedAnkleCheckBox.check() : ''

  /*  */
  if (patientData.stdWeight == 'Yes') {
    const WeightCheckBox = form.getCheckBox('71')
    WeightCheckBox.check()
  } else {
    const noWeightCheckBox = form.getCheckBox('74')
    noWeightCheckBox.check()
  }
  /*  */
  if (patientData.stdStress == 'Yes') {
    const StressCheckBox = form.getCheckBox('72')
    StressCheckBox.check()
  } else {
    const noStressCheckBox = form.getCheckBox('75')
    noStressCheckBox.check()
  }
  /*  */
  if (patientData.stdSickleCell == 'Yes') {
    const SickleCellCheckBox = form.getCheckBox('73')
    SickleCellCheckBox.check()
  } else {
    const noSickleCellCheckBox = form.getCheckBox('76')
    noSickleCellCheckBox.check()
  }

  const stdFirstMenstrualTextField = form.getTextField(
    '19 When was your first menstrual period'
  )
  stdFirstMenstrualTextField.setText(
    patientData.stdFirstMenstrual &&
      patientData.stdFirstMenstrual != undefined &&
      patientData.stdFirstMenstrual != 'undefined'
      ? patientData.stdFirstMenstrual
      : ''
  )
  /*  */
  const stdRecentMenstrualTextField = form.getTextField(
    'When was your most recent menstrual period'
  )
  stdRecentMenstrualTextField.setText(
    patientData.stdRecentMenstrual &&
      patientData.stdRecentMenstrual != undefined &&
      patientData.stdRecentMenstrual != 'undefined'
      ? patientData.stdRecentMenstrual
      : ''
  )
  /*  */
  const stdMenstrualTimeTextField = form.getTextField('another')
  stdMenstrualTimeTextField.setText(
    patientData.stdMenstrualTime &&
      patientData.stdMenstrualTime != undefined &&
      patientData.stdMenstrualTime != 'undefined'
      ? patientData.stdMenstrualTime
      : ''
  )
  /*  */
  const stdLastYearPeriodsTextField = form.getTextField(
    'How many periods have you had in the last year'
  )
  stdLastYearPeriodsTextField.setText(
    patientData.stdLastYearPeriods &&
      patientData.stdLastYearPeriods != undefined &&
      patientData.stdLastYearPeriods != 'undefined'
      ? patientData.stdLastYearPeriods
      : ''
  )
  /*  */
  const stdLongestPeriodTimeTextField = form.getTextField('Longest time')
  stdLongestPeriodTimeTextField.setText(
    patientData.stdLongestPeriodTime &&
      patientData.stdLongestPeriodTime != undefined &&
      patientData.stdLongestPeriodTime != 'undefined'
      ? patientData.stdLongestPeriodTime
      : ''
  )
  /*  */
  const stdTwoTesticleTextField = form.getTextField(
    'Do you have two testicles?'
  )
  stdTwoTesticleTextField.setText(
    patientData.stdTwoTesticle &&
      patientData.stdTwoTesticle != undefined &&
      patientData.stdTwoTesticle != 'undefined'
      ? patientData.stdTwoTesticle
      : ''
  )

  const stdTesticularSwellingTextField = form.getTextField(
    'Do you have any swelling or masses?'
  )
  stdTesticularSwellingTextField.setText(
    patientData.stdTesticularSwelling &&
      patientData.stdTesticularSwelling != undefined &&
      patientData.stdTesticularSwelling != 'undefined'
      ? patientData.stdTesticularSwelling
      : ''
  )

  /*  */
  const stdECGCheckBox = form.getCheckBox('Check Box10')
  patientData.stdECG == 'true' ? stdECGCheckBox.check() : ''
  /*  */
  const stdConcussionTextField = form.getTextField(
    'When was your last concussion'
  )
  stdConcussionTextField.setText(
    patientData.stdConcussion &&
      patientData.stdConcussion != undefined &&
      patientData.stdConcussion != 'undefined'
      ? patientData.stdConcussion
      : ''
  )

  /*  */
  const stdMemoryLossExplainTextField = form.getTextField(
    'If yes how many times'
  )
  stdMemoryLossExplainTextField.setText(
    patientData.stdMemoryLossExplain &&
      patientData.stdMemoryLossExplain != undefined &&
      patientData.stdMemoryLossExplain != 'undefined'
      ? patientData.stdMemoryLossExplain
      : ''
  )

  /*  */
  const stdhowsevereTextField = form.getTextField('How Severe')
  stdhowsevereTextField.setText(
    patientData.stdHowSevere &&
      patientData.stdHowSevere != undefined &&
      patientData.stdHowSevere != 'undefined'
      ? patientData.stdHowSevere
      : ''
  )
  /*  */
  const stdYesExplain = form.getTextField(
    'EXPLAIN YES ANSWERS IN THE BOX BELOW attach another sheet if necessary'
  )
  stdYesExplain.setText(
    patientData.stdYesExplain &&
      patientData.stdYesExplain != undefined &&
      patientData.stdYesExplain != 'undefined'
      ? patientData.stdYesExplain
      : ''
  )

  /* Footer */
  const addressTextField = form.getTextField('Address_2')
  addressTextField.setText(
    ' Southwest Urgent Care & Family Practice 5900 Chimney Rock, Suite X Houston, TX 77081'
  )
  const contactTextField = form.getTextField('Phone Number4')
  contactTextField.setText('713-640-5754')

  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
  //const pdfBytes = await pdfDoc.save()
}

/* Write Covid Data */
async function writeCovidData(filePath, patientData) {
  console.log('In write Covid data.')
  console.log('In write imigration data with doctor data.', patientData)

  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/covid.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  const firstName = form.getTextField('First Name')
  firstName.setText(patientData.firstName)

  const lastNameTextField = form.getTextField('Last Name')
  lastNameTextField.setText(patientData.lastName)

  const middleNameTextField = form.getTextField('Middle Name')
  middleNameTextField.setText(
    patientData.middleName &&
      patientData.middleName != undefined &&
      patientData.middleName != 'undefined'
      ? patientData.middleName
      : ''
  )

  const phoneNumberTextField = form.getTextField('Phone Number')
  phoneNumberTextField.setText(
    patientData.mobilePhoneNo &&
      patientData.mobilePhoneNo != undefined &&
      patientData.mobilePhoneNo != 'undefined'
      ? patientData.mobilePhoneNo
      : ''
  )

  const dobTextField = form.getTextField('Date of Birth')
  dobTextField.setText(patientData.dateOfBirth)

  const ageTextField = form.getTextField('Age')
  ageTextField.setText(getAge(patientData.dateOfBirth))

  const dateTextField = form.getTextField('Collection Date')
  const d = new Date()
  dateTextField.setText(
    d.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )

  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
  //const pdfBytes = await pdfDoc.save()
}

/*  */
async function writeMedicalCertificateData(filePath, patientData) {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/medicalcertificate.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  //First Name
  const firstNameTextField = form.getTextField(
    'formMCSA-5876[0].page1[0].certifyBox[0].nameFirst[0]'
  )
  firstNameTextField.setText(patientData.firstName)
  // Last Name
  const lastNameTextField = form.getTextField(
    'formMCSA-5876[0].page1[0].certifyBox[0].nameLast[0]'
  )
  lastNameTextField.setText(patientData.lastName)
  // Driver Licinse
  const driverLicenseNumberTextField = form.getTextField(
    'formMCSA-5876[0].page1[0].driverBox[0].licenseNumber[0]'
  )
  driverLicenseNumberTextField.setText(patientData.driverLicenseNumber)
  /* ========License State========== */
  const licenseStateDropdown = form.getDropdown(
    'formMCSA-5876[0].page1[0].driverBox[0].licenseState[0]'
  )
  const optionss = licenseStateDropdown.getOptions(patientData.licenseState)
  licenseStateDropdown.select(patientData.licenseState)

  /* Driver Address */
  const addressTextField = form.getTextField(
    'formMCSA-5876[0].page1[0].driverBox[0].driverStreet[0]'
  )
  addressTextField.setText(patientData.inputAddress)
  /* Driver City */
  const cityTextField = form.getTextField(
    'formMCSA-5876[0].page1[0].driverBox[0].driverCity[0]'
  )
  cityTextField.setText(patientData.city)
  /* state */
  const stateDropdown = form.getDropdown(
    'formMCSA-5876[0].page1[0].driverBox[0].driverState[0]'
  )
  const options = stateDropdown.getOptions(patientData.state)
  stateDropdown.select(patientData.state)
  /* zipcode */
  const zipCodeTextField = form.getTextField(
    'formMCSA-5876[0].page1[0].driverBox[0].driverZip[0]'
  )
  zipCodeTextField.setText(patientData.zipCode)

  // clpcdl
  if (patientData.clpCdl == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'formMCSA-5876[0].page1[0].driverBox[0].cdlMaybe[0].cdlButtonList[0]'
    )
    radioGroup.select('Yes')
  } else {
    const radioGroup = form.getRadioGroup(
      'formMCSA-5876[0].page1[0].driverBox[0].cdlMaybe[0].cdlButtonList[0]'
    )
    radioGroup.select('No')
  }

  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
}

/*  */

async function writeImigrationData(filePath, patientData) {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/imigration.pdf'),
    { ignoreEncryption: true }
  )
  const form = pdfDoc.getForm()
  //First Name
  const firstNameTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line1b_GivenName[0]'
  )
  firstNameTextField.setText(patientData.firstName)

  // Middle Name
  const middleNameTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line1c_MiddleName[0]'
  )
  middleNameTextField.setText(patientData.middleName)
  // Last Name
  const lastNameTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line1a_FamilyName[0]'
  )
  lastNameTextField.setText(patientData.lastName)

  const cityOfBirthTextField = form.getTextField(
    'form1[0].#subform[0].P1Line2_CityOrTown[0]'
  )
  cityOfBirthTextField.setText(patientData.cityOfBirth)
  const countryOfBirthTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line9_CountryofBirth[0]'
  )
  countryOfBirthTextField.setText(patientData.countryOfBirth)
  //AlienNumber
  const imgNumberTextField = form.getTextField(
    'form1[0].#subform[0].#area[0].Pt1Line3e_AlienNumber[0]'
  )
  imgNumberTextField.setText(patientData.imgNumber)
  // uscisNumber
  const uscisNumberTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line2_USCISELISAcctNumber[0]'
  )
  uscisNumberTextField.setText(patientData.uscisNumber)

  // Apartment
  if (patientData.apt == 'Apartment') {
    const apartmentCheckBox = form.getCheckBox(
      'form1[0].#subform[0].Pt1Line2_Unit[2]'
    )
    apartmentCheckBox.check()
  } else if (patientData.apt == 'Suite') {
    const suiteCheckBox = form.getCheckBox(
      'form1[0].#subform[0].Pt1Line2_Unit[1]'
    )
    suiteCheckBox.check()
  } else {
    const floorCheckBox = form.getCheckBox(
      'form1[0].#subform[0].Pt1Line2_Unit[0]'
    )
    floorCheckBox.check()
  }
  // City

  const addressTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line2_StreetNumberName[0]'
  )
  addressTextField.setText(patientData.inputAddress)
  // Apt/Suite/floorNumber
  const aptSteFlrNumberTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line2_AptSteFlrNumber[0]'
  )
  aptSteFlrNumberTextField.setText(
    patientData.aptNumber &&
      patientData.aptNumber != undefined &&
      patientData.aptNumber != 'undefined'
      ? patientData.aptNumber
      : ''
  )

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
  zipCodeTextField.setText(
    patientData.zipCode &&
      patientData.zipCode != undefined &&
      patientData.zipCode != 'undefined'
      ? patientData.zipCode
      : ''
  )

  // state
  const stateDropdown = form.getDropdown(
    'form1[0].#subform[0].P1Line2_State[0]'
  )
  const options = stateDropdown.getOptions(patientData.state)
  stateDropdown.select(patientData.state)
  if (patientData.state == 'undefined') {
    stateDropdown.select('')
  }

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
  // City Village Town
  const birthCityTextField = form.getTextField(
    'form1[0].#subform[0].Pt1Line8_CityTownVillageofBirth[0]'
  )
  birthCityTextField.setText(patientData.cityTownVillage)
  // City or Town
  const cityTextField = form.getTextField(
    'form1[0].#subform[0].P1Line2_CityOrTown[0]'
  )
  cityTextField.setText(patientData.cityOfBirth)
  // InterPreter
  if (patientData.interpreter == 'Yes') {
    const interpreterCheckBox = form.getCheckBox(
      'form1[0].#subform[0].Pt2Line1_Checkbox[0]'
    )
    interpreterCheckBox.check()
  } else {
    const interpreter2CheckBox = form.getCheckBox(
      'form1[0].#subform[0].Pt2Line1_Checkbox[1]'
    )
    interpreter2CheckBox.check()
  }
  const interpreterFnameTextField = form.getTextField(
    'form1[0].#subform[1].Pt3Line1_InterpreterGivenName[0]'
  )
  interpreterFnameTextField.setText(patientData.interpreterFName)

  const interpreterLastnameTextField = form.getTextField(
    'form1[0].#subform[1].Pt3Line1_InterpreterFamilyName[0]'
  )
  interpreterLastnameTextField.setText(patientData.interpreterLName)

  const interpreterBusinessNameTextField = form.getTextField(
    'form1[0].#subform[1].Pt3Line2_NameofBusinessorOrgName[0]'
  )
  interpreterBusinessNameTextField.setText(patientData.interpreterBusiness)

  /* Page 2*/
  //First Name
  const firstNamep2TextField = form.getTextField(
    'form1[0].#subform[1].Pt1Line1b_GivenName[1]'
  )
  firstNamep2TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep2TextField = form.getTextField(
    'form1[0].#subform[1].Pt1Line1c_MiddleName[1]'
  )
  middleNamep2TextField.setText(patientData.middleName)
  // Last Name
  const lastName2TextField = form.getTextField(
    'form1[0].#subform[1].Pt1Line1a_FamilyName[1]'
  )
  lastName2TextField.setText(patientData.lastName)

  //AlienNumber
  const imgNumberp2TextField = form.getTextField(
    'form1[0].#subform[1].Pt1Line3e_AlienNumber[1]'
  )
  imgNumberp2TextField.setText(patientData.imgNumber)

  /* Page 3*/
  //First Name
  const firstNamep3TextField = form.getTextField(
    'form1[0].#subform[2].Pt1Line1b_GivenName[2]'
  )
  firstNamep3TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep3TextField = form.getTextField(
    'form1[0].#subform[2].Pt1Line1c_MiddleName[2]'
  )
  middleNamep3TextField.setText(patientData.middleName)
  // Last Name
  const lastName3TextField = form.getTextField(
    'form1[0].#subform[2].Pt1Line1a_FamilyName[2]'
  )
  lastName3TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp3TextField = form.getTextField(
    'form1[0].#subform[2].Pt1Line3e_AlienNumber[2]'
  )
  imgNumberp3TextField.setText(patientData.imgNumber)

  /* Page 4*/
  //First Name
  const firstNamep4TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line1b_GivenName[3]'
  )
  firstNamep4TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep4TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line1c_MiddleName[3]'
  )
  middleNamep4TextField.setText(patientData.middleName)
  // Last Name
  const lastName4TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line1a_FamilyName[3]'
  )
  lastName4TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp4TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line3e_AlienNumber[3]'
  )
  imgNumberp4TextField.setText(patientData.imgNumber)

  /* Page 5*/
  //First Name
  const firstNamep5TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line1b_GivenName[3]'
  )
  firstNamep5TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep5TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line1c_MiddleName[3]'
  )
  middleNamep5TextField.setText(patientData.middleName)
  // Last Name
  const lastName5TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line1a_FamilyName[3]'
  )
  lastName5TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp5TextField = form.getTextField(
    'form1[0].#subform[3].Pt1Line3e_AlienNumber[3]'
  )
  imgNumberp5TextField.setText(patientData.imgNumber)

  /* Page 6*/
  //First Name
  const firstNamep6TextField = form.getTextField(
    'form1[0].#subform[5].Pt1Line1b_GivenName[4]'
  )
  firstNamep6TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep6TextField = form.getTextField(
    'form1[0].#subform[5].Pt1Line1c_MiddleName[4]'
  )
  middleNamep6TextField.setText(patientData.middleName)
  // Last Name
  const lastName6TextField = form.getTextField(
    'form1[0].#subform[5].Pt1Line1a_FamilyName[4]'
  )
  lastName6TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp6TextField = form.getTextField(
    'form1[0].#subform[5].Pt1Line3e_AlienNumber[4]'
  )
  imgNumberp6TextField.setText(patientData.imgNumber)

  /* Page 7*/
  //First Name
  const firstNamep7TextField = form.getTextField(
    'form1[0].#subform[6].Pt1Line1b_GivenName[5]'
  )
  firstNamep7TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep7TextField = form.getTextField(
    'form1[0].#subform[6].Pt1Line1c_MiddleName[5]'
  )
  middleNamep7TextField.setText(patientData.middleName)
  // Last Name
  const lastName7TextField = form.getTextField(
    'form1[0].#subform[6].Pt1Line1a_FamilyName[5]'
  )
  lastName7TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp7TextField = form.getTextField(
    'form1[0].#subform[6].Pt1Line3e_AlienNumber[5]'
  )
  imgNumberp7TextField.setText(patientData.imgNumber)

  /* Page 8*/
  //First Name
  const firstNamep8TextField = form.getTextField(
    'form1[0].#subform[7].Pt1Line1b_GivenName[6]'
  )
  firstNamep8TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep8TextField = form.getTextField(
    'form1[0].#subform[7].Pt1Line1c_MiddleName[6]'
  )
  middleNamep8TextField.setText(patientData.middleName)
  // Last Name
  const lastName8TextField = form.getTextField(
    'form1[0].#subform[7].Pt1Line1a_FamilyName[6]'
  )
  lastName8TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp8TextField = form.getTextField(
    'form1[0].#subform[7].Pt1Line3e_AlienNumber[6]'
  )
  imgNumberp8TextField.setText(patientData.imgNumber)

  /* Page 9*/
  //First Name
  const firstNamep9TextField = form.getTextField(
    'form1[0].#subform[8].Pt1Line1b_GivenName[7]'
  )
  firstNamep9TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep9TextField = form.getTextField(
    'form1[0].#subform[8].Pt1Line1c_MiddleName[7]'
  )
  middleNamep9TextField.setText(patientData.middleName)
  // Last Name
  const lastName9TextField = form.getTextField(
    'form1[0].#subform[8].Pt1Line1a_FamilyName[7]'
  )
  lastName9TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp9TextField = form.getTextField(
    'form1[0].#subform[8].Pt1Line3e_AlienNumber[7]'
  )
  imgNumberp9TextField.setText(patientData.imgNumber)

  /* Page9  Missing*/
  //First Name
  const firstNamep9mTextField = form.getTextField(
    'form1[0].#subform[9].Pt1Line1b_GivenName[8]'
  )
  firstNamep9mTextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep9mTextField = form.getTextField(
    'form1[0].#subform[9].Pt1Line1c_MiddleName[8]'
  )
  middleNamep9mTextField.setText(patientData.middleName)
  // Last Name
  const lastName9mTextField = form.getTextField(
    'form1[0].#subform[9].Pt1Line1a_FamilyName[8]'
  )
  lastName9mTextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp9mTextField = form.getTextField(
    'form1[0].#subform[9].Pt1Line3e_AlienNumber[8]'
  )
  imgNumberp9mTextField.setText(patientData.imgNumber)

  /* Page 10*/
  //First Name
  const firstNamep10TextField = form.getTextField(
    'form1[0].#subform[10].Pt1Line1b_GivenName[9]'
  )
  firstNamep10TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep10TextField = form.getTextField(
    'form1[0].#subform[10].Pt1Line1c_MiddleName[9]'
  )
  middleNamep10TextField.setText(patientData.middleName)
  // Last Name
  const lastName10TextField = form.getTextField(
    'form1[0].#subform[10].Pt1Line1a_FamilyName[9]'
  )
  lastName10TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp10TextField = form.getTextField(
    'form1[0].#subform[10].Pt1Line3e_AlienNumber[9]'
  )
  imgNumberp10TextField.setText(patientData.imgNumber)

  /* Page 11*/
  //First Name
  const firstNamep11TextField = form.getTextField(
    'form1[0].#subform[11].Pt1Line1b_GivenName[10]'
  )
  firstNamep11TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep11TextField = form.getTextField(
    'form1[0].#subform[11].Pt1Line1c_MiddleName[10]'
  )
  middleNamep11TextField.setText(patientData.middleName)
  // Last Name
  const lastName11TextField = form.getTextField(
    'form1[0].#subform[11].Pt1Line1a_FamilyName[10]'
  )
  lastName11TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp11TextField = form.getTextField(
    'form1[0].#subform[11].Pt1Line3e_AlienNumber[10]'
  )
  imgNumberp11TextField.setText(patientData.imgNumber)

  /* Page 12*/
  //First Name
  const firstNamep12TextField = form.getTextField(
    'form1[0].#subform[12].Pt1Line1b_GivenName[11]'
  )
  firstNamep12TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep12TextField = form.getTextField(
    'form1[0].#subform[12].Pt1Line1c_MiddleName[11]'
  )
  middleNamep12TextField.setText(patientData.middleName)
  // Last Name
  const lastName12TextField = form.getTextField(
    'form1[0].#subform[12].Pt1Line1a_FamilyName[11]'
  )
  lastName12TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp12TextField = form.getTextField(
    'form1[0].#subform[12].Pt1Line3e_AlienNumber[11]'
  )
  imgNumberp12TextField.setText(patientData.imgNumber)

  /* Page 13*/
  //First Name
  const firstNamep13TextField = form.getTextField(
    'form1[0].#subform[13].Pt1Line1b_GivenName[12]'
  )
  firstNamep13TextField.setText(patientData.firstName)

  // Middle Name
  const middleNamep13TextField = form.getTextField(
    'form1[0].#subform[13].Pt1Line1c_MiddleName[12]'
  )
  middleNamep13TextField.setText(patientData.middleName)
  // Last Name
  const lastName13TextField = form.getTextField(
    'form1[0].#subform[13].Pt1Line1a_FamilyName[12]'
  )
  lastName13TextField.setText(patientData.lastName)
  //AlienNumber
  const imgNumberp13TextField = form.getTextField(
    'form1[0].#subform[13].Pt1Line3e_AlienNumber[12]'
  )
  imgNumberp13TextField.setText(patientData.imgNumber)

  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
}
/*    ====Medical examination Report ==== */
async function writeMedicalExaminationData(filePath, patientData) {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync('./public/pdfFile/medicalexamination.pdf'),
    { ignoreEncryption: true }
  )
  console.log('Writing Medical Data')
  const form = pdfDoc.getForm()

  const lastNameTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].nameLast[0]'
  )
  lastNameTextField.setText(patientData.lastName)
  const firstNameTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].nameFirst[0]'
  )
  firstNameTextField.setText(patientData.firstName)

  const dobTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].birthDate[0]'
  )
  dobTextField.setText(patientData.dateOfBirth)

  /* Second Page */
  const lNameTextField = form.getTextField(
    'MCSA-5875[0].Page2[0].pageHead2[0].nameLastHead2[0]'
  )
  lNameTextField.setText(patientData.lastName)
  const fNameTextField = form.getTextField(
    'MCSA-5875[0].Page2[0].pageHead2[0].nameFirstHead2[0]'
  )
  fNameTextField.setText(patientData.firstName)

  const dob_TextField = form.getTextField(
    'MCSA-5875[0].Page2[0].pageHead2[0].dateBirth2[0]'
  )
  dob_TextField.setText(patientData.dateOfBirth)

  const dateTextField = form.getTextField(
    'MCSA-5875[0].Page2[0].pageHead2[0].dateForm2[0]'
  )
  const d = new Date()
  dateTextField.setText(
    d.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )

  /*  */
  /* Third Page */
  const lName3TextField = form.getTextField(
    'MCSA-5875[0].Page3[0].pageHead3[0].nameLastHead3[0]'
  )
  lName3TextField.setText(patientData.lastName)
  const fName3TextField = form.getTextField(
    'MCSA-5875[0].Page3[0].pageHead3[0].nameFirstHead3[0]'
  )
  fName3TextField.setText(patientData.firstName)

  const dob3TextField = form.getTextField(
    'MCSA-5875[0].Page3[0].pageHead3[0].dateBirth3[0]'
  )
  dob3TextField.setText(patientData.dateOfBirth)

  const date3TextField = form.getTextField(
    'MCSA-5875[0].Page3[0].pageHead3[0].dateForm3[0]'
  )
  const d3 = new Date()
  date3TextField.setText(
    d3.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )

  /*  */
  /* Fourth Page */
  const lName4TextField = form.getTextField(
    'MCSA-5875[0].Page4[0].pageHead4[0].nameLastHead4[0]'
  )
  lName4TextField.setText(patientData.lastName)
  const fName4TextField = form.getTextField(
    'MCSA-5875[0].Page4[0].pageHead4[0].nameFirstHead4[0]'
  )
  fName4TextField.setText(patientData.firstName)

  const dob4TextField = form.getTextField(
    'MCSA-5875[0].Page4[0].pageHead4[0].dateBirth4[0]'
  )
  dob4TextField.setText(patientData.dateOfBirth)

  const date4TextField = form.getTextField(
    'MCSA-5875[0].Page4[0].pageHead4[0].dateForm4[0]'
  )
  const d4 = new Date()
  date4TextField.setText(
    d4.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )

  /*  */
  /* Fifth Page */
  const lName5TextField = form.getTextField(
    'MCSA-5875[0].Page5[0].pageHead5[0].nameLastHead5[0]'
  )
  lName5TextField.setText(patientData.lastName)
  const fName5TextField = form.getTextField(
    'MCSA-5875[0].Page5[0].pageHead5[0].nameFirstHead5[0]'
  )
  fName5TextField.setText(patientData.firstName)

  const dob5TextField = form.getTextField(
    'MCSA-5875[0].Page5[0].pageHead5[0].dateBirth5[0]'
  )
  dob5TextField.setText(patientData.dateOfBirth)

  const date5TextField = form.getTextField(
    'MCSA-5875[0].Page5[0].pageHead5[0].dateForm5[0]'
  )
  const d5 = new Date()
  date5TextField.setText(
    d5.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )

  /*  */

  const ageTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverAge[0]'
  )
  ageTextField.setText(getAge(patientData.dateOfBirth))
  const addressTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverAddress[0]'
  )
  addressTextField.setText(
    patientData.inputAddress &&
      patientData.inputAddress != undefined &&
      patientData.inputAddress != 'undefined'
      ? patientData.inputAddress
      : ''
  )

  const cityTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverCity[0]'
  )
  cityTextField.setText(
    patientData.city &&
      patientData.city != undefined &&
      patientData.city != 'undefined'
      ? patientData.city
      : ''
  )

  const stateDropdown = form.getDropdown(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverState[0]'
  )
  const options = stateDropdown.getOptions(patientData.state)
  stateDropdown.select(patientData.state)
  if (patientData.state == 'undefined') {
    stateDropdown.select('')
  }

  const zipCodeTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverZip[0]'
  )
  zipCodeTextField.setText(
    patientData.zipCode &&
      patientData.zipCode != undefined &&
      patientData.zipCode != 'undefined'
      ? patientData.zipCode
      : ''
  )
  const driverLicenseNumberTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverLicense[0]'
  )
  driverLicenseNumberTextField.setText(
    patientData.driverLicenseNumber &&
      patientData.driverLicenseNumber != undefined &&
      patientData.driverLicenseNumber != 'undefined'
      ? patientData.driverLicenseNumber
      : ''
  )
  /* ========License State========== */
  const licenseStateDropdown = form.getDropdown(
    'MCSA-5875[0].Page1[0].driverPersonal[0].licenseState[0]'
  )
  const optionss = licenseStateDropdown.getOptions(patientData.licenseState)
  licenseStateDropdown.select(patientData.licenseState)
  if (patientData.licenseState == 'undefined') {
    licenseStateDropdown.select('')
  }
  const emailTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].emailAddress[0]'
  )
  emailTextField.setText(patientData.email)

  if (patientData.clpCdl == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].driverPersonal[0].cdlLicense[0].cdlButtonList[0]'
    )
    radioGroup.select('Yes')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].driverPersonal[0].cdlLicense[0].cdlButtonList[0]'
    )
    radioGroup.select('No')
  }

  const driverIdVerifiedByTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverVerify[0]'
  )
  driverIdVerifiedByTextField.setText(
    patientData.driverIdVerifiedBy &&
      patientData.driverIdVerifiedBy != undefined &&
      patientData.driverIdVerifiedBy != 'undefined'
      ? patientData.driverIdVerifiedBy
      : ''
  )

  if (patientData.usdotFmcsa == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].driverPersonal[0].certDenyGroup[0].certDenyButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.usdotFmcsa == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].driverPersonal[0].certDenyGroup[0].certDenyButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].driverPersonal[0].certDenyGroup[0].certDenyButtons[0]'
    )
    radioGroup.select('3')
  }
  // Gender
  if (patientData.gender == 'Male') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].driverPersonal[0].genderGroup[0].genderButtons[0]'
    )
    radioGroup.select('1')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].driverPersonal[0].genderGroup[0].genderButtons[0]'
    )
    radioGroup.select('2')
  }

  const driverPhoneTextField = form.getTextField(
    'MCSA-5875[0].Page1[0].driverPersonal[0].driverPhone[0]'
  )
  driverPhoneTextField.setText(
    patientData.driverPhone &&
      patientData.driverPhone != undefined &&
      patientData.driverPhone != 'undefined'
      ? patientData.driverPhone
      : ''
  )

  //
  if (patientData.driverSurgery == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.driverSurgery == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryButtons[0]'
    )
    radioGroup.select('3')
  }

  const driverSurgeryExplain = form.getTextField(
    'MCSA-5875[0].Page1[0].surgeryGroup[0].surgeryDescribe[0]'
  )
  driverSurgeryExplain.setText(
    patientData.driverSurgeryExplain &&
      patientData.driverSurgeryExplain != undefined &&
      patientData.driverSurgeryExplain != 'undefined'
      ? patientData.driverSurgeryExplain
      : ''
  )
  //
  if (patientData.driverMedicine == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].medicineGroup[0].medicineButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.driverMedicine == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].medicineGroup[0].medicineButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page1[0].medicineGroup[0].medicineButtons[0]'
    )
    radioGroup.select('3')
  }

  const driverMedicineExplain = form.getTextField(
    'MCSA-5875[0].Page1[0].surgeryGroup[0].medicineDescribe[0]'
  )
  driverMedicineExplain.setText(
    patientData.driverMedicineExplain &&
      patientData.driverMedicineExplain != undefined &&
      patientData.driverMedicineExplain != 'undefined'
      ? patientData.driverMedicineExplain
      : ''
  )

  /* Diver Health Info Part Two */
  if (patientData.head == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].headGroup[0].headButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.head == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].headGroup[0].headButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].headGroup[0].headButtons[0]'
    )
    radioGroup.select('3')
  }

  /* seizures */

  if (patientData.seizures == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].seizeGroup[0].seizeButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.seizures == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].seizeGroup[0].seizeButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].seizeGroup[0].seizeButtons[0]'
    )
    radioGroup.select('3')
  }
  /* EYE */
  if (patientData.eye == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].eyeGroup[0].eyeButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.eye == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].eyeGroup[0].eyeButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].eyeGroup[0].eyeButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Ear */
  if (patientData.ear == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].earGroup[0].earButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.ear == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].earGroup[0].earButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].earGroup[0].earButtons[0]'
    )
    radioGroup.select('3')
  }
  /* heart */
  if (patientData.heart == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].heartGroup[0].heartButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.heart == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].heartGroup[0].heartButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].heartGroup[0].heartButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Pace */
  if (patientData.pace == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].paceGroup[0].paceButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.pace == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].paceGroup[0].paceButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].paceGroup[0].paceButtons[0]'
    )
    radioGroup.select('3')
  }

  /* highBlood */
  if (patientData.highBlood == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].highGroup[0].highButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.highBlood == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].highGroup[0].highButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].highGroup[0].highButtons[0]'
    )
    radioGroup.select('3')
  }
  /* High Cholestrol */
  if (patientData.highCholestrol == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].cholesterolGroup[0].cholesterolButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.highCholestrol == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].cholesterolGroup[0].cholesterolButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].cholesterolGroup[0].cholesterolButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Breath */
  if (patientData.breath == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].breathGroup[0].breathButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.breath == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].breathGroup[0].breathButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].breathGroup[0].breathButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Lung */
  if (patientData.lung == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].lungGroup[0].lungButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.lung == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].lungGroup[0].lungButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].lungGroup[0].lungButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Kidney */
  if (patientData.kidney == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].kidneyGroup[0].kidneyButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.kidney == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].kidneyGroup[0].kidneyButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].kidneyGroup[0].kidneyButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Stomach */
  if (patientData.stomach == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].stomachGroup[0].stomachButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.stomach == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].stomachGroup[0].stomachButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].stomachGroup[0].stomachButtons[0]'
    )
    radioGroup.select('3')
  }
  /* bloodSugar */
  if (patientData.bloodSugar == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].sugarGroup[0].sugarButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.bloodSugar == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].sugarGroup[0].sugarButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].sugarGroup[0].sugarButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Insulin */
  if (patientData.insulin == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].insulinGroup[0].insulinButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.insulin == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].insulinGroup[0].insulinButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].insulinGroup[0].insulinButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Mental Health */
  if (patientData.mentalHealth == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].mentalGroup[0].mentalButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.mentalHealth == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].mentalGroup[0].mentalButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].mentalGroup[0].mentalButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Fainting */
  if (patientData.fainting == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].faintGroup[0].faintButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.fainting == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].faintGroup[0].faintButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].faintGroup[0].faintButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Dizzyness */
  if (patientData.dizzy == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].dizzyGroup[0].dizzyButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.dizzy == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].dizzyGroup[0].dizzyButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].dizzyGroup[0].dizzyButtons[0]'
    )
    radioGroup.select('3')
  }
  /* WeightLoss */
  if (patientData.weightLoss == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].weightGroup[0].weightButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.weightLoss == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].weightGroup[0].weightButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].weightGroup[0].weightButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Stroke */
  if (patientData.stroke == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].strokeGroup[0].strokeButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.stroke == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].strokeGroup[0].strokeButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].strokeGroup[0].strokeButtons[0]'
    )
    radioGroup.select('3')
  }
  /* useLimit */
  if (patientData.useLimit == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].uselimitGroup[0].uselimitButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.useLimit == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].uselimitGroup[0].uselimitButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].uselimitGroup[0].uselimitButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Neck */
  if (patientData.neck == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].neckbackGroup[0].neckbackButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.neck == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].neckbackGroup[0].neckbackButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].neckbackGroup[0].neckbackButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Bone */
  if (patientData.bone == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].boneGroup[0].boneButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.bone == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].boneGroup[0].boneButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].boneGroup[0].boneButtons[0]'
    )
    radioGroup.select('3')
  }

  /* blood */
  if (patientData.blood == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].bloodGroup[0].bloodButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.blood == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].bloodGroup[0].bloodButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].bloodGroup[0].bloodButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Cancer  */
  if (patientData.cancer == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].cancerGroup[0].cancerButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.cancer == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].cancerGroup[0].cancerButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].cancerGroup[0].cancerButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Chronic */
  if (patientData.chronic == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].infectGroup[0].infectButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.chronic == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].infectGroup[0].infectButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].infectGroup[0].infectButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Apnea */
  if (patientData.apnea == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].apneaGroup[0].apneaButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.apnea == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].apneaGroup[0].apneaButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].apneaGroup[0].apneaButtons[0]'
    )
    radioGroup.select('3')
  }
  /* SleepTest */
  if (patientData.sleepTest == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].sleeptestGroup[0].sleeptestButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.sleepTest == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].sleeptestGroup[0].sleeptestButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].sleeptestGroup[0].sleeptestButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Hospital Night */
  if (patientData.hospitalNight == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].hospitalGroup[0].hospitalButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.hospitalNight == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].hospitalGroup[0].hospitalButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].hospitalGroup[0].hospitalButtons[0]'
    )
    radioGroup.select('3')
  }

  /*  Broken Bone */

  if (patientData.brokenBone == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].brokenGroup[0].brokenButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.brokenBone == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].brokenGroup[0].brokenButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].brokenGroup[0].brokenButtons[0]'
    )
    radioGroup.select('3')
  }

  /* Tobacco */
  if (patientData.dTabacco == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].tobaccoGroup[0].tobaccoButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.dTabacco == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].tobaccoGroup[0].tobaccoButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].tobaccoGroup[0].tobaccoButtons[0]'
    )
    radioGroup.select('3')
  }
  /* Alcohol */
  if (patientData.dAlcohol == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].alcoholGroup[0].alcoholButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.dAlcohol == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].alcoholGroup[0].alcoholButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].alcoholGroup[0].alcoholButtons[0]'
    )
    radioGroup.select('3')
  }
  /* illegal */
  if (patientData.illegal == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].illegalGroup[0].illegalButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.illegal == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].illegalGroup[0].illegalButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].illegalGroup[0].illegalButtons[0]'
    )
    radioGroup.select('3')
  }
  /* illegalDrug */
  if (patientData.illegalDrug == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].failedGroup[0].failedButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.illegalDrug == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].failedGroup[0].failedButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].driverHealth[0].failedGroup[0].failedButtons[0]'
    )
    radioGroup.select('3')
  }
  /* other Health */
  if (patientData.otherHealth == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].otherGroup[0].otherButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.otherHealth == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].otherGroup[0].otherButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].otherGroup[0].otherButtons[0]'
    )
    radioGroup.select('3')
  }

  const otherHealthExplainTextField = form.getTextField(
    'MCSA-5875[0].Page2[0].otherGroup[0].otherDescribe[0]'
  )
  otherHealthExplainTextField.setText(
    patientData.otherHealthExplain &&
      patientData.otherHealthExplain != undefined &&
      patientData.otherHealthExplain != 'undefined'
      ? patientData.otherHealthExplain
      : ''
  )

  /* Driver Comment */
  if (patientData.dComment == 'Yes') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].commentGroup[0].commentButtons[0]'
    )
    radioGroup.select('1')
  } else if (patientData.dComment == 'No') {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].commentGroup[0].commentButtons[0]'
    )
    radioGroup.select('2')
  } else {
    const radioGroup = form.getRadioGroup(
      'MCSA-5875[0].Page2[0].commentGroup[0].commentButtons[0]'
    )
    radioGroup.select('3')
  }

  const dCommentExplainTextField = form.getTextField(
    'MCSA-5875[0].Page2[0].commentGroup[0].commentDescribe[0]'
  )
  dCommentExplainTextField.setText(
    patientData.dCommentExplain &&
      patientData.dCommentExplain != undefined &&
      patientData.dCommentExplain != 'undefined'
      ? patientData.dCommentExplain
      : ''
  )

  fs.writeFileSync(
    filePath,
    await pdfDoc.save({ updateFieldAppearances: false })
  )
}

/*   ============================================ */

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
  dateTextField.setText(
    d.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )

  const timeTextField = form.getTextField('TIME')
  var time = new Date()
  timeTextField.setText(
    time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  )

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
  reasonTextField.setText(
    patientData.reasonForVisit == 'Other'
      ? patientData.reasonForVisitOther
      : patientData.reasonForVisit
  )
  const dobTextField = form.getTextField('DOB')
  dobTextField.setText(patientData.dateOfBirth)
  const ageTextField = form.getTextField('AGE')
  ageTextField.setText(getAge(patientData.dateOfBirth))
  //ageTextField.setText('12');
  const dateTextField = form.getTextField('DATE')
  const d = new Date()
  dateTextField.setText(
    d.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )

  //Time
  const timeTextField = form.getTextField('TIME')
  timeTextField.setText(
    d.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  )

  /// Alergic
  const alergiesTextField = form.getTextField('ALLERGIES')
  alergiesTextField.setText(
    patientData.alergic == 'No'
      ? patientData.alergic
      : patientData.alergicExplain
  )

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
  const med =
    patientData.medicationList &&
    patientData.medicationList != undefined &&
    patientData.medicationList != 'undefined'
      ? JSON.parse(patientData.medicationList)
      : ''
  const medicationListTextField = form.getTextField('MEDICATIONS')
  medicationListTextField.setText(
    med[0] && med[0] != undefined && med[0] != 'undefined' ? med[0].name : ''
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
    if (patientData.lastmenstrualPeriod == 'Date') {
      lastPapTextField.setText(
        patientData.periodDate &&
          patientData.periodDate != undefined &&
          patientData.periodDate != 'undefined'
          ? patientData.periodDate
          : ''
      )
    } else {
      lastPapTextField.setText(
        patientData.lastmenstrualPeriod &&
          patientData.lastmenstrualPeriod != undefined &&
          patientData.lastmenstrualPeriod != 'undefined'
          ? patientData.lastmenstrualPeriod
          : ''
      )
    }
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
  dateTextField.setText(
    d.toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  )
  // Time
  const timeTextField = form.getTextField('TIME IN')
  var time = new Date()
  timeTextField.setText(
    time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  )
  console.log(patientData.emergencyName)
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
