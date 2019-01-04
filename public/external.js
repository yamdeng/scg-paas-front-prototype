// eslint-disable-next-line
function nativeInterface(eventName, eventData) {
  $(window).trigger(eventName, [eventData]);
}
