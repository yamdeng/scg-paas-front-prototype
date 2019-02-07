import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import HOC from '../../../utils/HOC';

@HOC.componentWillUnmount
@withRouter
@inject('modalStore')
@observer
class Modal4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Modal4 : {JSON.stringify(this.props.modalData)}</p>
        <Button
          color="primary"
          onClick={e => this.props.modalStore.hideModal()}
        >
          닫기
        </Button>
      </div>
    );
  }
}

export default Modal4;
