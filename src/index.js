import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './stores/stores';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
stores.appStore.setHistory(history);

// state의 상태는 action을 통해서만 가능하게끔 셋팅
configure({
  enforceActions: true
});

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>{<App />}</Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
