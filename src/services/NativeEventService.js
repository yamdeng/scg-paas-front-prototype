// eslint-disable-next-line
import stores from '../stores/stores';
import LoadingBar from '../utils/LoadingBar';
import AppHistory from '../utils/AppHistory';

class NativeEventService {
  initEventListener() {
    $(window).on('setDeviceInfo', function(event, data) {
      // eslint-disable-next-line
      console.log('setDeviceInfo');
      stores.nativeStore.setDeviceInfo(data);
    });

    $(window).on('setImage', function(event, data) {
      // eslint-disable-next-line
      console.log('setImage');
      stores.nativeStore.setImage(data);
    });

    $(window).on('setGps', function(event, data) {
      // eslint-disable-next-line
      console.log('setGps : ' + data);
      stores.nativeStore.setGps(JSON.parse(data));
    });

    $(window).on('setLoginInfo', function(event, data) {
      // eslint-disable-next-line
      console.log('setLoginInfo : ' + data);
      alert('setLoginInfo : ' + data);
      stores.appStore.setLoginInfo(JSON.parse(data));
      LoadingBar.hide();
    });

    $(window).on('moveUrl', function(event, data) {
      // eslint-disable-next-line
      console.log('moveUrl : ' + data);
      AppHistory.push(data);
      LoadingBar.hide();
    });

    $(window).on('refreshApp', function(event, data) {
      // eslint-disable-next-line
      console.log('refreshApp : ' + data);
      LoadingBar.hide();
      window.location.href = '/';
      window.location.reload();
    });

    $(window).on('refreshAppByUrl', function(event, data) {
      // eslint-disable-next-line
      console.log('refreshAppByUrl : ' + data);
      LoadingBar.hide();
      window.location.href = data || '/#/';
      window.location.reload();
    });

    $(window).on('reloadPageByCompanyCode', function(event, data) {
      // eslint-disable-next-line
      console.log('reloadPageByCompanyCode : ' + data);
      stores.companyStore.reloadPageByCompanyCode(data);
    });

    $(window).on('openModal', function(event, data) {
      // eslint-disable-next-line
      console.log('openModal : ' + modalType);
      let modalData = JSON.parse(data);
      let modalType = modalData.modalType;
      delete modalData.modalType;
      stores.modalStore.showModal(modalType, modalData);
    });
  }
}

export default new NativeEventService();
