import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class Setting extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('설정');
  }
  render() {
    return <div>설정</div>;
  }
}

export default Setting;
