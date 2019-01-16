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
import LoadingBarTest from './components/front-issue/LoadingBar';
import SassTest from './components/front-issue/SassTest';
import Environment from './components/front-issue/Environment';
import CodeSplit from './components/front-issue/CodeSplit';
import ErrorTest from './components/front-issue/ErrorTest';
import ErrorClient from './components/front-issue/ErrorClient';
import ErrorServer from './components/front-issue/ErrorServer';
import ErrorAuth from './components/front-issue/ErrorAuth';
import ImageServerSync from './components/front-issue/ImageServerSync';
import EventTest from './components/front-issue/EventTest';
import TalkAnimation from './components/front-issue/TalkAnimation';
import PushCase1 from './components/front-issue/PushCase1';
import Analytics from './components/front-issue/Analytics';
import FormTest from './components/front-issue/FormTest';
import LoginToApp from './components/front-issue/LoginToApp';
import ChartCase1 from './components/front-issue/ChartCase1';
import TableScrollPage from './components/front-issue/TableScrollPage';
import ImageScrollPage from './components/front-issue/ImageScrollPage';
import TabScroll from './components/front-issue/TabScroll';
import ReactErrorTest from './components/front-issue/ReactErrorTest';
import LoadingBarContainer from './containers/LoadingBarContainer';
import ErrorBoundary from './components/ErrorBoundary';
import NativeInterfaceService from './services/NativeInterfaceService';
import NativeEventService from './services/NativeEventService';
import LoadingBar from './utils/LoadingBar';

import './App.css';
import Logger from './utils/Logger';

@withRouter
@inject('appStore')
@observer
class App extends Component {
  historyBlockHandler = null;

  constructor(props) {
    super(props);
    this.handleGlobalError = this.handleGlobalError.bind(this);
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
    return false;
  }

  init() {
    Logger.info('App init call');
    Logger.info('process.env : ' + JSON.stringify(process.env));
    window.onerror = this.handleGlobalError;
    NativeEventService.initEventListener();
    NativeInterfaceService.getLoginInfo();
    LoadingBar.show();

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
    if (!this.props.appStore.loginInfo) {
      mainContainerStyle.display = 'none';
    }
    return (
      <ErrorBoundary>
        <div>
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
            <Route exact path="/loadingbar" component={LoadingBarTest} />
            <Route exact path="/sass" component={SassTest} />
            <Route exact path="/environment" component={Environment} />
            <Route exact path="/code-split" component={CodeSplit} />
            <Route exact path="/error-test" component={ErrorTest} />
            <Route exact path="/error-client" component={ErrorClient} />
            <Route exact path="/error-server" component={ErrorServer} />
            <Route exact path="/error-auth" component={ErrorAuth} />
            <Route
              exact
              path="/image-server-sync"
              component={ImageServerSync}
            />
            <Route exact path="/event-test" component={EventTest} />
            <Route exact path="/talk-anmation" component={TalkAnimation} />
            <Route exact path="/pushcase-1" component={PushCase1} />
            <Route exact path="/analytics" component={Analytics} />
            <Route exact path="/form-test" component={FormTest} />
            <Route exact path="/login-to-app" component={LoginToApp} />
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
          </div>
          <LoadingBarContainer />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
