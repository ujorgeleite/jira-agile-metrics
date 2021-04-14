const mapDataFields = (data) => {
  const dataString = data.reduce(function(acc, cur, i) {
    acc[i] = cur;
    return acc;
  }, {});

  return dataString;
};

module.exports = mapDataFields;
