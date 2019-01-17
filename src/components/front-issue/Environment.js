import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class Environment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('EnvironmentTest');
    alert('process.env : ' + JSON.stringify(process.env));
  }

  render() {
    return <div>EnvironmentTest</div>;
  }
}

export default Environment;
