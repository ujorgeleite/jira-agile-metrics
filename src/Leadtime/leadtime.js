//TODO Refactory for class for decrease parameters
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
} = require("../Cycletime/Mappers/index");

const drawLeadtimeChart = ({fileName, dataChart, titles}, src) => {
  var xlsxChart = new XLSXChart();
  var opts = {
    file: `${src}Files/Output/${fileName}_Leadtime.xlsx`,
    chart: "column",
    titles: titles,
    fields: ["LeadTimeNegócio","CycleTimeNegócio","CycleTimeProblemas","QuantidadeItensNegócio","QuantidadeItensProblemas"],
    data: dataChart,
  };

  xlsxChart.writeFile(opts, function (err) {
    console.log("File: ", opts.file);
  });
};

const exportLeadtimeChart = async ({fileName, file}, src) => {
  const data = await mapLeadTimeData(file);

  const cycleTimeData = mapCycleTimeData(data);
  const cycleTimeByPeriod = mapCycleTimeByPeriod(cycleTimeData);

  const leadTimeByPeriod = mapLeadTimeByPeriod(data);
  const titles = await mapFields(leadTimeByPeriod);
  const dataChart = await mapDataChart({ leadTimeByPeriod, cycleTimeByPeriod });
  const params = {fileName, dataChart, titles}
  return drawLeadtimeChart(params, src);
};

module.exports = exportLeadtimeChart;
