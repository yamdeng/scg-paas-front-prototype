import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from '../../utils/HOC';

@HOC.analytics2('AnalyticsTest')
@withRouter
@inject('appStore')
@observer
class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('Analytics');
  }

  render() {
    return <div>Analytics</div>;
  }
}

export default Analytics;
