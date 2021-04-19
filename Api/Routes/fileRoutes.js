const fs = require("fs");
const { Readable } = require("stream");
const { promisify } = require("util");


const BaseRoute = require("./Base/baseRoute");
const readFiles = promisify(fs.readdir);

class FileRoutes extends BaseRoute {
  constructor(rootPath, downloadPath) {
    super();
    this.rootPath = rootPath;
    this.downloadRoothPath = this.rootPath + downloadPath
  }

  listFiles() {
    return {
      path: "/List",
      method: "GET",
      handler: async () => {
        return await readFiles(`${this.rootPath}/Files/Input`);
      },
    };
  }
  downloadFiles() {
    return {
      path: "/Download",
      method: "GET",
      handler: async (request, h) => {
        const { fileName } = request.query;
        const stream = fs.createReadStream(`${this.downloadRoothPath}/${fileName}`);
        const readableStream = new Readable().wrap(stream);

        return h
          .response(readableStream)
          .header(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          )
          .header("Content-Disposition", "attachment; filename= " + fileName);
      },
    };
  }
}

module.exports = FileRoutes;
