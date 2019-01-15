import axios from 'axios';
import Config from '../config/Config';
import Logger from './Logger';
import AppHistory from '../utils/AppHistory';
// import stores from '../stores/stores';

let API_URL = '/api/gas/';

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
        AppHistory.push('/error-client');
      } else if (response.data.code === 403) {
        AppHistory.push('/error-auth');
      } else if (response.data.code === 500) {
        AppHistory.push('/error-server');
      }
    }
    return response;
  },
  function(error) {
    Logger.error('sever error : ' + JSON.stringify(error));
    if (error.response.status === 404) {
      AppHistory.push('/error-client');
    } else if (error.response.status === 403) {
      AppHistory.push('/error-auth');
    } else if (error.response.status === 500) {
      AppHistory.push('/error-server');
    }
    return Promise.reject(error);
  }
);

export default Api;
