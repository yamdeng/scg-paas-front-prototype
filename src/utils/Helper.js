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

function copyToClipboard(id) {
  let textArea = document.getElementById(id);
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    var range, selection;
    range = document.createRange();
    range.selectNodeContents(textArea);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }
  document.execCommand('copy');
  alert('복사되었습니다');
}

const Helper = {
  convertEmptyValue: convertEmptyValue,
  checkAuthByUrl: checkAuthByUrl,
  getQueryStringValue: getQueryStringValue,
  copyToClipboard: copyToClipboard
};

export default Helper;
