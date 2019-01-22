import { observable, action } from 'mobx';
import Config from '../config/Config';
import CompanyInfo from './company/company';
import _ from 'lodash';

class CompanyStore {
  @observable companyCode = Config.defaultCompanyCode;
  @observable companyInfo = {};
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  setCompanyCode(companyCode) {
    this.companyCode = companyCode;
    this.companyInfo = CompanyInfo[companyCode];
  }

  @action
  getCompanyInfoByKey(key) {
    return _.get(this.companyInfo, key);
  }
}

export default CompanyStore;
