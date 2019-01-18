import { observable, action } from 'mobx';

class RestCommonDomain {
  @observable
  apiUri = '';

  @observable
  data = [];

  @observable
  detailData = {};

  constructor(apiUri) {
    this.apiUri = apiUri;
  }

  @action
  clear() {
    this.data = [];
    this.detailData = {};
  }

  @action
  initFormData(initInfo) {
    this.detailData = initInfo;
  }

  @action
  getDetail(detailId) {
    return this.detailData;
  }

  @action
  delete(detailId) {}

  @action
  deleteIds(detailIds) {}

  @action
  create(newInfo) {
    this.detailData = newInfo;
    return this.detailData;
  }

  @action
  update(detailId, updateInfo) {
    this.detailData = updateInfo;
    return this.detailData;
  }

  @action
  search(params) {
    return this.data;
  }
}
export default RestCommonDomain;
