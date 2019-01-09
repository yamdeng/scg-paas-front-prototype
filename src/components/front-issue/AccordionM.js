import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class AccordionM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('아코디언 메트리얼');
  }

  render() {
    return <div>아코디언 메트리얼</div>;
  }
}

export default AccordionM;
