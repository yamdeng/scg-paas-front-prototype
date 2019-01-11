import AppStore from './AppStore';
import NativeStore from './NativeStore';
import FrontIssueStore from './FrontIssueStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.nativeStore = new NativeStore(this);
    this.frontIssueStore = new FrontIssueStore(this);
  }
}

export default RootStore;
