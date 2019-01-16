import { observable, action } from 'mobx';

class AppStore {
  @observable headTitle = '프론트 개발 이슈 테스트';
  @observable deviceInfo = {};
  @observable appVersion = '';
  @observable history = null;
  @observable loginInfo = null;
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

  @action
  setLoginInfo(loginInfo) {
    this.loginInfo = loginInfo;
  }
}

export default AppStore;
