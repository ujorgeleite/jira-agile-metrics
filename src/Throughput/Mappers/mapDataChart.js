const mapDataChart = (data) => {
  const dataString = `{${data.toLocaleString()}}`;
  return JSON.parse(dataString);
};

module.exports = mapDataChart;
