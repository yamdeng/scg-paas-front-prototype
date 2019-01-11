import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import App2 from './App2';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores/stores';
import Helper from './utils/Helper';
// import AppHistory from './utils/AppHistory';
// AppHistory.block((location, action) => {
//   console.log('on route block');
//   return true;
// });

// state의 상태는 action을 통해서만 가능하게끔 셋팅
configure({
  enforceActions: true
});

let AppComponent = <App />;

// let appType = Helper.getQueryStringValue('appType');
// if (appType && appType === 'app2') {
//   AppComponent = <App2 />;
// }

ReactDOM.render(
  <Provider {...stores}>
    <Router>{AppComponent}</Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
