import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import queryString from 'query-string';
import AppHistory from '../../utils/AppHistory';
import HOC from '../../utils/HOC';
import Modal1 from './modal/Modal1';
import Modal2 from './modal/Modal2';
import Logger from '../../utils/Logger';

@HOC.componentWillUnmount
@withRouter
@inject('appStore')
@observer
class ModalRootDynamicChild extends React.Component {
  urlParamObject = {};
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.closeModal = this.closeModal.bind(this);
    this.urlParamObject = queryString.parse(this.props.location.search);
  }

  closeModal() {
    this.setState({ isOpen: false });
    AppHistory.push('/home');
  }

  componentDidMount() {
    // this.props.appStore.changeHeadTitle('ModalRootDynamicChild');
    // paas : disableBackButton
  }

  render() {
    let modalId = this.props.match.params.id;
    let modalComponent = null;
    Logger.info('this.urlParamObject : ' + JSON.stringify(this.urlParamObject));
    switch (modalId) {
      case '1':
        modalComponent = (
          <Modal1
            closeModal={this.closeModal}
            urlParamObject={this.urlParamObject}
          />
        );
        break;
      case '2':
        modalComponent = (
          <Modal2
            closeModal={this.closeModal}
            urlParamObject={this.urlParamObject}
          />
        );
        break;
      default:
        break;
    }
    return (
      <div>
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.closeModal}
          id="modalContainer"
        >
          <ModalBody>{modalComponent}</ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalRootDynamicChild;
