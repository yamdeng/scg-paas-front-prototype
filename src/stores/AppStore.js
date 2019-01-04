import { observable, action } from 'mobx';

class AppStore {
  @observable headTitle = '인천 도시가스 프로토타입';
  @observable deviceInfo = {};
  @observable appVersion = '';
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  changeHeadTitle(title) {
    this.headTitle = title;
  }

  @action
  changeDeviceInfo(deviceInfo) {
    this.deviceInfo = deviceInfo;
  }

  @action
  changeAppVersion(appVersion) {
    this.appVersion = appVersion;
  }
}

export default AppStore;
