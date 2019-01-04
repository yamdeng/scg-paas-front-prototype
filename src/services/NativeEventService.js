import DeviceUtil from '../utils/DeviceUtil';
import stores from '../stores/stores';

class NativeEventService {
  initEventListener() {
    $(window).on('getDeviceInfo', function() {
      console.log('test33333 : ' + stores.appStore.headTitle);
    });
  }
}

export default new NativeEventService();
