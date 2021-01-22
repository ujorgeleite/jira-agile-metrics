const mapDataChart = (data) => {
  const finalData = data.map((item, index) => {
    return `"${item.finalDate.toLocaleString()}": {"Throughput": ${item.throughput}}`;
  });

  const dataString = `{${finalData.toLocaleString()}}`;
  return JSON.parse(dataString);
};

module.exports = {
  mapDataChart,
};
