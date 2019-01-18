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
  @observable objectTest = { id: 101, name: 'primative object' };
  @observable objectTest2 = new ListDetail({ id: 102, name: 'domain object' });
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
    this.objectTest = {};
    this.objectTest2 = new ListDetail({});
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

  @action
  changeObject1(info) {
    this.objectTest = info;
  }

  @action
  changeObject1Name(name) {
    this.objectTest.name = name;
  }

  @action
  changeObject2(info) {
    this.objectTest2 = new ListDetail(info);
    // 아래와 같이하면 자식 컴포넌트만 render 됨
    // this.objectTest2.changeInfo(info);
  }

  @action
  changeObject2Name(name) {
    this.objectTest2.changeName(name);
  }
}

export default FrontIssueStore;
