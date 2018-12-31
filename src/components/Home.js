import React from 'react';

import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import logo from '../logo.svg';
import { Helmet } from 'react-helmet';

@withRouter
@observer
class Home extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <img src={logo} className="App-logo" alt="logo" />
        <h1> Home 페이지입니다 3</h1>
      </div>
    );
  }
}

export default Home;
