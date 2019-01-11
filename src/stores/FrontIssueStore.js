import { observable, action } from 'mobx';
import Logger from '../utils/Logger';

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
      Logger.info('setAccodionData call');
      this.accordionData[accrodionNumber] = text;
    }
  }
}

export default FrontIssueStore;
