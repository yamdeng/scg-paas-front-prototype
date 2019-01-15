import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { ListGroup, ListGroupItem } from 'reactstrap';
import classes from 'classnames';
import stores from '../../stores/stores';
import NativeInterfaceService from '../../services/NativeInterfaceService';

@withRouter
@inject('appStore', 'nativeStore')
@observer
class NativeInterface extends React.Component {
  watcherId = null;
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.getDeviceInfo = this.getDeviceInfo.bind(this);
    this.setAppVersion = this.setAppVersion.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.getGps = this.getGps.bind(this);
    this.getGpsByBrowser = this.getGpsByBrowser.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.enableBackButton = this.enableBackButton.bind(this);
    this.disableBackButton = this.disableBackButton.bind(this);
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

  getGpsByBrowser() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        alert(
          'getCurrentPosition position.coords.latitude : ' +
            position.coords.latitude
        );
      });

      this.watcherId = navigator.geolocation.watchPosition(function(position) {
        alert(
          'watchPosition position.coords.latitude2 : ' +
            position.coords.latitude
        );
      });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  enableBackButton() {
    NativeInterfaceService.enableBackButton();
  }

  disableBackButton() {
    NativeInterfaceService.disableBackButton();
  }

  addEventListener() {
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
  }

  removeEventListener() {
    $(window).off('setDeviceInfo');
    $(window).off('setImage');
    $(window).off('setGps');
  }

  componentDidMount() {
    this.addEventListener();
    this.props.appStore.changeHeadTitle('네이티브 인터페이스');
    this.props.nativeStore.clearStore();
  }

  componentWillUnmount() {
    this.removeEventListener();
    if (this.watcherId) {
      this.watcherId = navigator.geolocation.clearWatch(this.watcherId);
    }
  }

  render() {
    let image = this.props.nativeStore.image
      ? this.props.nativeStore.image
      : 'https://material-ui.com/static/images/avatar/1.jpg';
    return (
      <div style={{ marginTop: 70, padding: 10 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.getDeviceInfo}
        >
          디바이스 정보
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.setAppVersion}
        >
          버전 전송
        </Button>
        <Button variant="contained" color="primary" onClick={this.openCamera}>
          카메라
        </Button>
        <Button variant="contained" color="primary" onClick={this.getGps}>
          GPS 정보
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.getGpsByBrowser}
        >
          GPS 정보(브라우저)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.disableBackButton}
        >
          백버튼 비활성화
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.enableBackButton}
        >
          백버튼 활성화
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'디바이스 정보는?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.nativeStore.deviceInfo}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <ListGroup>
            <ListGroupItem>
              디바이스 플랫폼 버전 : {this.props.nativeStore.deviceInfo}
            </ListGroupItem>
            <ListGroupItem>
              GPS 정보 : {JSON.stringify(this.props.nativeStore.gps)}
            </ListGroupItem>
          </ListGroup>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginTop: 10 }}
          >
            <img alt="Remy Sharp" src={image} className={classes.avatar} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default NativeInterface;
