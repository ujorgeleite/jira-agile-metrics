const Excel = require("exceljs");
const workbook = new Excel.Workbook();

const { mapFromSheetToManyFiles } = require('./Mappers/index')

const BreakFromJiraFile = async (nameFile) => {
    try{
        const file = await workbook.xlsx.readFile(nameFile);
        const fileNames = await mapFromSheetToManyFiles(file,Excel)
        return fileNames
    }catch(ex){
        console.log('exception', ex)
    }
    
}

module.exports = {
    BreakFromJiraFile
}