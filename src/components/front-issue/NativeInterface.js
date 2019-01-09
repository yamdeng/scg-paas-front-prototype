import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class NativeInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('네이티브 인터페이스');
  }

  render() {
    return <div>네이티브 인터페이스</div>;
  }
}

export default NativeInterface;
