var XLSXChart = require("xlsx-chart");
var fs = require("fs");

const {
  mapFields,
  mapDataChart,
  mapLeadTimeData,
  mapLeadTimeByPeriod,
} = require("./Mappers/index");

const {
  mapCycleTimeData,
  mapCycleTimeByPeriod,
} = require("../CycleTime/Mappers/index");

const drawLeadtimeChart = (dataChart, titles) => {
  var xlsxChart = new XLSXChart();
  var opts = {
    file: "./Files/Output/Leadtime.xlsx",
    chart: "column",
    titles: titles,
    fields: ["LeadTimeNegócio","CycleTimeNegócio","CycleTimeProblemas","QuantidadeItensNegócio","QuantidadeItensProblemas"],
    data: dataChart,
  };

  xlsxChart.writeFile(opts, function (err) {
    console.log("File: ", opts.file);
  });
};

const exportLeadtimeChart = async (file) => {
  const data = await mapLeadTimeData(file);

  const cycleTimeData = mapCycleTimeData(data);
  const cycleTimeByPeriod = mapCycleTimeByPeriod(cycleTimeData);

  const leadTimeByPeriod = mapLeadTimeByPeriod(data);
  const titles = await mapFields(leadTimeByPeriod);
  const dataChart = await mapDataChart({ leadTimeByPeriod, cycleTimeByPeriod });

  return drawLeadtimeChart(dataChart, titles);
};

module.exports = exportLeadtimeChart;
