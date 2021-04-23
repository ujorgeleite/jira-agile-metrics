const moment = require("moment");

const isResolved = (item) => !!item.Resolved && item.Resolved != "empty";

const mapCycleTimeData = (rows) => {
  const cycleTimeData = rows
    .filter((item) => isResolved(item))
    .map((item) => {
      const { Start, Resolved, Key, IssueType } = item;
      const started = new moment(new Date(Start));
      const resolved = new moment(new Date(Resolved));

      const cycleTime = resolved.diff(started, "days");

      return {
        Key: Key,
        CycleTime: cycleTime,
        Resolved: Resolved,
        IssueType: IssueType,
        Month: resolved.month(),
        Year: resolved.year(),
      };
    });

  return cycleTimeData;
};

module.exports = mapCycleTimeData;
