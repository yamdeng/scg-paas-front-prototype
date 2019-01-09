import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class CheckboxSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('체크박스 스위치');
  }

  render() {
    return <div>체크박스 스위치</div>;
  }
}

export default CheckboxSwitch;
