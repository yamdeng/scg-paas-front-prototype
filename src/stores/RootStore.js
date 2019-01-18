import AppStore from './AppStore';
import NativeStore from './NativeStore';
import FrontIssueStore from './FrontIssueStore';
import UiStore from './UiStore';
import TestStore from './TestStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.nativeStore = new NativeStore(this);
    this.frontIssueStore = new FrontIssueStore(this);
    this.uiStore = new UiStore(this);
    this.testStore = new TestStore(this, 'tableScroll');
  }
}

export default RootStore;
