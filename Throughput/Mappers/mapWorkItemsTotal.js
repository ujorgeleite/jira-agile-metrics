const sortDates = (rows) => {
  return rows
    .filter((item) => !!item.Resolved && item.Resolved instanceof Date)
    .map((item) => {
      setTimeFixed(item.Resolved);
      return item;
    })
    .sort((a, b) => a.Resolved - b.Resolved);
};

const mapItemsByPeriod = (finalDate, sortedItems, item) => {
  const lista = sortedItems
    .filter((item) => !!item.Resolved && item.Resolved instanceof Date)
    .filter((sortedItem) => {
      setTimeFixed(item.Resolved);
      setTimeFixed(sortedItem.Resolved);
      setTimeFixed(finalDate);

      return (
        sortedItem.Resolved >= item.Resolved && sortedItem.Resolved <= finalDate
      );
    });

  return {
    initialDate: item.Resolved,
    finalDate: finalDate,
    throughput: lista.length,
  };
};

const setTimeFixed = (date) => {
  date.setHours(00);
  date.setMinutes(00);
  date.setSeconds(00);
};

const isInPeriodList = (countedItems, item) => {
  return countedItems.some((counted) => {
    setTimeFixed(item.Resolved);
    setTimeFixed(counted.initialDate);
    setTimeFixed(counted.finalDate);
    return (
      item.Resolved >= counted.initialDate && item.Resolved <= counted.finalDate
    );
  });
};

const getFinalDate = (resolved, daysPeriod) => {
  const date = new Date(resolved.toLocaleDateString());
  date.setDate(date.getDate() + daysPeriod);

  return date;
};

const mapWorkItemsTotal = ({ rows, daysPeriod }) => {
  const sortedDated = sortDates(rows);
  const countedItems = [];

  sortedDated
    .filter((item) => !!item.Resolved && item.Resolved instanceof Date)
    .map((item) => {
      if (!isInPeriodList(countedItems, item)) {
        let finalDate = getFinalDate(item.Resolved, daysPeriod);
        const refinedItem = mapItemsByPeriod(finalDate, sortedDated, item);
        countedItems.push(refinedItem);
      }
    });

  return countedItems;
};

module.exports = {
  mapWorkItemsTotal,
};
