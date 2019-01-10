import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class ErrorAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ErrorAuth');
  }

  render() {
    return <div>ErrorAuth</div>;
  }
}

export default ErrorAuth;
