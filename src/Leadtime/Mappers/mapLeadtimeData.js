const moment = require("moment");

const isResolved = (item) => !!item.Resolved && item.Resolved != "empty";

const mapLeadTimeData = ({ rows }) => {
  const leadTimeData = rows
    .filter((item) => isResolved(item))
    .map((item) => {
      const { Start, Created, Resolved, Key, IssueType } = item;
      const created = new moment(new Date(Created));
      const resolved = new moment(new Date(Resolved));

      const leadTime = resolved.diff(created, "days");

      return {
        Start: Start || Created,
        Created: Created,
        Key: Key,
        LeadTime: leadTime,
        Resolved: Resolved,
        IssueType: IssueType,
        Month: resolved.month(),
        Year: resolved.year(),
      };
    });

  return leadTimeData;
};

module.exports = mapLeadTimeData;
