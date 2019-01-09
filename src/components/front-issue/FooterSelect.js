import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class FooterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('하단 선택 영역');
  }

  render() {
    return <div>하단 선택 영역</div>;
  }
}

export default FooterSelect;
