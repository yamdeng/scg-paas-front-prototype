import axios from 'axios';
import Config from '../config/Config';
import Logger from './Logger';
import stores from '../stores/stores';

// let API_URL = 'http://localhost:3000/api';
let API_URL =
  'http://ec2-54-180-120-228.ap-northeast-2.compute.amazonaws.com:3000/api/gas/';

const Api = axios.create({
  baseURL: API_URL
});

Api.defaults.timeout = Config.apiCallTimeout;
Api.defaults.headers.post['Content-Type'] = 'application/json';

Api.interceptors.request.use(
  function(config) {
    Logger.info('api request : ' + JSON.stringify(config.data));
    return config;
  },
  function(error) {
    Logger.error(JSON.stringify(error));
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  function(response) {
    // Logger.info('api response : ' + JSON.stringify(response.data));
    if (response.data && response.data.code) {
      if (response.data.code === 404) {
        // history.pushState(null, 'error client', '#/error-client');
        setTimeout(() => {
          // history.pushState(null, '코드분류', '#/code-split');
        }, 2000);
        // history.pushState(null, '코드분류', '#/code-split');
        // history.pushState(null, '코드분류', '#/code-split');
        // stores.appStore.pushHistory(null, '코드분류', '#/code-split');
        stores.appStore.pushHistory('code-split');
      } else if (response.data.code === 403) {
        // history.pushState(null, 'error auth', '#/error-auth');
      } else if (response.data.code === 500) {
        // history.pushState(null, 'error server', '#/error-server');
      }
      return null;
    }
    return response;
  },
  function(error) {
    Logger.error('sever error : ' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default Api;
