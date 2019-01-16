import DeviceUtil from '../utils/DeviceUtil';
import stores from '../stores/stores';

class NativeInterfaceService {
  enableBackButton() {
    if (DeviceUtil.isAndroid) {
      window.android.enableBackButton();
    }
  }
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

  showToast(message) {
    if (DeviceUtil.isAndroid) {
      window.android.showToast(message);
    }
  }

  getLoginInfo() {
    if (DeviceUtil.isAndroid) {
      window.android.getLoginInfo();
    }
  }
}

export default new NativeInterfaceService();
