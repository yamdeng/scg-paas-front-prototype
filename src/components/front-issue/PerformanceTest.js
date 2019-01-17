import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class PerformanceTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('PerformanceTest');
  }

  render() {
    return <div>PerformanceTest</div>;
  }
}

export default PerformanceTest;
