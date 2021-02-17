const mapCell = require('./mapCell') 

const listAddress = [];

const isValidSheet = ({ name }) => {
  return !name.toUpperCase().includes("ABOUT");
};


const autoFillEmptyCells = (address, indexCell, valueRows) => {
  while (address.indexOf(listAddress[indexCell]) < 0) {
    indexCell = indexCell + 1;
    valueRows.push("empty");
  }

  return indexCell;
};

const mapCells = async (row, rowIndex) => {
  const valueRows = [];
  let index = 0;
  await row._cells.map(async (cell) => {
    const address = cell.address;
    if (rowIndex == 1) listAddress.push(address.substring(0, 1));
    if (rowIndex != 1) {
      index = autoFillEmptyCells(address, index, valueRows);
    }
    index++;
    const cellCopy = row.getCell(index);

    valueRows.push(mapCell(cellCopy));
  });

  return valueRows;
};

const mapRows = async (sheet) => {
  const rowsValues = [];

  await sheet.eachRow(async (row, indexRow) => {
    const cells = await mapCells(row, indexRow);
    await rowsValues.push(cells);
  });

  return rowsValues;
};

const mapFromSheetToManyFiles = async (file, Excel) => {
  const fileNames = [];

  await file.eachSheet(async (sheet, index) => {
    if (isValidSheet(sheet)) {
      const newWorkbook = new Excel.Workbook();
      const workSheet = newWorkbook.addWorksheet(`worksheet_${index}`);
      const rows = await mapRows(sheet);
      workSheet.addRows(rows);
      const fileName = `./Files/SlicedFiles/file_${index}.xlsx`;
      await fileNames.push(fileName);
      await newWorkbook.xlsx.writeFile(fileName);
    }
  });

  return fileNames;
};

module.exports = mapFromSheetToManyFiles
