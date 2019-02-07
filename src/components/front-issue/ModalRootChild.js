import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AppHistory from '../../utils/AppHistory';
import HOC from '../../utils/HOC';

@HOC.componentWillUnmount
@withRouter
@inject('appStore')
@observer
class ModalRootChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ isOpen: false });
    AppHistory.push('/home');
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ModalRootChild');
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.closeModal}
          id="modalContainer"
        >
          <ModalHeader toggle={this.closeModal}>모달 라우팅 테스트</ModalHeader>
          <ModalBody>
            <p>ModalRootChild modal</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.closeModal}>
              닫기
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalRootChild;
