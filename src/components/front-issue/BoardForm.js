import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class BoardForm extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('BoardForm');
  }

  render() {
    return <div>BoardForm</div>;
  }
}

export default BoardForm;
