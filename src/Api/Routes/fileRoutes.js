//TODO Refactory file routes
const fs = require("fs");
const { Readable } = require("stream");
const { promisify } = require("util");

const BaseRoute = require("./Base/baseRoute");
const readFiles = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);

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

  listDownloadFiles() {
    return {
      path: "/Download/List",
      method: "GET",
      handler: async () => {
        const data = await readFiles(`${this.rootPath}/Files/Output`);
        return data.filter(item => item.indexOf(".xlsx") >= 0)
        .map(item => {
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
          const { uploadFile, fileName } = request.payload;
          await writeFile(`${this.uploadRootPath}/${fileName}.xlsx`, uploadFile);
          return h.response(`Arquivo ${fileName} salvo com sucesso.`);
        } catch (ex) {
          h.reject(ex);
        }
      },
    };
  }

  deleteFiles(){
    return {
      path: "/Delete",
      method: "DELETE",
      handler: async (request, h) => {
        const inputFiles = await readFiles(`${this.rootPath}/Files/Input`);
        const downloadFiles = await readFiles(`${this.rootPath}/Files/Output`);
        
        inputFiles.map(async (item) => {
          const file = `${this.rootPath}/Files/Input/${item}`
          await deleteFile(file);
        })

        downloadFiles.map(async (item) => {
          const file = `${this.rootPath}/Files/Output/${item}`
          await deleteFile(file);
        })

        return "Arquivos removidos com  sucesso";
      },
    };
  }


}

module.exports = FileRoutes;
