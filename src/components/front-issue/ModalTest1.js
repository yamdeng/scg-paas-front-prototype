import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import NativeInterfaceService from '../../services/NativeInterfaceService';

@withRouter
@inject('appStore', 'modalStore')
@observer
class ModalTest1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openModal = this.openModal.bind(this);
    this.openModalToNative = this.openModalToNative.bind(this);
  }

  openModal(modalType) {
    this.setState({ modalType: modalType });
    this.props.modalStore.showModal(modalType, {});
  }

  openModalToNative() {
    NativeInterfaceService.openModal();
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('모달 테스트1');
  }

  render() {
    return (
      <div>
        <Button
          color="primary"
          size="lg"
          block
          onClick={e => this.openModal('3')}
        >
          modal3 open
        </Button>
        <Button
          color="primary"
          size="lg"
          block
          onClick={e => this.openModal('4')}
        >
          modal4 open
        </Button>
        <Button
          color="primary"
          size="lg"
          block
          onClick={this.openModalToNative}
        >
          nativemodal open
        </Button>
      </div>
    );
  }
}

export default ModalTest1;
