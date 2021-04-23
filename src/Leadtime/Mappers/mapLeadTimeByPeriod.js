const mapMonth = require("./mapMonths");

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

const mapBusinessLeadTime = ({ Month, Year }, leaditens) => {
  const month = mapMonth(Month).toString().padStart(2,'0')
  const businessItems = leaditens
    .filter((leadItem) => isBusinessItem(leadItem))
    .filter((leadItemFiltered) => {
      const dateString = new Date(leadItemFiltered.Resolved)
        .toISOString()
        .slice(0, 10);
      const compareDate = `${Year}-${month}-01`;

      return new moment(dateString).isSame(compareDate, "month");
    });

  const qtdItens = businessItems.length;

  const businessLeadTime = Math.round(
    businessItems.reduce((acc, curr) => {
      return acc + curr.LeadTime;
    }, 0) / qtdItens
  );


  const value = businessLeadTime > 0 ? businessLeadTime : 0;

  return { qtdItens, value };
};

const mapLeadTimeByPeriod = (leadTimeData) => {
  const itemsInOrderByDate = sortDates(leadTimeData);
  const itemsInPeriod = [];


  

  itemsInOrderByDate.filter(isResolved).map((item) => {
    const { Month, Year } = item;

    if (!isInPeriodList(itemsInPeriod, { Month, Year })) {
      const businessLeadTime = mapBusinessLeadTime(
        { Month, Year },
        leadTimeData
      );

      itemsInPeriod.push({
        month: Month,
        year: Year,
        period: `${mapMonth(Month)}-${Year}`,
        quantidadeItens: businessLeadTime.qtdItens,
        businessLeadTime: businessLeadTime.value,
      });
    }
  });

  return itemsInPeriod;
};

module.exports = mapLeadTimeByPeriod;
