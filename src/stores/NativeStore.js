import { observable, action } from 'mobx';

class NativeStore {
  @observable deviceInfo = null;
  @observable gps = null;
  @observable image = '';
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
  setImage(image) {
    this.image = image;
  }
}

export default NativeStore;
