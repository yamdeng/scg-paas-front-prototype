import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import logo from '../logo.jpg';

@withRouter
@inject('appStore')
@observer
class Home extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('인천도시가스 프로토타입');
  }
  render() {
    return (
      <div>
        <img src={logo} style={{ width: '100%', height: 250 }} alt="logo" />
        <h1> 도시가스 프로토타입 홈</h1>
      </div>
    );
  }
}

export default Home;
