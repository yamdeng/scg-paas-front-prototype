import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class ImmutabilityTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ImmutabilityTest');
  }

  render() {
    return <div>ImmutabilityTest</div>;
  }
}

export default ImmutabilityTest;
