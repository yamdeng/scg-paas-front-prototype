import DevTools from 'mobx-react-devtools';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import FrontIssueNavigation from './components/FrontIssueNavigation';
import LoadingBarContainer from './containers/LoadingBarContainer';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
// import NativeInterfaceService from './services/NativeInterfaceService';
import NativeEventService from './services/NativeEventService';
// import LoadingBar from './utils/LoadingBar';

import './App.css';
import Logger from './utils/Logger';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import shortid from 'shortid';
import Helper from './utils/Helper';
import Constant from './config/Constant';
import Routes from './config/Routes';

@withRouter
@inject('appStore')
@observer
class App extends Component {
  historyBlockHandler = null;

  constructor(props) {
    super(props);
    this.state = { displayErrorModal: false, appErrorObject: null };
    this.handleGlobalError = this.handleGlobalError.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.copyToClipboardByTextArea = this.copyToClipboardByTextArea.bind(this);
  }

  handleGlobalError(message, url, lineNumber, column, errorObject) {
    if (errorObject && typeof errorObject === 'string') {
      errorObject = {
        message: errorObject
      };
    }
    let displayErrorMessage = '';
    displayErrorMessage = displayErrorMessage + 'url : ' + url + '\n';
    displayErrorMessage =
      displayErrorMessage + 'lineNumber : ' + lineNumber + '\n';
    displayErrorMessage = displayErrorMessage + 'column : ' + column + '\n';
    displayErrorMessage =
      displayErrorMessage +
      'message : ' +
      (errorObject && errorObject.message
        ? errorObject.message
        : 'NO MESSAGE') +
      '\n';
    errorObject = errorObject || {};
    errorObject.message = displayErrorMessage;
    let appErrorObject = { message: errorObject.message };
    if (errorObject.stack) {
      appErrorObject.statck = errorObject.stack;
    }
    appErrorObject.errorType =
      errorObject.errorType || Constant.ERROR_TYPE_CORE;
    if (process.env.APP_ENV === Constant.APP_ENV_DEVELOPMENT) {
      this.setState({
        displayErrorModal: true,
        appErrorObject: appErrorObject
      });
    }
    Logger.error('appErrorObject : ' + JSON.stringify(appErrorObject));
    return false;
  }

  copyToClipboardByTextArea(textAreaId) {
    Helper.copyToClipboard(textAreaId);
  }

  closeErrorModal() {
    this.setState({ displayErrorModal: false });
  }

  init() {
    Logger.info('App init call');
    Logger.info('process.env : ' + JSON.stringify(process.env));
    window.onerror = this.handleGlobalError;
    NativeEventService.initEventListener();
    // NativeInterfaceService.getLoginInfo();
    // LoadingBar.show();

    // this.historyBlockHandler = this.props.history.block((location, action) => {
    //   console.log('on route block');
    //   if (this.props.appStore.headTitle === '아코디언 메트리얼') {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    if (this.historyBlockHandler) {
      this.historyBlockHandler();
    }
  }

  render() {
    let mainContainerStyle = { marginTop: 60 };
    // if (!this.props.appStore.loginInfo) {
    //   mainContainerStyle.display = 'none';
    // }
    let errorObjectConvertString = '';
    if (this.state.appErrorObject) {
      errorObjectConvertString = JSON.stringify(this.state.appErrorObject);
    }
    let textAreaId = shortid.generate();

    let DEV_TOOL_COMPONENT = null;
    // if (process.env.APP_ENV === Constant.APP_ENV_DEVELOPMENT) {
    //   DEV_TOOL_COMPONENT = <DevTools />;
    // }
    if (false) {
      DEV_TOOL_COMPONENT = <DevTools />;
    }

    return (
      <ErrorBoundary>
        <div>
          {DEV_TOOL_COMPONENT}
          <FrontIssueNavigation />
          <div style={mainContainerStyle}>
            {Routes.map(routeInfo => {
              return (
                <Route
                  exact
                  path={routeInfo.path}
                  key={routeInfo.path}
                  component={routeInfo.component}
                />
              );
            })}
          </div>
          {/* {라우팅 설정 end} */}
          <LoadingBarContainer />
          <Modal
            isOpen={this.state.displayErrorModal}
            toggle={this.closeErrorModal}
            id="modalContainer"
          >
            <ModalHeader toggle={this.closeErrorModal}>에러모달</ModalHeader>
            <ModalBody>
              {/* {errorObjectConvertString} */}
              <textarea
                id={textAreaId}
                value={errorObjectConvertString}
                style={{
                  display: 'block',
                  opacity: 0,
                  width: '0px',
                  height: '0px'
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={event => this.copyToClipboardByTextArea(textAreaId)}
              >
                에러 복사
              </Button>
              <Button color="primary" onClick={this.closeErrorModal}>
                닫기
              </Button>
            </ModalFooter>
          </Modal>

          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
