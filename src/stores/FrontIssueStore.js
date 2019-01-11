import { observable, action } from 'mobx';

class FrontIssueStore {
  @observable accordionData = {};
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  clearAccordionData() {
    this.accordionData = {};
  }

  @action
  setAccodionData(accrodionNumber, text) {
    if (!this.accordionData[accrodionNumber]) {
      console.log('setAccodionData call');
      this.accordionData[accrodionNumber] = text;
    }
  }
}

export default FrontIssueStore;
