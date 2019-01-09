import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import FrontIssueNavigation from './components/FrontIssueNavigation';
import Home from './components/Home';
import Profile from './components/Profile';
import Setting from './components/Setting';
import SafeHistory from './components/SafeHistory';
import GasRateTable from './components/GasRateTable';
import GasRateDetail from './components/GasRateDetail';
import ChargeRateWrapper from './components/charge-rate-search/ChargeRateWrapper';
import NativeTest from './components/NativeTest';
import './App.css';
import Logger from './utils/Logger';

@withRouter
@inject('appStore')
@observer
class App extends Component {
  init() {
    Logger.info('App init call');
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div>
        <FrontIssueNavigation />
        <div style={{ marginTop: 56 }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/setting" component={Setting} />
          <Route
            exact
            path="/safeHistory/:contractNo"
            component={SafeHistory}
          />
          <Route exact path="/tariff" component={GasRateTable} />
          <Route exact path="/tariff/:gasId" component={GasRateDetail} />
          <Route
            exact
            path="/monthInfo/:month/:contractNo"
            component={ChargeRateWrapper}
          />
          <Route exact path="/nativetest" component={NativeTest} />
        </div>
      </div>
    );
  }
}

export default App;
