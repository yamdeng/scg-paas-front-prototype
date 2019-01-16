import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Constant from './config/Constant';
import App from './App';
// import App2 from './App2';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores/stores';
// import querySearch from 'stringquery';
import queryString from 'query-string';

// let urlQuery = querySearch(hashString.substr(hashString.indexOf('/') + 1));
import Logger from './utils/Logger';
// import Helper from './utils/Helper';
// alert(Helper.getQueryStringValue('aa'));

// appType=app2&aa=aa&bb=bb ---> #가 앞이 있어서 않먹힘
// /#/?appType=app2&aa=aa&bb=bb
let hashString = location.hash;
let urlQuery = queryString.parse(
  hashString.substr(hashString.indexOf('/') + 1)
);
Logger.info('index.js queryInfo : ' + JSON.stringify(urlQuery));

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

if (process.env.TOKEN_TYPE === Constant.TOKEN_TYPE_WEB) {
  // #/?token=123789
  if (urlQuery && urlQuery.token) {
    stores.appStore.setLoginInfo({ name: 'test', token: urlQuery.token });
  }
}

ReactDOM.render(
  <Provider {...stores}>
    <Router>{AppComponent}</Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
