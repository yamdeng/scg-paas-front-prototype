import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class ImmutabilityTest2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ImmutabilityTest2');
  }

  render() {
    return <div>ImmutabilityTest2</div>;
  }
}

export default ImmutabilityTest2;
