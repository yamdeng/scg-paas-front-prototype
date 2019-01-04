import DeviceUtil from '../utils/DeviceUtil';
import stores from '../stores/stores';

class NativeInterfaceService {
  disableBackButton() {
    if (DeviceUtil.isAndroid) {
      window.android.disableBackButton();
    }
  }
  getDeviceInfo() {
    if (DeviceUtil.isAndroid) {
      window.android.getDeviceInfo();
    }
  }
  setAppVersion() {
    if (DeviceUtil.isAndroid) {
      window.android.setAppVersion(stores.appStore.appVersion);
    }
  }
  openCamera() {
    if (DeviceUtil.isAndroid) {
      window.android.openCamera();
    }
  }
  getGps() {
    if (DeviceUtil.isAndroid) {
      window.android.getGps();
    }
  }
}

export default new NativeInterfaceService();
