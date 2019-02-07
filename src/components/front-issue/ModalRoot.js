import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class ModalRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ModalRoot');
  }
  render() {
    return (
      <div>
        <h1>ModalRoot</h1>
      </div>
    );
  }
}

export default ModalRoot;
