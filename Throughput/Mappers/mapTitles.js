const mapTitles = (data) => {
  const finalData = data.map((item) => {
    return `${item.finalDate.toLocaleDateString()}`;
  });

  return finalData;
};

module.exports = mapTitles;
