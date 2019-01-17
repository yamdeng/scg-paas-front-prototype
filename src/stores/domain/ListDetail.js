import { observable, action } from 'mobx';

class ListDetail {
  @observable id = null;
  @observable name = '';

  constructor(info) {
    this.id = info.id;
    this.name = info.name;
  }

  @action
  changeName(name) {
    this.name = name;
  }
}

export default ListDetail;
