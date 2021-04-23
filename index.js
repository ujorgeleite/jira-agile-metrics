const path = require('path');
const srcDir = path.dirname(require.main.filename)+'/src/'
const file = require(`${srcDir}File/file`);
const { BreakFromJiraFile } = require(`${srcDir}File/breakFile`);
const exportThroughputChart = require(`${srcDir}Throughput/throughput`);
const exportLeadtimeChart = require(`${srcDir}Leadtime/leadtime`);

const runCode = async () => {
  console.time("general execution");
  const fileNames = await BreakFromJiraFile(`${srcDir}Files/Input/fileTest.xlsx`);

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
