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

const isIncidentItem = (item) =>["Incident", "Support", "Problem"].includes(item.IssueType);

const mapCycleTime = ({ Month, Year }, cycleTimeItems, condition) => {
  const cycleItems = cycleTimeItems
    .filter((cycleItem) => condition(cycleItem))
    .filter((cycleItemFiltered) => {
      const dateString = new Date(cycleItemFiltered.Resolved)
        .toISOString()
        .slice(0, 10);
      const compareDate = `${Year}-${mapMonth(Month)}-01`;

      return new moment(dateString).isSame(compareDate, "month");
    });

  const qtdItens = cycleItems.length;

  const cycleTime = Math.round(
    cycleItems.reduce((acc, curr) => {
      return acc + curr.CycleTime;
    }, 0) / qtdItens
  );

  const value = cycleTime > 0 ? cycleTime : 0;

  return { qtdItens, value };
};

const mapCycleTimeByPeriod = (cycleTimeData) => {
  const itemsInOrderByDate = sortDates(cycleTimeData);
  const itemsInPeriod = [];

  itemsInOrderByDate.filter(isResolved).map((item) => {
    const { Month, Year } = item;

    if (!isInPeriodList(itemsInPeriod, { Month, Year })) {
      const businessCycleTime = mapCycleTime(
        { Month, Year },
        cycleTimeData,
        isBusinessItem
      );

      const incidentCycleTime = mapCycleTime(
        { Month, Year },
        cycleTimeData,
        isIncidentItem
      );

      itemsInPeriod.push({
        month: Month,
        year: Year,
        period: `${Month + 1}-${Year}`,
        businessCycleTime: businessCycleTime,
        incidentCycleTime: incidentCycleTime
      });
    }
  });

  return itemsInPeriod;
};

module.exports = mapCycleTimeByPeriod;
