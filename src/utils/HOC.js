import React from 'react';
import Logger from '../utils/Logger';
import Constant from '../config/Constant';
import Config from '../config/Config';
import AnalyticsService from '../services/AnalyticsService';

const HOC = {};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withRender(WrappedComponent) {
  if (
    Config.performanceTesting &&
    process.env.APP_ENV === Constant.APP_ENV_DEVELOPMENT
  ) {
    class WithSubscription extends React.PureComponent {
      constructor(props) {
        super(props);
        this.state = {};
        Logger.info('withRender constructor : ' + WithSubscription.displayName);
      }
      componentDidMount() {
        Logger.info(
          'withRender componentDidMount : ' + WithSubscription.displayName
        );
      }
      render() {
        Logger.info('withRender render : ' + WithSubscription.displayName);
        return <WrappedComponent {...this.props} />;
      }
    }
    WithSubscription.displayName = getDisplayName(WrappedComponent);
    return WithSubscription;
  } else {
    return WrappedComponent;
  }
}

function withRender2(WrappedComponent) {
  if (
    Config.performanceTesting &&
    process.env.APP_ENV === Constant.APP_ENV_DEVELOPMENT
  ) {
    class WithSubscription extends React.PureComponent {
      constructor(props) {
        super(props);
        this.state = {};
        Logger.info(
          'withRender2 constructor : ' + WithSubscription.displayName
        );
      }
      componentDidMount() {
        Logger.info(
          'withRender2 componentDidMount2: ' + WithSubscription.displayName
        );
      }
      render() {
        Logger.info('withRender2 render : ' + WithSubscription.displayName);
        return <WrappedComponent {...this.props} />;
      }
    }
    WithSubscription.displayName = getDisplayName(WrappedComponent);
    return WithSubscription;
  } else {
    return WrappedComponent;
  }
}

function componentWillUnmount(WrappedComponent) {
  class WithSubscription extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentWillUnmount() {
      Logger.info('componentWillUnmount: ' + WithSubscription.displayName);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithSubscription.displayName = getDisplayName(WrappedComponent);
  return WithSubscription;
}

function analytics(WrappedComponent) {
  class WithSubscription extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentDidMount() {
      Logger.info(
        'analytics componentDidMount : ' + WrappedComponent.analyticsName
      );
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return WithSubscription;
}

const analytics2 = analyticsName => WrappedComponent =>
  class WithSubscription extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentDidMount() {
      AnalyticsService.sendGA({
        page_title: analyticsName,
        page_path: analyticsName
      });
      Logger.info('analytics2 componentDidMount : ' + analyticsName);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

const documentTitle = title => WrappedComponent =>
  class WithSubscription extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
    }
    componentDidMount() {
      document.title = title;
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

HOC.withRender = withRender;
HOC.withRender2 = withRender2;
HOC.analytics = analytics;
HOC.analytics2 = analytics2;
HOC.componentWillUnmount = componentWillUnmount;
HOC.documentTitle = documentTitle;

export default HOC;
