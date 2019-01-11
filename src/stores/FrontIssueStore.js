import { observable, action, runInAction } from 'mobx';
import Logger from '../utils/Logger';
import Api from '../utils/Api';

class FrontIssueStore {
  @observable accordionData = {};
  @observable tabData1 = [];
  @observable tabData2 = [];
  @observable loadedTabData1 = false;
  @observable loadedTabData2 = false;
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

  @action
  loadTabData(tabIndex) {
    if (!this['loadedTabData' + tabIndex]) {
      Api.get('tableScroll', {
        params: {
          page: 1,
          pageSize: 10
        }
      }).then(result => {
        runInAction(() => {
          this['tabData' + tabIndex] = result.data.data || [];
          this['loadedTabData' + tabIndex] = true;
        });
      });
    }
  }

  @action
  clearTabData() {
    this.tabData1 = [];
    this.tabData2 = [];
    this.loadedTabData1 = false;
    this.loadedTabData2 = false;
  }
}

export default FrontIssueStore;
