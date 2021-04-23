const moment = require('moment');

const isTheSameType = (item, issueType) => {
  return item.IssueType.toString() == issueType;
};

const mapByType = (issueTypes, items) => {
  let throughputByType = "";
  
  issueTypes.map((issueType) => {
    const issueTypeList = items.filter((item) =>
      isTheSameType(item, issueType)
    );

    throughputByType += `"${issueType}":${issueTypeList.length},`;
  });

  return throughputByType;
};

const mapThroughputByType = (data, issueTypes) => {
  const { items, finalDate, throughput } = data;
  
  let throughputByType = mapByType(issueTypes, items);
  throughputByType += `"Throughput": ${throughput}`;
  return `"${new moment(finalDate).format('DD/MM/YYYY')}": {${throughputByType}}`;
};

module.exports = mapThroughputByType;
