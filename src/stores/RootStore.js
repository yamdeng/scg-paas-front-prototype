import AppStore from './AppStore';
import NativeStore from './NativeStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.nativeStore = new NativeStore(this);
  }
}

export default RootStore;
