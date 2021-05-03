//TODO Reactory concurrency file

const fs = require("fs");
const { promisify } = require("util");
const readDir = promisify(fs.readdir);

class FileExport {
  constructor(srcDir) {
    this.sourcePath = srcDir;
    this.file = require(`${srcDir}File/file`);
    const { BreakFromJiraFile } = require(`${this.sourcePath}File/breakFile`);
    this.breakFromJiraFile = BreakFromJiraFile;
    this.exportThroughputChart = require(`${this
      .sourcePath}Throughput/throughput`);
    this.exportLeadTimeChart = require(`${this.sourcePath}Leadtime/leadtime`);
  }

  async exportFiles() {
    const dirFileNames = await readDir(`${this.sourcePath}/Files/Input/`);
    dirFileNames.map(async item => {
      const fileNames = await this.breakFromJiraFile(
        `${this.sourcePath}Files/Input/${item}`
      );

      return fileNames.map(async fileName => {
        setTimeout(async () => {
          const readFile = await this.file.getFile(fileName);
          const params = { fileName: item.replace('.xlsx','').toUpperCase(), file: readFile };

          await this.exportThroughputChart(params, this.sourcePath);
          await this.exportLeadTimeChart(params, this.sourcePath);
        }, 2000);
      });
    });
  }
}

module.exports = FileExport;
