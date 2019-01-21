import DevTools from 'mobx-react-devtools';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';
import FrontIssueNavigation from './components/FrontIssueNavigation';
import Home from './components/Home';

import AccordionB from './components/front-issue/AccordionB';
import AccordionM from './components/front-issue/AccordionM';
import TabB from './components/front-issue/TabB';
import TabM from './components/front-issue/TabM';
import DeviceBasic from './components/front-issue/DeviceBasic';
import FooterSelect from './components/front-issue/FooterSelect';
import CheckboxSwitch from './components/front-issue/CheckboxSwitch';
import NativeInterface from './components/front-issue/NativeInterface';
import ModalTest1 from './components/front-issue/ModalTest1';
import SassTest from './components/front-issue/SassTest';
import Environment from './components/front-issue/Environment';
import CodeSplit from './components/front-issue/CodeSplit';
import ErrorTest from './components/front-issue/ErrorTest';
import ErrorClient from './components/front-issue/ErrorClient';
import ErrorServer from './components/front-issue/ErrorServer';
import ErrorAuth from './components/front-issue/ErrorAuth';
import EventTest from './components/front-issue/EventTest';
import TalkAnimation from './components/front-issue/TalkAnimation';
import TalkList from './components/front-issue/TalkList';
import PushCase1 from './components/front-issue/PushCase1';
import Analytics from './components/front-issue/Analytics';
import FormTest from './components/front-issue/FormTest';
import ChartCase1 from './components/front-issue/ChartCase1';
import TableScrollPage from './components/front-issue/TableScrollPage';
import ImageScrollPage from './components/front-issue/ImageScrollPage';
import TabScroll from './components/front-issue/TabScroll';
import ReactErrorTest from './components/front-issue/ReactErrorTest';
import PublishTest from './components/front-issue/PublishTest';
import ImmutabilityTest from './components/front-issue/ImmutabilityTest';
import ImmutabilityTest2 from './components/front-issue/ImmutabilityTest2';
import StoreTest from './components/front-issue/StoreTest';
import StoreTest2 from './components/front-issue/StoreTest2';
import LoadingBarContainer from './containers/LoadingBarContainer';
import ErrorBoundary from './components/ErrorBoundary';
import DomainTestList from './components/front-issue/DomainTestList.js';
import DomainTestDetail from './components/front-issue/DomainTestDetail';
// import NativeInterfaceService from './services/NativeInterfaceService';
import NativeEventService from './services/NativeEventService';
// import LoadingBar from './utils/LoadingBar';

import './App.css';
import Logger from './utils/Logger';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import shortid from 'shortid';
import Helper from './utils/Helper';
import Constant from './config/Constant';

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
            <Route exact path="/" component={Home} />
            <Route exact path="/accordion-b" component={AccordionB} />
            <Route exact path="/accordion-m" component={AccordionM} />
            <Route exact path="/tab-b" component={TabB} />
            <Route exact path="/tab-m" component={TabM} />
            <Route exact path="/device-basic" component={DeviceBasic} />
            <Route exact path="/footer-select" component={FooterSelect} />
            <Route exact path="/checkbox-switch" component={CheckboxSwitch} />
            <Route exact path="/native-interface" component={NativeInterface} />
            <Route exact path="/modal-test-1" component={ModalTest1} />
            <Route exact path="/sass" component={SassTest} />
            <Route exact path="/environment" component={Environment} />
            <Route exact path="/code-split" component={CodeSplit} />
            <Route exact path="/error-test" component={ErrorTest} />
            <Route exact path="/error-client" component={ErrorClient} />
            <Route exact path="/error-server" component={ErrorServer} />
            <Route exact path="/error-auth" component={ErrorAuth} />
            <Route exact path="/event-test" component={EventTest} />
            <Route exact path="/talk-anmation" component={TalkAnimation} />
            <Route exact path="/talk-list" component={TalkList} />
            <Route exact path="/pushcase-1" component={PushCase1} />
            <Route exact path="/analytics" component={Analytics} />
            <Route exact path="/form-test" component={FormTest} />
            <Route exact path="/chartcase-1" component={ChartCase1} />
            <Route
              exact
              path="/table-page-scroll"
              component={TableScrollPage}
            />
            <Route
              exact
              path="/image-page-scroll"
              component={ImageScrollPage}
            />
            <Route exact path="/tab-scroll" component={TabScroll} />
            <Route exact path="/react-error-test" component={ReactErrorTest} />
            <Route exact path="/publish-test" component={PublishTest} />
            <Route
              exact
              path="/immutability-test"
              component={ImmutabilityTest}
            />
            <Route
              exact
              path="/immutability-test2"
              component={ImmutabilityTest2}
            />
            <Route exact path="/store-test" component={StoreTest} />
            <Route exact path="/store-test2" component={StoreTest2} />
            <Route exact path="/domain-list" component={DomainTestList} />
            <Route exact path="/domain-detail" component={DomainTestDetail} />
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
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
