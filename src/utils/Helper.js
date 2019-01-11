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

function getQueryStringValue(key) {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
}

const Helper = {
  convertEmptyValue: convertEmptyValue,
  checkAuthByUrl: checkAuthByUrl,
  getQueryStringValue: getQueryStringValue
};

export default Helper;
