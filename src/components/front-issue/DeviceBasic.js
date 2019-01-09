import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class DeviceBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('다비이스 테스트');
  }

  render() {
    return <div>디바이스 테스트</div>;
  }
}

export default DeviceBasic;
