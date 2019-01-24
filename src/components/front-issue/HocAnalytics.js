import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from '../../utils/HOC';

@HOC.analytics
@withRouter
@inject('appStore')
@observer
class HocAnalytics extends React.Component {
  static analyticsName = 'HocAnalytics';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('HocAnalytics');
  }

  render() {
    return <div>HocAnalytics</div>;
  }
}

export default HocAnalytics;
