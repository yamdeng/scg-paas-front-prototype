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
      }
      componentDidMount() {
        Logger.info('HOC componentDidMount : ' + WithSubscription.displayName);
      }
      render() {
        Logger.info('HOC render : ' + WithSubscription.displayName);
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

export default HOC;
