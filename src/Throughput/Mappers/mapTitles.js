const mapTitles = (data) => {
  const finalData = data.map((item) => {
    return `${item.finalDate.toLocaleDateString('en-GB')}`;
  });

  return finalData;
};

module.exports = mapTitles;
