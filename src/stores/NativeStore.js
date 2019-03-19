import { observable, action } from 'mobx';

class NativeStore {
  @observable deviceInfo = null;
  @observable gps = null;
  @observable image = '';
  @observable signImage = '';
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  setDeviceInfo(deviceInfo) {
    this.deviceInfo = deviceInfo;
  }

  @action
  setGps(gps) {
    this.gps = gps;
  }

  @action
  setSignImage(signImage) {
    this.signImage = signImage;
  }

  @action
  setImage(image) {
    this.image = image;
  }

  @action
  clearStore() {
    this.deviceInfo = null;
    this.gps = null;
    this.image = null;
    this.signImage = null;
  }
}

export default NativeStore;
