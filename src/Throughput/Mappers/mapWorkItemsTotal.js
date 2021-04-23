const moment = require("moment");

const isInPeriodList = (filteredItems, item) => {
  return filteredItems.some(({ initialDate, finalDate }) =>
  moment(item.Resolved).isBetween(initialDate, finalDate)
  );
};

const isResolved = (item) => {
  return !!item.Resolved && item.Resolved instanceof Date;
};

const sortDates = (rows) => {
  return rows.filter(isResolved).sort((a, b) => a.Resolved - b.Resolved);
};

const mapItemsByPeriod = (finalDate, sortedItems, item) => {
  const itemsInPeriod = sortedItems.filter(isResolved)
  .filter((sortedItem) => {
    return moment(sortedItem.Resolved).isBetween(item.Resolved, finalDate);
  });
  
  return {
    initialDate: item.Resolved,
    finalDate: finalDate,
    items: itemsInPeriod,
    throughput: itemsInPeriod.length,
  };
};

const getFinalDate = (resolved, daysPeriod) => {
  const date = new Date(resolved.toDateString());
  date.setDate(date.getDate() + daysPeriod);
  
  return date;
};

const mapWorkItemsTotal = ({ rows, daysPeriod }) => {
  const itemsInOrderByDate = sortDates(rows);
  const itemsInPeriod = [];
  
  
  
  itemsInOrderByDate.filter(isResolved).map((item) => {
    if (!isInPeriodList(itemsInPeriod, item)) {
      let finalDate = getFinalDate(item.Resolved, daysPeriod);
      const mappedPeriodItem = mapItemsByPeriod(
        finalDate,
        itemsInOrderByDate,
        item
        );
        itemsInPeriod.push(mappedPeriodItem);
      }
    });
    
    return itemsInPeriod;
  };
  
  module.exports = mapWorkItemsTotal;
  