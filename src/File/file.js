const readXlsxFile = require("read-excel-file/node");
const schema = require("./schema");

class File {
  constructor() {}

  async getFile(fileName) {
    const file = await readXlsxFile(fileName, { schema });
    return file;
  }
}

module.exports = new File();
