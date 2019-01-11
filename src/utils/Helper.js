import Config from '../config/Config';

function convertEmptyValue(value) {
  if (value === undefined || value === null || value === '') {
    return Config.defaultEmptyValue;
  } else {
    return value;
  }
}

function checkAuthByUrl(url) {
  if (url && url.indexOf('accordion-b') !== -1) {
    history.pushState(null, '권한 에러', '#/error-auth');
  }
}

const Helper = {
  convertEmptyValue: convertEmptyValue,
  checkAuthByUrl: checkAuthByUrl
};

export default Helper;
