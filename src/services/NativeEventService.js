// eslint-disable-next-line
import stores from '../stores/stores';

class NativeEventService {
  initEventListener() {
    $(window).on('getDeviceInfo', function(event, data) {
      // eslint-disable-next-line
      console.log('getDeviceInfo');
    });

    $(window).on('sendImage', function(event, data) {
      // eslint-disable-next-line
      console.log('sendImage');
    });

    $(window).on('getGps', function(event, data) {
      // eslint-disable-next-line
      console.log('getGps : ' + data);
    });
  }
}

export default new NativeEventService();
