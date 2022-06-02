const { ImageRun, VerticalAlign } = require('docx')
const docx = require('docx')
const fs = require('fs')
const {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} = docx
var fileExtension = require('file-extension')

exports.writeNewPatientData = (patientData, medicineData) => {
  let insWidth = 600
  let insHeight = 400
  let adultWidth = 600
  let adultHeight = 400
  const med =
    patientData.medicationList &&
    patientData.medicationList != undefined &&
    patientData.medicationList != 'undefined'
      ? JSON.parse(patientData.medicationList)
      : ''
  if (patientData.insurance == 'No') {
    insWidth = insHeight = 0
  }
  if (patientData.adult == 'Yes') {
    adultWidth = adultHeight = 0
  }
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'First Name: \t',
                font: 'Calibri',

                bold: true,

                //  break: 2,
              }),
              new TextRun({
                text: patientData.firstName ? patientData.firstName : '',
              }),
              new TextRun({
                text: '\t Middle Name: \t ',
                font: 'Calibri',

                bold: true,

                //  break: 2,
              }),
              new TextRun({
                text: patientData.middleName ? patientData.middleName : '',
              }),
              new TextRun({
                text: '\t  Last Name: \t',
                font: 'Calibri',

                bold: true,
                //   break: 2,
              }),
              new TextRun({
                text: patientData.lastName ? patientData.lastName : '',
              }),
              new TextRun({
                text: 'Date of Birth: \t',

                bold: true,
                break: 2,
              }),
              new TextRun({
                text:
                  patientData.dateOfBirth &&
                  patientData.dateOfBirth != undefined
                    ? patientData.dateOfBirth
                    : '',
              }),
              new TextRun({
                text: '\t Age: \t',

                bold: true,
              }),
              new TextRun({
                text:
                  patientData.age && patientData.age != undefined
                    ? getAge(patientData.dateOfBirth)
                    : '',

                //  break: 2,
              }),
              new TextRun({
                text: 'Address:  \t',

                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.address ? patientData.address : '',
              }),

              new TextRun({
                text: 'APT: \t',

                bold: true,
                break: 2,
              }),
              new TextRun({
                text:
                  patientData.apt && patientData.apt != undefined
                    ? patientData.apt
                    : '',
              }),
              new TextRun({
                text: '\t City: \t',

                bold: true,
              }),
              new TextRun({
                text:
                  patientData.city && patientData.city != undefined
                    ? patientData.city
                    : '',

                //  break: 2,
              }),
              new TextRun({
                text: '\t Race: ',

                bold: true,
                //  break: 2,
              }),
              new TextRun({
                text:
                  patientData.race && patientData.race != undefined
                    ? patientData.race
                    : '',

                //  break: 2,
              }),
              new TextRun({
                text: 'State: \t',

                bold: true,

                break: 2,
              }),
              new TextRun({
                text:
                  patientData.state && patientData.state != undefined
                    ? patientData.state
                    : '',
              }),
              new TextRun({
                text: '\t Zip: \t',

                bold: true,

                //   break: 2,
              }),
              new TextRun({
                text:
                  patientData.zipCode && patientData.zipCode != undefined
                    ? patientData.zipCode
                    : '',
              }),

              new TextRun({
                text: 'Gender: \t',

                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.gender,
              }),

              new TextRun({
                text: 'DO YOU HAVE INSURANCE? \t',

                bold: true,
                break: 3,
              }),
              new TextRun({
                text: patientData.insurance,
              }),
              /* pics */
              new TextRun({
                text: 'Marital Status: \t',

                bold: true,

                break: 2,
              }),
              new TextRun({
                text:
                  patientData.maritalStatus &&
                  patientData.maritalStatus != undefined
                    ? patientData.maritalStatus
                    : '',
              }),
              new TextRun({
                text: '\t Occupation: \t',

                bold: true,

                //  break: 2,
              }),
              new TextRun({
                text:
                  patientData.occupation && patientData.occupation != undefined
                    ? patientData.occupation
                    : '',
              }),

              new TextRun({
                text: 'Mobile Phone No: \t',

                bold: true,

                break: 2,
              }),
              new TextRun({
                tetx:
                  patientData.mobilePhoneNo &&
                  patientData.mobilePhoneNo != undefined
                    ? patientData.mobilePhoneNo
                    : '',
              }),
              new TextRun({
                text: '\t Day Time Phone No: \t',

                bold: true,
                //  break: 2,
              }),
              new TextRun({
                text:
                  patientData.dayTimePhoneNo &&
                  patientData.dayTimePhoneNo != undefined
                    ? patientData.dayTimePhoneNo
                    : '',
              }),
              new TextRun({
                text: 'SSN: \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text:
                  patientData.ssn && patientData.ssn != undefined
                    ? patientData.ssn
                    : '',
              }),
              new TextRun({
                text: 'Email: \t',

                bold: true,

                break: 2,
              }),

              new TextRun({
                text:
                  patientData.email && patientData.email != undefined
                    ? patientData.email
                    : '',
              }),
              new TextRun({
                text: 'HAVE YOU HAD ANY SURGERIES IN THE PAST? \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.surgery,
              }),
              new TextRun({
                text: 'Surgery Reason Explain: \t',

                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.surgeryExplain
                  ? patientData.surgeryExplain
                  : '',
              }),
              new TextRun({
                text: 'ARE YOU ALLERGIC TO ANY MEDICATIONS? \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.alergic,
              }),
              new TextRun({
                text: 'ALLERGIC MEDICATIONS Explain: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.alergicExplain
                  ? patientData.alergicExplain
                  : '',
              }),

              new TextRun({
                text: 'DO YOU HAVE ANY ONGOING MEDICAL PROBLEMS? \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.medicalProblem,
              }),
              new TextRun({
                text: 'Medical Problem Explain: \t',

                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.medicalProblemExplain
                  ? patientData.medicalProblemExplain
                  : '',
              }),
              new TextRun({
                text: 'LIST HERE ANY MEDICATIONS YOU ARE CURRENTLY TAKING: \t',
                bold: true,
                break: 2,
              }),
              // Med Name
              new TextRun({
                text: '1: Name:  ',

                bold: true,
                break: 2,
              }),
              new TextRun({
                text:
                  med[0] && med[0] != undefined && med[0] != 'undefined'
                    ? med[0].name
                    : '',
              }),
              //
              new TextRun({
                text: '    Potency:  ',
                bold: true,
                break: 1,
              }),
              new TextRun({
                text:
                  med[0] && med[0] != undefined && med[0] != 'undefined'
                    ? med[0].potency
                    : '',
              }),
              new TextRun({
                text: '    Usage:  ',
                bold: true,
                break: 1,
              }),
              new TextRun({
                text:
                  med[0] && med[0] != undefined && med[0] != 'undefined'
                    ? med[0].usage
                    : '',
              }),
              new TextRun({
                text: '2: Name:  ',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text:
                  med[1] && med[1] != undefined && med[1] != 'undefined'
                    ? med[1].name
                    : '',
              }),
              new TextRun({
                text: '    Potency:  ',
                bold: true,
                break: 1,
              }),
              new TextRun({
                text:
                  med[1] && med[1] != undefined && med[1] != 'undefined'
                    ? med[1].potency
                    : '',
              }),
              new TextRun({
                text: '    Usage:  ',
                bold: true,
                break: 1,
              }),
              new TextRun({
                text:
                  med[1] && med[1] != undefined && med[1] != 'undefined'
                    ? med[1].usage
                    : '',
              }),
              new TextRun({
                text: '3: Name:  ',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text:
                  med[2] && med[2] != undefined && med[2] != 'undefined'
                    ? med[2].name
                    : '',
              }),

              //
              // Potency

              new TextRun({
                text: '    Potency:  ',
                bold: true,
                break: 1,
              }),
              new TextRun({
                text:
                  med[2] && med[2] != undefined && med[2] != 'undefined'
                    ? med[2].potency
                    : '',
              }),

              new TextRun({
                text: '    Usage:  ',
                bold: true,
                break: 1,
              }),
              new TextRun({
                text:
                  med[2] && med[2] != undefined && med[2] != 'undefined'
                    ? med[2].usage
                    : '',
              }),
              new TextRun({
                text: 'DO YOU SMOKE? \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.smoke,
              }),

              new TextRun({
                text: '\t HOW MUCH: \t',
                bold: true,

                //  break: 2,
              }),
              new TextRun({
                text: patientData.smokeExplain ? patientData.smokeExplain : '',
              }),
              new TextRun({
                text: 'CHEW TOBACCO?  \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.tobacco,
              }),
              new TextRun({
                text: '\t HOW MUCH: \t',
                bold: true,

                //   break: 2,
              }),
              new TextRun({
                text: patientData.tobaccoExplain
                  ? patientData.tobaccoExplain
                  : '',
              }),
              new TextRun({
                text: 'DO YOU DRINK ALCOHOL?  \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.alcohol,
              }),
              new TextRun({
                text: '\t HOW MUCH: \t',
                bold: true,

                //   break: 2,
              }),
              new TextRun({
                text: patientData.alcoholExplain
                  ? patientData.alcoholExplain
                  : '',
              }),
              new TextRun({
                text: 'DO YOU USE DRUGS?  \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.drugs,
              }),
              new TextRun({
                text: '\t HOW MUCH: \t',
                bold: true,
                //  break: 2,
              }),
              new TextRun({
                text: patientData.drugsExplain ? patientData.drugsExplain : '',
              }),
              new TextRun({
                text: 'REASON FOR VISIT TODAY:  \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.visitReason ? patientData.visitReason : '',
              }),
              new TextRun({
                text: 'DID YOU HAVE YEARLY PHYSICAL THIS YEAR?  \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.yearlyPhysical
                  ? patientData.yearlyPhysical
                  : '',
              }),
              /* explain */
              new TextRun({
                text: 'LAST ANNUAL PHYSICAL?  \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.yearlyPhysicalExplain,
              }),

              new TextRun({
                text: 'HAVE YOU BEEN EXPOSED TO COVID? \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: +patientData.covid,
              }),
              new TextRun({
                text: 'DO YOU HAVE ANY COUGH , CONGESTION OR SORE THROAT?  \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.coughCongestion,
              }),
              new TextRun({
                text: 'ARE YOU HAVING SHORTNESS OF BREATH? \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.breathShortness,
              }),
              new TextRun({
                text: 'DO YOU HAVE FEVER? \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.fever,
              }),
              new TextRun({
                text: 'ARE YOU HAVING COVID 19 SYMPTOMS?? \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.covidSymptons,
              }),
              new TextRun({
                text:
                  patientData.covidTesting != undefined
                    ? 'ARE YOU NEEDING? \t' +
                      (patientData.covidTesting == 'pcrTesting'
                        ? 'RAPID RT-PCR TEST FOR TRAVELING'
                        : 'RAPID ANTIGEN TEST')
                    : '',
                break: 2,
              }),
              new TextRun({
                text: 'NAME OF YOUR PHARMACY: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.pharmacyName ? patientData.pharmacyName : '',
              }),
              new TextRun({
                text: 'STREET OF PHARMACY: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.streetPharmacy
                  ? patientData.streetPharmacy
                  : '',
              }),
              new TextRun({
                text: 'CROSS INTERSECTION: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                Text: patientData.crossIntersectin
                  ? patientData.crossIntersectin
                  : '',
              }),
              new TextRun({
                text: 'ZIP CODE OF PHARMACY: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.zipcodePharmacy
                  ? patientData.zipcodePharmacy
                  : '',
              }),
              new TextRun({
                text: 'Emergency Contact First Name: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.emergencyName,
              }),
              new TextRun({
                text: 'Emergency Contact Last Name: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.emergencyLast
                  ? patientData.emergencyLast
                  : '',
              }),
              new TextRun({
                text: 'Emergency Contact Phone Number: \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.emergencyPhone
                  ? patientData.emergencyPhone
                  : '',
              }),
              new TextRun({
                text: 'CAN WE DISCLOSE YOUR MEDICAL RECORDS TO ANY ONE (eg FAMILY MEMBER )? \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.medicalRecord
                  ? patientData.medicalRecord
                  : '',
              }),
              new TextRun({
                text: 'IF YES, PLEASE PROVIDE INFORMATION BELOW: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: 'Family Member First Name: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.contactFirstName
                  ? patientData.contactFirstName
                  : '',
              }),
              new TextRun({
                text: 'Family Member Last Name: \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.contactLastName
                  ? patientData.contactLastName
                  : '',
              }),
              new TextRun({
                text: 'Family Member Relationship: \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.contactRelation
                  ? patientData.contactRelation
                  : '',
              }),
              new TextRun({
                text: 'Family Member Phone: \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.contactPhone ? patientData.contactPhone : '',
              }),
              new TextRun({
                text: 'Family Medicial History: \t',
                bold: true,

                break: 2,
              }),
              new TextRun({
                text: patientData.familyMedicialHistory
                  ? patientData.familyMedicialHistory
                  : '',
              }),
              new TextRun({
                text: 'How did you hear about us? \t',
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: patientData.hearAboutUs ? patientData.hearAboutUs : '',
              }),
              new TextRun({
                text: 'Patient Signature: \t',
                bold: true,
                break: 2,
              }),

              new ImageRun({
                data: fs.readFileSync(patientData.signaturePath),
                transformation: {
                  width: 600,
                  height: 400,
                },
              }),

              new TextRun({
                text:
                  patientData.insurance == 'Yes'
                    ? 'INSURANCE FRONT PICTURE \t'
                    : '',
                bold: true,
                break: patientData.insurance == 'Yes' ? 4 : 0,
              }),

              new ImageRun({
                data:
                  patientData.insurance == 'Yes'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.insuranceForntPath +
                          '.' +
                          fileExtension(patientData.insuranceFrontFileName)
                      )
                    : '',
                transformation: {
                  width: insWidth,
                  height: insHeight,
                },
              }),

              new TextRun({
                text:
                  patientData.insurance == 'Yes'
                    ? 'INSURANCE BACK PICTURE \t'
                    : '',
                bold: true,
                break: patientData.insurance == 'Yes' ? 2 : 0,
              }),
              new ImageRun({
                data:
                  patientData.insurance == 'Yes'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.insuranceBackPath +
                          '.' +
                          fileExtension(patientData.insuranceBackFileName)
                      )
                    : '',
                transformation: {
                  width: insWidth,
                  height: insHeight,
                },
              }),

              /* Insurance ID Card */
              new TextRun({
                text:
                  patientData.insurance == 'Yes' ? 'ID CARD PICTURE \t' : '',
                bold: true,
                break: patientData.insurance == 'Yes' ? 2 : 0,
              }),
              new ImageRun({
                data:
                  patientData.insurance == 'Yes'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.idCardPicturePath +
                          '.' +
                          fileExtension(patientData.idCardPictureName)
                      )
                    : '',
                transformation: {
                  width: insWidth,
                  height: insHeight,
                },
              }),
              /*  */

              new TextRun({
                text:
                  patientData.adult == 'No'
                    ? 'Guardian Id Card Picture \t'
                    : '',
                bold: true,
                break: patientData.adult == 'No' ? 2 : 0,
              }),
              new ImageRun({
                data:
                  patientData.adult == 'No'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.guardianIdPath +
                          '.' +
                          fileExtension(patientData.guardianIdFileName)
                      )
                    : '',
                transformation: {
                  width: adultWidth,
                  height: adultHeight,
                },
              }),
              new TextRun({
                text:
                  patientData.adult == 'No'
                    ? 'Guardian Name: \t' + patientData.guardianName
                    : '',
                break: patientData.adult == 'No' ? 2 : 0,
              }),
              new TextRun({
                text:
                  patientData.adult == 'No'
                    ? 'Guardian Relation: \t' + patientData.guardianRelation
                    : '',
                break: patientData.adult == 'No' ? 2 : 0,
              }),
              new TextRun({
                text: 'ID Card Picture: \t',
                bold: true,

                break: 2,
              }),

              new ImageRun({
                data:
                  patientData.adult == 'Yes' && patientData.insurance == 'No'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.idCardPicturePath +
                          '.' +
                          fileExtension(patientData.idCardPictureName)
                      )
                    : '',
                transformation: {
                  width:
                    patientData.adult == 'Yes' && patientData.insurance == 'No'
                      ? 600
                      : 0,
                  height:
                    patientData.adult == 'Yes' && patientData.insurance == 'No'
                      ? 400
                      : 0,
                },
              }),
            ],
          }),
        ],
      },
    ],
  })
  return doc
}

exports.writeExistingPatientData = (patientData) => {
  let insWidth,
    adultWidth = 600
  let insHeight,
    adultHeight = 400
  if (patientData.insurance == 'No') {
    insWidth = insHeight = 0
  }
  if (patientData.adult == 'Yes') {
    adultWidth = adultHeight = 0
  }
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text:
                  'HAS YOUR ADDRESS OR PHONE NUMBER CHANGED SINCE YOUR LAST VISIT?  \t' +
                  (patientData.addressChange ? patientData.addressChange : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'Address  \t' +
                  (patientData.address ? patientData.address : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'Phone Number  \t' +
                  (patientData.phoneNumber ? patientData.phoneNumber : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'First Name  \t' +
                  (patientData.firstName ? patientData.firstName : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'Middle Name  \t' +
                  (patientData.middleName ? patientData.middleName : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'Last Name  \t' +
                  (patientData.lastName ? patientData.lastName : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'Email  \t' + (patientData.email ? patientData.email : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'Date of Birth \t' +
                  (patientData.dateOfBirth ? patientData.dateOfBirth : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'Reason For Visit \t' +
                  (patientData.reasonForVisit
                    ? patientData.reasonForVisit
                    : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'ZipCode \t' +
                  (patientData.zipCode ? patientData.zipCode : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  'DO YOU HAVE IF YOU WERE EXPOSED TO COVID 19 WITHIN LAST 10 DAYS? \t' +
                  patientData.covid,
                break: 2,
              }),
              new TextRun({
                text: 'DO YOU HAVE FEVER? \t' + patientData.fever,
                break: 2,
              }),
              new TextRun({
                text:
                  'DO YOU HAVE SORE OR ITCHY  THROAT, COUGH OR CONGESTION, RUNNY NOSE? \t' +
                  patientData.coughCongestion,
                break: 2,
              }),
              new TextRun({
                text:
                  'ARE YOU HAVING SHORTNESS OF BREATH? \t' +
                  patientData.breathShortness,
                break: 2,
              }),
              new TextRun({
                text:
                  'HAVE YOU COMPLETED YOUR COVID 19 VACCINATIONS? \t' +
                  patientData.vaccinations,
                break: 2,
              }),
              new TextRun({
                text: 'DO YOU HAVE INSURANCE? \t' + patientData.insurance,
                break: 2,
              }),
              new TextRun({
                text:
                  'Family Medicial History \t' +
                  (patientData.familyMedicialHistory
                    ? patientData.familyMedicialHistory
                    : ''),
                break: 2,
              }),
              new TextRun({
                text:
                  patientData.insurance == 'Yes'
                    ? 'INSURANCE FRONT PICTURE \t'
                    : '',
                break: patientData.insurance == 'Yes' ? 2 : 0,
              }),
              new ImageRun({
                data:
                  patientData.insurance == 'Yes'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.insuranceForntPath +
                          '.' +
                          fileExtension(patientData.insuranceFrontFileName)
                      )
                    : '',
                transformation: {
                  width: insWidth,
                  height: insHeight,
                },
              }),
              new TextRun({
                text:
                  patientData.insurance == 'Yes'
                    ? 'INSURANCE BACK PICTURE \t'
                    : '',
                break: patientData.insurance == 'Yes' ? 2 : 0,
              }),
              new ImageRun({
                data:
                  patientData.insurance == 'Yes'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.insuranceBackPath +
                          '.' +
                          fileExtension(patientData.insuranceBackFileName)
                      )
                    : '',
                transformation: {
                  width: insWidth,
                  height: insHeight,
                },
              }),
              new TextRun({
                text:
                  patientData.adult == 'No'
                    ? 'Guardian Id Card Piciture \t'
                    : '',
                break: patientData.adult == 'No' ? 2 : 0,
              }),
              new ImageRun({
                data:
                  patientData.adult == 'No'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.guardianIdPath +
                          '.' +
                          fileExtension(patientData.guardianIdFileName)
                      )
                    : '',
                transformation: {
                  width: adultWidth,
                  height: adultHeight,
                },
              }),
              new TextRun({
                text:
                  patientData.adult == 'No'
                    ? 'Guardian Name \t' + patientData.guardianName
                    : '',
                break: patientData.adult == 'No' ? 2 : 0,
              }),
              new TextRun({
                text:
                  patientData.adult == 'No'
                    ? 'Guardian Relation \t' + patientData.guardianRelation
                    : '',
                break: patientData.adult == 'No' ? 2 : 0,
              }),
              new TextRun({
                text: 'ID CARD PICTURE \t',
                break: 2,
              }),
              new ImageRun({
                data:
                  patientData.adult == 'Yes' && patientData.insurance == 'No'
                    ? fs.readFileSync(
                        './uploads/' +
                          patientData.idCardPicturePath +
                          '.' +
                          fileExtension(patientData.idCardPictureName)
                      )
                    : '',
                transformation: {
                  width:
                    patientData.adult == 'Yes' && patientData.insurance == 'No'
                      ? 600
                      : 0,
                  height:
                    patientData.adult == 'Yes' && patientData.insurance == 'No'
                      ? 400
                      : 0,
                },
              }),

              new TextRun({
                text:
                  'IS THE PATIENT 18 YEARS OF AGE OR OLDER? \t' +
                  patientData.adult,
                break: 2,
              }),
              new TextRun({
                text: 'Patient Signature \t',
                break: 2,
              }),
              new ImageRun({
                data: fs.readFileSync(patientData.signaturePath),
                transformation: {
                  width: 600,
                  height: 400,
                },
              }),
            ],
          }),
        ],
      },
    ],
  })
  return doc
}

exports.writeConsentForm = (patientName, guardianName, witnessName) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'SOUTHWEST URGENT CARE',
            break: 1,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: '& FAMILY PRACTICE',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            break: 3,
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            break: 3,
          }),

          new Paragraph({
            text: '5900 CHIMNEY ROCK RD SUITE X HOUSTON TX 77081',
            break: 1,
            heading: HeadingLevel.Paragraph,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: 'PHONE 713·640-5754 FAX 800-245-8979',
            heading: HeadingLevel.Paragraph,
            alignment: AlignmentType.CENTER,
            break: 3,
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            break: 3,
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            break: 3,
          }),

          new Paragraph({
            text: 'Consent To Medically Treat A Minor',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            bold: true,
            underline: true,
            break: 5,
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            break: 3,
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text:
                  'I, the parent or guardian of ' + patientName + ' authorize.',
                break: 2,
              }),
              new TextRun({
                text: 'the doctor practice staff to perform necessary services for the child named above.',
                break: 2,
              }),
              new TextRun({
                text: 'The care provider is authorized to:',
                break: 2,
              }),
              new TextRun({
                text: '\t -obtain routine medical treatment from appropriate health care providers if ',
                break: 2,
              }),
              new TextRun({
                text: 'symptoms of illness occur (eg., fever, coughing, irregular breathing, unusual',
                break: 2,
              }),
              new TextRun({
                text: 'rashes, swallowing problems, etc.)',
                break: 2,
              }),
              new TextRun({
                text: '\t -obtain medical treatment and procedures for the child as may be ',
                break: 2,
              }),
              new TextRun({
                text: 'appropriate in emergency circumstances, including treatment by physician,',
                break: 2,
              }),
              new TextRun({
                text: 'clinical personnel and other appropriate health care providers.',
                break: 4,
              }),
              new TextRun({
                text:
                  'I, ' + guardianName + ' also consent to have ' + patientName,
                break: 4,
              }),
              new TextRun({
                text: 'comply with clinic guidelines of waiting 15 minutes after an injection.',
                break: 2,
              }),
              new TextRun({
                text:
                  patientName +
                  ' is expected to check with the nurse before leaving the clinic facility.',
                break: 5,
              }),
              new TextRun({
                text:
                  'Signature of guardian\t ' +
                  Date.now() +
                  '	\t Witness\t ' +
                  Date.now(),
                break: 5,
              }),
            ],
          }),
        ],
      },
    ],
  })
  return doc
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

exports.writeImagrationForm = (patientData) => {}
