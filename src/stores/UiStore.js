import { observable, action } from 'mobx';

class UiStore {
  @observable displayLoadingBar = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  showLoadingBar() {
    this.displayLoadingBar = true;
  }

  @action
  hideLoadingBar() {
    this.displayLoadingBar = false;
  }
}

export default UiStore;
