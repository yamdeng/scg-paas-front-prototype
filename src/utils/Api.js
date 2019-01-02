import axios from 'axios';
import Config from '../config/Config';
import Logger from './Logger';

// let API_URL = 'http://localhost:3000/api';
let API_URL =
  'http://ec2-54-180-120-228.ap-northeast-2.compute.amazonaws.com/api/gas';

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
    Logger.info('api response : ' + JSON.stringify(response.data));
    return response;
  },
  function(error) {
    Logger.error('sever error : ' + JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default Api;
