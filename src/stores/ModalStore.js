import { observable, action } from 'mobx';

class ModalStore {
  @observable modalType = '';

  @observable modalData = {};

  @observable displayModal = false;

  @observable historyModalData = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  showModal(modalType, modalData, disableHistoryModalData = false) {
    this.modalType = modalType;
    this.modalData = modalData || {};
    this.displayModal = true;
    if (disableHistoryModalData) {
      this.historyModalData = [modalData];
    } else {
      this.historyModalData.push(modalData);
    }
  }

  @action
  hideModal() {
    if (this.historyModalData.length > 1) {
      this.modalData = this.historyModalData[this.historyModalData.length - 2];
      this.historyModalData.splice(-1, 1);
    } else {
      this.displayModal = false;
      this.historyModalData = [];
    }
  }

  @action
  hideAllModal() {
    this.displayModal = false;
    this.historyModalData = [];
  }
}

export default ModalStore;
