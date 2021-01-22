var XLSXChart = require("xlsx-chart");

const {
  mapTitles,
  mapDataChart,
  mapWorkItemsTotal
} = require("./Mappers/index");

const drawThroughputChart = (titles, dataChart) => {
  var xlsxChart = new XLSXChart();
  var opts = {
    file: "./Files/Output/chart.xlsx",
    chart: "column",
    titles: titles,
    fields: ["Throughput"],
    data: dataChart,
  };

  xlsxChart.writeFile(opts, function (err) {
    console.log("File: ", opts.file);
  });
};

const exportThroughputChart = async (file) => {
  const data = await mapWorkItemsTotal({ rows: file.rows, daysPeriod: 7 });
  const dataChart = mapDataChart(data);
  const titles = mapTitles(data);
  return drawThroughputChart(titles, dataChart);
};

module.exports = exportThroughputChart;
