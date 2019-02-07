import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class ModalRootDynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ModalRootDynamic');
  }
  render() {
    return (
      <div>
        <h1>ModalRootDynamic</h1>
      </div>
    );
  }
}

export default ModalRootDynamic;
