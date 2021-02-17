const isDate = (value) => {
  return value instanceof Date;
};

const mapDate = (date) => {
  return date;
};

const schema = {
  Key: {
    prop: "Key",
    type: String,
    required: false,
  },
  IssueType: {
    prop: "IssueType",
    type: String,
    required: false,
  },
  Status: {
    prop: "Status",
    type: String,
    required: false,
  },
  ProjectKey: {
    prop: "Project",
    type: String,
    required: false,
  },
  Created: {
    prop: "Created",
    type: (created) => {
      if (isDate(created)) {
        return mapDate(created);
      } else {
        return "empty";
      }
    },
    required: false,
  },
  Updated: {
    prop: "Updated",
    type: (updated) => {
      if (isDate(updated)) {
        return mapDate(updated);
      } else {
        return "empty";
      }
    },
    required: false,
  },
  Resolved: {
    prop: "Resolved",
    type: (resolved) => {
      if (isDate(resolved)) {
        return mapDate(resolved);
      } else {
        return "empty";
      }
    },
    required: false,
  },
  Startdate: {
    prop: "Start",
    type: (startDate) => {
      if (isDate(startDate)) {
        return mapDate(startDate);
      } else {
        return "empty";
      }
    },
    required: false,
  },
};

module.exports = schema;
