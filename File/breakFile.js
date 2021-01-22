const Excel = require("exceljs");
const workbook = new Excel.Workbook();

const { mapFromSheetToManyFiles } = require('./Mappers/index')

const BreakFromJiraFile = async (nameFile) => {
    const file = await workbook.xlsx.readFile(nameFile);
    const fileNames = await mapFromSheetToManyFiles(file,Excel)
    return fileNames
}

module.exports = {
    BreakFromJiraFile
}