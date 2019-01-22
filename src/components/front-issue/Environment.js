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
  }

  render() {
    return (
      <div>
        EnvironmentTest
        <p>{'process.env : ' + JSON.stringify(process.env)}</p>
      </div>
    );
  }
}

export default Environment;
