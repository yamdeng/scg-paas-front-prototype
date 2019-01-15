import AppStore from './AppStore';
import NativeStore from './NativeStore';
import FrontIssueStore from './FrontIssueStore';
import UiStore from './UiStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.nativeStore = new NativeStore(this);
    this.frontIssueStore = new FrontIssueStore(this);
    this.uiStore = new UiStore(this);
  }
}

export default RootStore;
