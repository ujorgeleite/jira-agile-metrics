const isInPeriodList = (filteredItems, item) => {
  return filteredItems.some((filtered) => {
    return (
      item.Resolved >= filtered.initialDate &&
      item.Resolved <= filtered.finalDate
    );
  });
};

const isResolved = (item) => {
  return !!item.Resolved && item.Resolved instanceof Date;
};

const sortDates = (rows) => {
  return rows
    .filter(isResolved)
    .map((item) => {
      setTimeFixed(item.Resolved);
      return item;
    })
    .sort((a, b) => a.Resolved - b.Resolved);
};

const mapItemsByPeriod = (finalDate, sortedItems, item) => {
  const itemsInPeriod = sortedItems.filter(isResolved).filter((sortedItem) => {
    return (
      sortedItem.Resolved >= item.Resolved && sortedItem.Resolved <= finalDate
    );
  });

  return {
    initialDate: item.Resolved,
    finalDate: finalDate,
    items: itemsInPeriod,
    throughput: itemsInPeriod.length,
  };
};

const setTimeFixed = (date) => {
  date.setHours(00);
  date.setMinutes(00);
  date.setSeconds(00);
};

const getFinalDate = (resolved, daysPeriod) => {
  const date = new Date(resolved.toLocaleDateString());
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
