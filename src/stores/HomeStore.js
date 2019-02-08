import { observable, action, runInAction } from 'mobx';
import Api from '../utils/Api';
import update from 'immutability-helper';

class HomeStore {
  @observable homeInfoList = [];
  @observable homeInfoObject = {};
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  clearHomeData() {
    this.homeInfoList = [];
    this.homeInfoObject = {};
  }

  @action
  loadHomeData() {
    if (!this.homeInfoList.length) {
      Api.get('homeInfos').then(result => {
        runInAction(() => {
          this.homeInfoList = result.data;
          result.data.forEach((info, index) => {
            this.homeInfoObject[index] = info;
          });
        });
      });
    }
  }

  @action
  loadHomeDataByeHomeIndex(homeIndex) {
    if (!this.homeInfoObject[homeIndex]) {
      Api.get('homeInfos/' + homeIndex).then(result => {
        runInAction(() => {
          let updateHomeInfoObject = update(this.homeInfoObject, {
            $merge: { [homeIndex]: result.data }
          });
          this.homeInfoObject = updateHomeInfoObject;
        });
      });
    }
  }
}

export default HomeStore;
