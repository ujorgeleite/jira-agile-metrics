//TODO Refactory file routes
const fs = require("fs");
const { Readable } = require("stream");
const { promisify } = require("util");

const BaseRoute = require("./Base/baseRoute");
const readFiles = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);

class FileRoutes extends BaseRoute {
  constructor(rootPath, fileExport) {
    super();
    this.rootPath = rootPath;
    this.downloadRootPath = this.rootPath + "/Files/Output";
    this.uploadRootPath = this.rootPath + "/Files/Input";
    this.fileExport = fileExport;
  }

  listFiles() {
    return {
      path: "/List",
      method: "GET",
      handler: async () => {
        const data = await readFiles(`${this.rootPath}/Files/Input`);
        return data.map(item => {
          return { name: item };
        });
      },
    };
  }
  downloadFiles() {
    return {
      path: "/Download",
      method: "GET",
      handler: async (request, h) => {
        const { fileName } = request.query;
        const stream = fs.createReadStream(
          `${this.downloadRootPath}/${fileName}`
        );
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

  generateFiles() {
    return {
      path: "/Process",
      method: "Post",
      handler: async () => {
        await this.fileExport.exportFiles();
        return "Gerado com sucesso";
      },
    };
  }
  uploadFile() {
    return {
      path: "/Upload",
      method: "POST",
      handler: async (request, h) => {
        try {
          const { upload0, fname } = request.payload;
          await writeFile(`${this.uploadRootPath}/${fname}.xlsx`, upload0);
          return h.response(`Arquivo ${fname} salvo com sucesso.`);
        } catch (ex) {
          h.reject(ex);
        }
      },
    };
  }
}

module.exports = FileRoutes;
