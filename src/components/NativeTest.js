import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { ListGroup, ListGroupItem } from 'reactstrap';

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import classes from 'classnames';
import NativeInterfaceService from '../services/NativeInterfaceService';

@withRouter
@inject('appStore', 'nativeStore')
@observer
class NativeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.getDeviceInfo = this.getDeviceInfo.bind(this);
    this.setAppVersion = this.setAppVersion.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.getGps = this.getGps.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.enableBackButton = this.enableBackButton.bind(this);
    this.disableBackButton = this.disableBackButton.bind(this);
    this.changeAppHeadTitle = this.changeAppHeadTitle;
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('디바이스 연동 테스트');
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

  handleClose() {
    this.setState({ open: false });
  }

  enableBackButton() {
    NativeInterfaceService.enableBackButton();
  }

  disableBackButton() {
    NativeInterfaceService.disableBackButton();
  }

  changeAppHeadTitle() {
    NativeInterfaceService.changeAppHeadTitle('yamdeng good');
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
        <Button
          variant="contained"
          color="primary"
          onClick={this.changeAppHeadTitle}
        >
          앱 헤더 변경
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

export default NativeTest;
