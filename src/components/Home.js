import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class Home extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('프론트 개발 이슈 테스트');
  }
  render() {
    return (
      <div>
        <h1>프론트 개발 이슈 테스트</h1>
      </div>
    );
  }
}

export default Home;
