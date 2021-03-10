const mapDataChart = ({ leadTimeByPeriod, cycleTimeByPeriod }) => {
  const dataString = leadTimeByPeriod.map((item) => {
    const cycleItem = cycleTimeByPeriod.filter(
      (cycleItem) =>
        cycleItem.month == item.month && cycleItem.year == item.year
    )[0];
    const cycleTime =
      !!cycleItem
        ? cycleItem.businessCycleTime 
        : 0;

    return `"${item.period}": {"LeadTimeNegócio": ${item.businessLeadTime},"CycleTimeNegócio": ${cycleTime}, "QuantidadeItens": ${item.quantidadeItens}} `;
  });

  const dataFinal = `{${dataString.toLocaleString()}}`;
  return JSON.parse(dataFinal);
};

module.exports = mapDataChart;
