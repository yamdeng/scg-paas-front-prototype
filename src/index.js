import './css/common.scss';
import './index.css';
import moment from 'moment';
import 'moment/locale/ko';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Constant from './config/Constant';
import App from './App';
import App2 from './App2';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores/stores';
import queryString from 'query-string';

import Logger from './utils/Logger';
import AppHistory from './utils/AppHistory';
import Config from './config/Config';

moment.locale('ko');

// let hashString = location.hash;
// let urlQuery = queryString.parse(
//   hashString.substr(hashString.indexOf('/') + 1)
// );

let urlQuery = queryString.parse(AppHistory.location.search);
let entryHashString = location.hash;
let entryFullUri = entryHashString.substr(2);
let entryUri = entryFullUri;
if (entryFullUri.indexOf('?') !== -1) {
  entryUri = entryUri.substr(0, entryUri.indexOf('?'));
}

Logger.info('entryUri : ' + (entryUri || Config.defaultUri));

// alert(JSON.stringify(queryString.parse(location.search)));
// alert(JSON.stringify(queryString.parse(AppHistory.location.search)));
Logger.info('index.js queryInfo : ' + JSON.stringify(urlQuery));

Logger.info('location.search : ' + location.search);
Logger.info('location.hash : ' + location.hash);
Logger.info('AppHistory.search : ' + AppHistory.location.search);
Logger.info('AppHistory.hash : ' + AppHistory.location.hash);

// block은 않먹힘! App.js에서 핸들러를 등록시켜야 함!
// AppHistory.block((location, action) => {
//   Logger.info('on route block');
//   return true;
// });

AppHistory.listen((location, action) => {
  // location.pathname ---> route시에 공통으로 구글 서비스 전달
  Logger.info('AppHistory listen : ' + location.pathname);
});

// state의 상태는 action을 통해서만 가능하게끔 셋팅
configure({
  enforceActions: true
});

let AppComponent = <App />;

let appType = urlQuery.appType;
if (appType && appType === 'app2') {
  AppComponent = <App2 />;
}

let companyCode = urlQuery.companyCode;
if (companyCode) {
  stores.companyStore.setCompanyCode(companyCode);
}

if (process.env.TOKEN_TYPE === Constant.TOKEN_TYPE_WEB) {
  if (urlQuery && urlQuery.token) {
    stores.appStore.setLoginInfo({
      loginId: 'test7',
      name: 'test',
      token: urlQuery.token,
      contractNumber: '123'
    });
    stores.appStore.changeNativeInited(false);
    setTimeout(() => {
      stores.appStore.changeNativeInited(true);
    }, 3000);
  }
}

ReactDOM.render(
  <Provider {...stores}>
    <Router>{AppComponent}</Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
