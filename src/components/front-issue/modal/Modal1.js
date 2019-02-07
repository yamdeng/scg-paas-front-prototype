import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import HOC from '../../../utils/HOC';

@HOC.componentWillUnmount
@withRouter
@inject('appStore')
@observer
class Modal1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Modal1</p>
        <Button color="primary" onClick={this.props.closeModal}>
          닫기
        </Button>
      </div>
    );
  }
}

export default Modal1;
