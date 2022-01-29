
const { ImageRun } = require("docx");
const docx = require("docx");
const fs = require("fs");
const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun  } = docx;
var fileExtension = require('file-extension');

exports.writeNewPatientData = (patientData) => {
    let insWidth,adultWidth = 600;
    let insHeight,adultHeight = 400;
    if(patientData.insurance == "No"){
        insWidth = insHeight = 0;
    }
    if(patientData.adult == "Yes"){
        adultWidth = adultHeight = 0;
    }
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "First Name  \t"+ (patientData.firstName ? patientData.firstName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Middle Name  \t"+ (patientData.middleName ? patientData.middleName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Last Name  \t"+ (patientData.lastName ? patientData.lastName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Address  \t"+ (patientData.address ? patientData.address : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Date of Birth \t"+ ((patientData.dateOfBirth && patientData.dateOfBirth != undefined) ? patientData.dateOfBirth : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Age \t"+ ((patientData.age && patientData.age != undefined) ? patientData.age : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "APT \t"+ ((patientData.apt && patientData.apt != undefined) ? patientData.apt : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "City \t"+ ((patientData.city && patientData.city != undefined) ? patientData.city : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Race \t"+ ((patientData.race && patientData.race != undefined) ? patientData.race : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "State \t"+ ((patientData.state && patientData.state != undefined) ? patientData.state : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Zip \t"+ ((patientData.zipCode && patientData.zipCode != undefined) ? patientData.zipCode : ''),
                            break: 2,
                        }),

                        new TextRun({
                            text: "Gender \t"+patientData.gender,
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU HAVE INSURANCE? \t" +(patientData.insurance),
                            break: 3,
                        }),
                        new TextRun({
                            text: (patientData.insurance == "Yes" ? "INSURANCE FRONT PICTURE \t" : ''),
                            break: (patientData.insurance == "Yes" ? 4 : 0),
                        }),
                        new ImageRun({
                            data: (patientData.insurance == "Yes" ? fs.readFileSync("./uploads/"+patientData.insuranceForntPath+'.'+fileExtension(patientData.insuranceFrontFileName)) : ''),
                            transformation: {
                                width: insWidth,
                                height: insHeight,
                            }
                        }),
                        new TextRun({
                            text: (patientData.insurance == "Yes" ? "INSURANCE BACK PICTURE \t" : ''),
                            break: (patientData.insurance == "Yes" ? 2 : 0),
                        }),
                        new ImageRun({
                            data: (patientData.insurance == "Yes" ? fs.readFileSync("./uploads/"+patientData.insuranceBackPath+'.'+fileExtension(patientData.insuranceBackFileName)) : ''),
                            transformation: {
                                width: insWidth,
                                height: insHeight,
                            }
                        }),
                        new TextRun({
                            text: (patientData.adult == "No" ? "Guardian Id Card Piciture \t" : ""),
                            break: (patientData.adult == "No" ? 2 : 0),
                        }),
                        new ImageRun({
                            data: (patientData.adult == "No" ? fs.readFileSync("./uploads/"+patientData.guardianIdPath+'.'+fileExtension(patientData.guardianIdFileName)): ''),
                            transformation: {
                                width: adultWidth,
                                height: adultHeight,
                            }
                        }),
                        new TextRun({
                            text: (patientData.adult == "No" ? "Guardian Name \t"+patientData.guardianName : ""),
                            break: (patientData.adult == "No" ? 2 : 0),
                        }),
                        new TextRun({
                            text: (patientData.adult == "No" ? "Guardian Relation \t"+patientData.guardianRelation : ""),
                            break: (patientData.adult == "No" ? 2 : 0),
                        }),
                        new TextRun({
                            text: "ID Card Piciture \t",
                            break: 2,
                        }),
                        new ImageRun({
                            data: fs.readFileSync("./uploads/"+patientData.idCardPicturePath+'.'+fileExtension(patientData.idCardPictureName)),
                            transformation: {
                                width: 600,
                                height: 400,
                            }
                        }),
                        new TextRun({
                            text: "Marital Status \t"+ ((patientData.maritalStatus && patientData.maritalStatus != undefined) ? patientData.maritalStatus : ''),
                            break: 2,
                        }),

                        new TextRun({
                            text: "Occupation \t"+ ((patientData.occupation && patientData.occupation != undefined) ? patientData.occupation : ''),
                            break: 2,
                        }),

                        new TextRun({
                            text: "Mobile Phone No \t"+ ((patientData.mobilePhoneNo && patientData.mobilePhoneNo != undefined) ? patientData.mobilePhoneNo : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "DayTime Phone No \t"+ ((patientData.dayTimePhoneNo && patientData.dayTimePhoneNo != undefined) ? patientData.dayTimePhoneNo : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "SSN \t"+ ((patientData.ssn && patientData.ssn != undefined) ? patientData.ssn : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Email \t"+ ((patientData.email && patientData.email != undefined) ? patientData.email : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "HAVE YOU HAD ANY SURGERIES IN THE PAST? \t"+patientData.surgery,
                            break: 2,
                        }),
                        new TextRun({
                            text: "Surgery Reason Explain \t"+ (patientData.surgeryExplain ? patientData.surgeryExplain : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "ARE YOU ALLERGIC TO ANY MEDICATIONS? \t"+patientData.alergic,
                            break: 2,
                        }),
                        new TextRun({
                            text: "ALLERGIC MEDICATIONS Explain \t"+ (patientData.alergicExplain ? patientData.alergicExplain : ''),
                            break: 2,
                        }),

                        new TextRun({
                            text: "DO YOU HAVE ANY ONGOING MEDICAL PROBLEMS? \t"+patientData.medicalProblem,
                            break: 2,
                        }),
                        new TextRun({
                            text: "Medical Problem Explain \t"+ (patientData.medicalProblemExplain ? patientData.medicalProblemExplain : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "LIST HERE ANY MEDICATIONS YOU ARE CURRENTLY TAKING: \t"+ (patientData.medicationList ? patientData.medicationList : ''),
                            break: 2,
                        }),

                        new TextRun({
                            text: "DO YOU SMOKE? \t"+patientData.smoke,
                            break: 2,
                        }),

                        new TextRun({
                            text: "HOW MUCH: \t"+ (patientData.smokeExplain ? patientData.smokeExplain : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "CHEW TOBACCO?  \t"+patientData.tobacco,
                            break: 2,
                        }),
                        new TextRun({
                            text: "HOW MUCH: \t"+ (patientData.tobaccoExplain ? patientData.tobaccoExplain : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU DRINK ALCOHOL?  \t"+patientData.alcohol,
                            break: 2,
                        }),
                        new TextRun({
                            text: "HOW MUCH: \t"+ (patientData.alcoholExplain ? patientData.alcoholExplain : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU USE DRUGS?  \t"+patientData.drugs,
                            break: 2,
                        }),
                        new TextRun({
                            text: "HOW MUCH: \t"+ (patientData.drugsExplain ? patientData.drugsExplain : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "REASON FOR VISIT TODAY:  \t"+ (patientData.visitReason ? patientData.visitReason : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "DID YOU HAVE YEARLY PHYSICAL THIS YEAR?  \t"+patientData.yearlyPhysical,
                            break: 2,
                        }),
                        new TextRun({
                            text: "HAVE YOU BEEN EXPOSED TO COVID? \t"+patientData.covid,
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU HAVE ANY COUGH , CONGESTION OR SORE THROAT?  \t"+patientData.coughCongestion,
                            break: 2,
                        }),
                        new TextRun({
                            text: "ARE YOU HAVING SHORTNESS OF BREATH? \t"+patientData.breathShortness,
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU HAVE FEVER? \t"+patientData.fever,
                            break: 2,
                        }),
                        new TextRun({
                            text: "ARE YOU HAVING COVID 19 SYMPTOMS?? \t"+patientData.covidSymptons,
                            break: 2,
                        }),
                        new TextRun({
                            text: (patientData.covidTesting != undefined ? ("ARE YOU NEEDING? \t"+(patientData.covidTesting == 'pcrTesting' ? 'RAPID RT-PCR TEST FOR TRAVELING' : 'RAPID ANTIGEN TEST')) : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "NAME OF YOUR PHARMACY: \t"+ (patientData.pharmacyName ? patientData.pharmacyName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "STREET OF PHARMACY: \t"+ (patientData.streetPharmacy ? patientData.streetPharmacy : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "CROSS INTERSECTION: \t"+ (patientData.crossIntersectin ? patientData.crossIntersectin : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "ZIP CODE OF PHARMACY: \t"+ (patientData.zipcodePharmacy ? patientData.zipcodePharmacy : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Emergency Contact First Name: \t"+ (patientData.emergencyName ? patientData.emergencyName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Emergency Contact Last Name: \t"+ (patientData.emergencyLast ? patientData.emergencyLast : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Emergency Contact Phone Number: \t"+ (patientData.emergencyPhone ? patientData.emergencyPhone : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "CAN WE DISCLOSE YOUR MEDICAL RECORDS TO ANY ONE (eg FAMILY MEMBER )? \t"+ (patientData.medicalRecord ? patientData.medicalRecord : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "IF YES, PLEASE PROVIDE INFORMATION BELOW \t",
                            break: 2,
                        }),
                        new TextRun({
                            text: "Family Member Name \t"+ (patientData.contactName ? patientData.contactName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Family Member Relationship \t"+ (patientData.contactRelation ? patientData.contactRelation : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Family Member Phone \t"+ (patientData.contactPhone ? patientData.contactPhone : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Family Medicial History \t"+ (patientData.familyMedicialHistory ? patientData.familyMedicialHistory : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "How did you hear about us? \t"+ (patientData.hearAboutUs ? patientData.hearAboutUs : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Patient Signature \t",
                            break: 2,
                        }),
                        new ImageRun({
                            data: fs.readFileSync(patientData.signaturePath),
                            transformation: {
                                width: 600,
                                height: 400,
                            }
                        }),

                    ],
                }),
            ],
        }],
    });
    return doc;
}

exports.writeExistingPatientData = (patientData) => {
    let insWidth,adultWidth = 600;
    let insHeight,adultHeight = 400;
    if(patientData.insurance == "No"){
        insWidth = insHeight = 0;
    }
    if(patientData.adult == "Yes"){
        adultWidth = adultHeight = 0;
    }
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "HAS YOUR ADDRESS OR PHONE NUMBER CHANGED SINCE YOUR LAST VISIT?  \t"+(patientData.addressChange ? patientData.addressChange : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Address  \t"+(patientData.address ? patientData.address : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Phone Number  \t"+(patientData.phoneNumber ? patientData.phoneNumber : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "First Name  \t"+ (patientData.firstName ? patientData.firstName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Middle Name  \t"+ (patientData.middleName ? patientData.middleName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Last Name  \t"+ (patientData.lastName ? patientData.lastName : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Email  \t"+ (patientData.email ? patientData.email : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Date of Birth \t" + (patientData.dateOfBirth ? patientData.dateOfBirth : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Reason For Visit \t" + (patientData.reasonForVisit ? patientData.reasonForVisit : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "ZipCode \t" + (patientData.zipCode ? patientData.zipCode : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU HAVE IF YOU WERE EXPOSED TO COVID 19 WITHIN LAST 10 DAYS? \t" +patientData.covid,
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU HAVE FEVER? \t" +patientData.fever,
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU HAVE SORE OR ITCHY  THROAT, COUGH OR CONGESTION, RUNNY NOSE? \t" +patientData.coughCongestion,
                            break: 2,
                        }),
                        new TextRun({
                            text: "ARE YOU HAVING SHORTNESS OF BREATH? \t" +patientData.breathShortness,
                            break: 2,
                        }),
                        new TextRun({
                            text: "HAVE YOU COMPLETED YOUR COVID 19 VACCINATIONS? \t" +patientData.vaccinations,
                            break: 2,
                        }),
                        new TextRun({
                            text: "DO YOU HAVE INSURANCE? \t" +(patientData.insurance),
                            break: 2,
                        }),
                        new TextRun({
                            text: "Family Medicial History \t"+ (patientData.familyMedicialHistory ? patientData.familyMedicialHistory : ''),
                            break: 2,
                        }),
                        new TextRun({
                            text: (patientData.insurance == "Yes" ? "INSURANCE FRONT PICTURE \t" : ''),
                            break: (patientData.insurance == "Yes" ? 2 : 0),
                        }),
                        new ImageRun({
                            data: (patientData.insurance == "Yes" ? fs.readFileSync("./uploads/"+patientData.insuranceForntPath+'.'+fileExtension(patientData.insuranceFrontFileName)) : ''),
                            transformation: {
                                width: insWidth,
                                height: insHeight,
                            }
                        }),
                        new TextRun({
                            text: (patientData.insurance == "Yes" ? "INSURANCE BACK PICTURE \t" : ''),
                            break: (patientData.insurance == "Yes" ? 2 : 0),
                        }),
                        new ImageRun({
                            data: (patientData.insurance == "Yes" ? fs.readFileSync("./uploads/"+patientData.insuranceBackPath+'.'+fileExtension(patientData.insuranceBackFileName)) : ''),
                            transformation: {
                                width: insWidth,
                                height: insHeight,
                            }
                        }),
                        new TextRun({
                            text: (patientData.adult == "No" ? "Guardian Id Card Piciture \t" : ""),
                            break: (patientData.adult == "No" ? 2 : 0),
                        }),
                        new ImageRun({
                            data: (patientData.adult == "No" ? fs.readFileSync("./uploads/"+patientData.guardianIdPath+'.'+fileExtension(patientData.guardianIdFileName)): ''),
                            transformation: {
                                width: adultWidth,
                                height: adultHeight,
                            }
                        }),
                        new TextRun({
                            text: (patientData.adult == "No" ? "Guardian Name \t"+patientData.guardianName : ""),
                            break: (patientData.adult == "No" ? 2 : 0),
                        }),
                        new TextRun({
                            text: (patientData.adult == "No" ? "Guardian Relation \t"+patientData.guardianRelation : ""),
                            break: (patientData.adult == "No" ? 2 : 0),
                        }),
                        new TextRun({
                            text: "ID CARD PICTURE \t",
                            break: 2,
                        }),
                        new ImageRun({
                            data: fs.readFileSync("./uploads/"+patientData.idCardPicturePath+'.'+fileExtension(patientData.idCardPictureName)),
                            transformation: {
                                width: 600,
                                height: 400,
                            }
                        }),

                        new TextRun({
                            text: "IS THE PATIENT 18 YEARS OF AGE OR OLDER? \t" +patientData.adult,
                            break: 2,
                        }),
                        new TextRun({
                            text: "Patient Signature \t",
                            break: 2,
                        }),
                        new ImageRun({
                            data: fs.readFileSync(patientData.signaturePath),
                            transformation: {
                                width: 600,
                                height: 400,
                            }
                        }),
                    ],
                }),
            ],
        }],
    });
    return doc;
}

exports.writeConsentForm = (patientName,guardianName,witnessName) => {

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    text: "SOUTHWEST URGENT CARE",
                    break: 1,
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    text: "& FAMILY PRACTICE",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    break: 3,
                }),
                new Paragraph({
                    text: "",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    break: 3,
                }),

                new Paragraph({
                    text: "5900 CHIMNEY ROCK RD SUITE X HOUSTON TX 77081",
                    break: 1,
                    heading: HeadingLevel.Paragraph,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    text: "PHONE 713·640-5754 FAX 800-245-8979",
                    heading: HeadingLevel.Paragraph,
                    alignment: AlignmentType.CENTER,
                    break: 3,
                }),
                new Paragraph({
                    text: "",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    break: 3,
                }),
                new Paragraph({
                    text: "",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    break: 3,
                }),

                new Paragraph({
                    text: "Consent To Medically Treat A Minor",
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                    bold: true,
                    underline: true,
                    break: 5,
                }),
                new Paragraph({
                    text: "",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    break: 3,
                }),
                new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: "I, the parent or guardian of "+ patientName+" authorize.",
                            break: 2,
                        }),
                        new TextRun({
                            text: "the doctor practice staff to perform necessary services for the child named above.",
                            break: 2,
                        }),
                        new TextRun({
                            text: "The care provider is authorized to:",
                            break: 2,
                        }),
                        new TextRun({
                            text: "\t -obtain routine medical treatment from appropriate health care providers if ",
                            break: 2,
                        }),
                        new TextRun({
                            text: "symptoms of illness occur (eg., fever, coughing, irregular breathing, unusual",
                            break: 2,
                        }),
                        new TextRun({
                            text: "rashes, swallowing problems, etc.)",
                            break: 2,
                        }),
                        new TextRun({
                            text: "\t -obtain medical treatment and procedures for the child as may be ",
                            break: 2,
                        }),
                        new TextRun({
                            text: "appropriate in emergency circumstances, including treatment by physician,",
                            break: 2,
                        }),
                        new TextRun({
                            text: "clinical personnel and other appropriate health care providers.",
                            break: 4,
                        }),
                        new TextRun({
                            text: "I, "+guardianName+" also consent to have "+patientName,
                            break: 4,
                        }),
                        new TextRun({
                            text: "comply with clinic guidelines of waiting 15 minutes after an injection.",
                            break: 2,
                        }),
                        new TextRun({
                            text: patientName+" is expected to check with the nurse before leaving the clinic facility.",
                            break: 5,
                        }),
                        new TextRun({
                            text: "Signature of guardian\t "+Date.now()+"	\t Witness\t "+Date.now(),
                            break: 5,
                        }),
                    ]
                }),
            ],
        }],
    });
    return doc;
}

exports.writeImagrationForm = (patientData) =>{

}