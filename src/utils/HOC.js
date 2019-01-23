import React from 'react';
import Logger from '../utils/Logger';
import Constant from '../config/Constant';
import Config from '../config/Config';

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
        Logger.error(
          'withRender2 componentDidMount2 : ' + WithSubscription.displayName
        );
      }
      render() {
        Logger.error('withRender2 render2 : ' + WithSubscription.displayName);
        return <WrappedComponent {...this.props} />;
      }
    }
    WithSubscription.displayName = getDisplayName(WrappedComponent);
    return WithSubscription;
  } else {
    return WrappedComponent;
  }
}

HOC.withRender = withRender;
HOC.withRender2 = withRender2;

export default HOC;
