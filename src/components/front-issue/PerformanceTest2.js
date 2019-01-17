import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class PerformanceTest2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('PerformanceTest2');
  }

  render() {
    return <div>PerformanceTest2</div>;
  }
}

export default PerformanceTest2;
