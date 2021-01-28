const isSimpleValue = (value) => {
  return !value.hyperlink && value.toString().length > 0;
};

const isDate = (value) => {
  return value instanceof Date;
};

const mapCell = ({ value }) => {
  if (isSimpleValue(value)) {
    if (isDate(value)) {
      return value;
    } else {
      return value.toString().replace(" ", "");
    }
  } else {
    return !!value.text ? value.text : "";
  }
};

module.exports = mapCell;
