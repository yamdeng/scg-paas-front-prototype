import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

@withRouter
@inject('appStore')
@observer
class ModalRootChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.closeErrorModal = this.closeErrorModal.bind(this);
  }

  closeErrorModal() {
    this.setState({ displayErrorModal: false });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ModalRootChild');
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.closeErrorModal}
          id="modalContainer"
        >
          <ModalHeader toggle={this.closeErrorModal}>
            모달 라우팅 테스트
          </ModalHeader>
          <ModalBody>
            <p>ModalRootChild modal</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.closeErrorModal}>
              닫기
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalRootChild;
