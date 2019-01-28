import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class BoardDetail extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('BoardDetail');
  }

  render() {
    return <div>BoardDetail</div>;
  }
}

export default BoardDetail;
