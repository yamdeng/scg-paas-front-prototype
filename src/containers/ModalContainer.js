import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Modal from 'react-modal';
import Modal3 from '../components/front-issue/modal/Modal3';
import Modal4 from '../components/front-issue/modal/Modal4';

@withRouter
@inject('modalStore')
@observer
class ModalContainer extends React.Component {
  render() {
    let modalComponent = null;
    switch (this.props.modalStore.modalType) {
      case '3':
        modalComponent = <Modal3 viewData={this.props.modalStore.viewData} />;
        break;
      case '4':
        modalComponent = <Modal4 viewData={this.props.modalStore.viewData} />;
        break;
      default:
        break;
    }

    return (
      <Modal
        isOpen={this.props.modalStore.displayModal}
        style={{}}
        ariaHideApp={false}
      >
        <div>{modalComponent}</div>
      </Modal>
    );
  }
}

export default ModalContainer;
