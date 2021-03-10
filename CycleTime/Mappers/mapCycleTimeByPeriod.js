const mapMonth = require("../../Leadtime/Mappers/mapMonths");

const moment = require("moment");

const isInPeriodList = (filteredItems, { Month, Year }) => {
  return filteredItems.some(
    ({ month, year }) => month == Month && year == Year
  );
};

const isResolved = (item) => {
  return !!item.Resolved && item.Resolved != "empty";
};

const sortDates = (leadTimeData) => {
  return leadTimeData
    .filter(isResolved)
    .sort((a, b) => a.Resolved - b.Resolved);
};

const isBusinessItem = (item) => ["Story"].includes(item.IssueType);

const mapBusinessCycleTime = ({ Month, Year }, cycleTimeItems) => {
  const businessItems = cycleTimeItems
    .filter((cycleItem) => isBusinessItem(cycleItem))
    .filter((cycleItemFiltered) => {
      const dateString = new Date(cycleItemFiltered.Resolved)
        .toISOString()
        .slice(0, 10);
      const compareDate = `${Year}-${mapMonth(Month)}-01`;

      return new moment(dateString).isSame(compareDate, "month");
    });

  const qtdItens = businessItems.length;

  const businessCycleTime = Math.round(
    businessItems.reduce((acc, curr) => {
      return acc + curr.CycleTime;
    }, 0) / qtdItens
  );

  const value = businessCycleTime > 0 ? businessCycleTime : 0;

  return { qtdItens, value };
};

const mapCycleTimeByPeriod = (cycleTimeData) => {
  const itemsInOrderByDate = sortDates(cycleTimeData);
  const itemsInPeriod = [];

  itemsInOrderByDate.filter(isResolved).map((item) => {
    const { Month, Year } = item;

    if (!isInPeriodList(itemsInPeriod, { Month, Year })) {
      const businessCycleTime = mapBusinessCycleTime(
        { Month, Year },
        cycleTimeData
      );

      itemsInPeriod.push({
        month: Month,
        year: Year,
        period: `${Month + 1}-${Year}`,
        quantidadeItens: businessCycleTime.qtdItens,
        businessCycleTime: businessCycleTime.value,
      });
    }
  });

  return itemsInPeriod;
};

module.exports = mapCycleTimeByPeriod;
