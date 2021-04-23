const mapFields = (data) => {
  const fields = data
    .map((item) => {
      return item.period.toLocaleString();
    });

  return fields;
};

module.exports = mapFields;
