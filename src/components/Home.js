import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import logo from '../logo.svg';
import { Helmet } from 'react-helmet';

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
        <Helmet>
          <title>Home</title>
        </Helmet>
        <img src={logo} className="App-logo" alt="logo" />
        <h1> Home 페이지입니다</h1>
      </div>
    );
  }
}

export default Home;
