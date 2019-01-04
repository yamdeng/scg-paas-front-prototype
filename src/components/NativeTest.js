import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import NativeInterfaceService from '../services/NativeInterfaceService';

@withRouter
@inject('appStore')
@observer
class NativeTest extends Component {
  constructor(props) {
    super(props);
    this.getDeviceInfo = this.getDeviceInfo.bind(this);
    this.setAppVersion = this.setAppVersion.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.getGps = this.getGps.bind(this);
  }

  getDeviceInfo() {
    NativeInterfaceService.getDeviceInfo();
  }

  setAppVersion() {
    NativeInterfaceService.setAppVersion();
  }

  openCamera() {
    NativeInterfaceService.openCamera();
  }

  getGps() {
    NativeInterfaceService.getGps();
  }

  render() {
    return (
      <div style={{ marginTop: 70, padding: 10 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.getDeviceInfo}
        >
          디바이스 정보
        </Button>{' '}
        <Button
          variant="contained"
          color="primary"
          onClick={this.setAppVersion}
        >
          버전 전송
        </Button>{' '}
        <Button variant="contained" color="primary" onClick={this.openCamera}>
          카메라
        </Button>{' '}
        <Button variant="contained" color="primary" onClick={this.getGps}>
          GPS 정보
        </Button>
      </div>
    );
  }
}

export default NativeTest;
