import { observable, action, runInAction } from 'mobx';
import Api from '../utils/Api';

class CommonStore {
  @observable
  apiUri = '';

  @observable
  data = [];

  constructor(apiUri) {
    this.apiUri = apiUri;
  }

  @action
  clear() {
    this.data = [];
  }

  @action
  search(params) {
    Api.get(this.apiUri, {
      params: params
    }).then(result => {
      runInAction('CommonStore search', () => {
        this.data = result.data.data;
      });
    });
  }
}

export default CommonStore;
