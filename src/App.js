import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import List from './components/List';
import Chart from './components/Chart';
import './App.css';

@withRouter
@inject('appStore')
@observer
class App extends Component {
  init() {
    console.log('init call');
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div>
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        <Route exact path="/chart" component={Chart} />
      </div>
    );
  }
}

export default App;
