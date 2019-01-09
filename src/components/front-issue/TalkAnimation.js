import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class TalkAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('TalkAnimation');
  }

  render() {
    return <div>TalkAnimation</div>;
  }
}

export default TalkAnimation;
