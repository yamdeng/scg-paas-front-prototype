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

  moveUrl() {
    if (DeviceUtil.isAndroid) {
      window.android.moveUrl();
    }
  }

  refreshApp() {
    if (DeviceUtil.isAndroid) {
      window.android.refreshApp();
    }
  }

  reloadPageByCompanyCode() {
    if (DeviceUtil.isAndroid) {
      window.android.reloadPageByCompanyCode();
    }
  }

  setLoginInfo() {
    if (DeviceUtil.isAndroid) {
      window.android.setLoginInfo(JSON.stringify(stores.appStore.loginInfo));
    }
  }

  refreshAppByUrl() {
    if (DeviceUtil.isAndroid) {
      window.android.refreshAppByUrl();
    }
  }
}

export default new NativeInterfaceService();
