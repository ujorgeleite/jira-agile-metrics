const mapDataChart = ({ leadTimeByPeriod, cycleTimeByPeriod }) => {
  const dataString = leadTimeByPeriod.map((item) => {
    const cycleItem = cycleTimeByPeriod.filter(
      (cycleItem) =>
        cycleItem.month == item.month && cycleItem.year == item.year
    )[0];
    const { businessCycleTime, incidentCycleTime } = cycleItem;

    return `"${item.period}": {"LeadTimeNegócio": ${item.businessLeadTime},"CycleTimeNegócio": ${businessCycleTime.value},"CycleTimeProblemas": ${incidentCycleTime.value}, "QuantidadeItensNegócio": ${item.quantidadeItens},"QuantidadeItensProblemas": ${incidentCycleTime.qtdItens}} `;
  });

  const dataFinal = `{${dataString.toLocaleString()}}`;
  return JSON.parse(dataFinal);
};

module.exports = mapDataChart;
