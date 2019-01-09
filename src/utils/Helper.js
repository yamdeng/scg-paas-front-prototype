import Config from '../config/Config';

function convertEmptyValue(value) {
  if (value === undefined || value === null || value === '') {
    return Config.defaultEmptyValue;
  } else {
    return value;
  }
}

const Helper = {
  convertEmptyValue: convertEmptyValue
};

export default Helper;
