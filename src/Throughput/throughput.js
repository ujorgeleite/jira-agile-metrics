//TODO Refactory for class for decrease parameters
var XLSXChart = require("xlsx-chart");

const {
  mapTitles,
  mapDataChart,
  mapIssueTypes,
  mapWorkItemsTotal,
  mapThroughputByType,
} = require("./Mappers/index");

const drawThroughputChart = (titles, dataChart, issueTypes, srcDir) => {
  var xlsxChart = new XLSXChart();
  var opts = {
    file: `${srcDir}Files/Output/Throughput.xlsx`,
    chart: "column",
    titles: titles,
    fields: issueTypes,
    data: dataChart,
  };

  xlsxChart.writeFile(opts, function (err) {
    console.log("File: ", opts.file);
  });
};

const exportThroughputChart = async (file,srcDir) => {
  const data = await mapWorkItemsTotal({ rows: file.rows, daysPeriod: 7 });
  const issueTypes = mapIssueTypes(file.rows);
  const throughputByType = data.map((item) =>
    mapThroughputByType(item, issueTypes)
  );
  const dataChart = mapDataChart(throughputByType);
  const titles = mapTitles(data);
  issueTypes.push("Throughput")
  return drawThroughputChart(titles, dataChart, issueTypes,srcDir);
};

module.exports = exportThroughputChart;
