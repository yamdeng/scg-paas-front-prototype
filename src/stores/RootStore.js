import AppStore from './AppStore';
import NativeStore from './NativeStore';
import FrontIssueStore from './FrontIssueStore';
import UiStore from './UiStore';
import TestStore from './TestStore';
import CompanyStore from './CompanyStore';
import ModalStore from './ModalStore';
import HomeStore from './HomeStore';

class RootStore {
  constructor() {
    this.appStore = new AppStore(this);
    this.nativeStore = new NativeStore(this);
    this.frontIssueStore = new FrontIssueStore(this);
    this.uiStore = new UiStore(this);
    this.testStore = new TestStore(this, 'tableScroll');
    this.companyStore = new CompanyStore(this);
    this.modalStore = new ModalStore(this);
    this.homeStore = new HomeStore(this);
  }
}

export default RootStore;
