const res = require("express/lib/response");
const fs = require("fs");
const pdfDoc = require("pdf-lib");
const { degrees, PDFDocument, rgb, StandardFonts } = pdfDoc;
exports.readPdfDocument = (req, res, next) => {
    modifyPdf();
    res.json('read the pdf file');
};

async function modifyPdf() {

    const pdfDoc = await PDFDocument.load(fs.readFileSync('./public/pdfFile/i-693-latest.pdf'),{ ignoreEncryption: true });
    const form = pdfDoc.getForm();
    const fields = form.getFields()
    fields.forEach(field => {
    const name = field.getName()
    console.log('Field name:', name)
    })
    const textField = form.getTextField('form1[0].#subform[0].Pt1Line1c_MiddleName[0]');
    textField.setText('Imran khan')
    // const textField = form.createTextField('best.gundam')
    // textField.setText('Exia')
     fs.writeFileSync('./public/pdfFile/i-693-latest.pdf', await pdfDoc.save({updateFieldAppearances: false}));
    //const pdfBytes = await pdfDoc.save()
  }