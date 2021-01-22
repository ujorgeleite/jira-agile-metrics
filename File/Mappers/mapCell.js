const isSimpleValue = (value) => {
  return !value.hyperlink && value.toString().length > 0;
};

const mapCell = ({ value }) => {
  if (isSimpleValue(value)) {
    return value;
  } else {
    return !!value.text ? value.text : "";
  }
};

module.exports = mapCell;
