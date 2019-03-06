// eslint-disable-next-line
function dispatchEventToApp(eventName, eventData) {
  // eslint-disable-next-line
  $(window).trigger(eventName, [eventData]);
}
