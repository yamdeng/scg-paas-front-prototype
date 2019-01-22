import { observable, action } from 'mobx';
import Config from '../config/Config';
import CompanyInfo from './company/company';
import MenuInfo from './company/menu';
import _ from 'lodash';

class CompanyStore {
  @observable companyCode = Config.defaultCompanyCode;
  @observable companyInfo = {};
  @observable menuInfo = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.companyInfo = CompanyInfo[this.companyCode];
    this.menuInfo = MenuInfo[this.companyCode];
  }

  @action
  setCompanyCode(companyCode) {
    this.companyCode = companyCode;
    this.companyInfo = CompanyInfo[companyCode];
    this.menuInfo = MenuInfo[companyCode];
  }

  @action
  getCompanyInfoByKey(key) {
    return _.get(this.companyInfo, key);
  }

  @action
  reloadPageByCompanyCode(companyCode) {
    window.location.href = '/#/?companyCode=' + companyCode;
    window.location.reload();
  }
}

export default CompanyStore;
