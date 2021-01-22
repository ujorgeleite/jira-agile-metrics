const mapTitles = (data) => {
  const finalData = data.map((item) => {
    return `${item.finalDate.toLocaleString()}`;
  });

  return finalData;
};

module.exports = {
  mapTitles,
};
