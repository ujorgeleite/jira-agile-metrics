const file = require("./File/file");
const { BreakFromJiraFile } = require("./File/breakFile");
const exportThroughputChart = require("./Throughput/throughput");
const exportLeadtimeChart = require("./Leadtime/leadtime");

const runCode = async () => {
  console.time("general execution");
  const fileNames = await BreakFromJiraFile("./Files/Input/fileTest.xlsx");

  fileNames.map(async (fileName) => {
    setTimeout(async () => {
      const readFile = await file.getFile(fileName);
      setTimeout(async () => {
        exportThroughputChart(readFile);
        exportLeadtimeChart(readFile)
      }, 4000);
      //console.log(readFile);
    }, 4000);
  });

  console.timeEnd("general execution");
};

runCode();
