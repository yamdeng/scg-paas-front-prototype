import { observable, action, runInAction } from 'mobx';
import Logger from '../utils/Logger';
import Api from '../utils/Api';
import ListDetail from './domain/ListDetail';

class FrontIssueStore {
  @observable accordionData = {};
  @observable tabData1 = [];
  @observable tabData2 = [];
  @observable talkList = [];
  @observable arrayTest = [];
  @observable arrayTest2 = [];
  @observable objectTest = {};
  @observable objectTest2 = {};
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
  clearData() {
    this.tabData1 = [];
    this.tabData2 = [];
    this.talkList = [];
    this.arrayTest = [];
    this.arrayTest2 = [];
    this.objectTest = {};
    this.objectTest2 = {};
    this.loadedTabData1 = false;
    this.loadedTabData2 = false;
  }

  @action
  clearTabData() {
    this.tabData1 = [];
    this.tabData2 = [];
    this.loadedTabData1 = false;
    this.loadedTabData2 = false;
  }

  @action
  clearTalkList() {
    this.talkList = [];
  }

  @action
  addTalkInfo(talkInfo) {
    this.talkList.push(talkInfo);
  }

  @action
  addArrayTestInfo(info) {
    this.arrayTest.push(info);
  }

  @action
  addArrayTestInfoToDomain(info) {
    this.arrayTest.push(new ListDetail(info));
  }

  @action
  changArrayTestInfo(arrayIndex, name) {
    this.arrayTest[arrayIndex].name = name;
  }
}

export default FrontIssueStore;
