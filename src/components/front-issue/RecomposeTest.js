import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

// @withRouter
// @inject('appStore')
// @observer
class RecomposeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.appStore.changeHeadTitle('RecomposeTest');
  }

  render() {
    return <div>RecomposeTest</div>;
  }
}

export default RecomposeTest;
