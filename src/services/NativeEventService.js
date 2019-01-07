// eslint-disable-next-line
import stores from '../stores/stores';

class NativeEventService {
  initEventListener() {
    $(window).on('setDeviceInfo', function(event, data) {
      // eslint-disable-next-line
      console.log('setDeviceInfo');
      stores.nativeStore.setDeviceInfo(data);
    });

    $(window).on('setImage', function(event, data) {
      // eslint-disable-next-line
      console.log('setImage');
      stores.nativeStore.setImage(data);
    });

    $(window).on('setGps', function(event, data) {
      // eslint-disable-next-line
      console.log('setGps : ' + data);
      stores.nativeStore.setGps(JSON.parse(data));
    });
  }
}

export default new NativeEventService();
