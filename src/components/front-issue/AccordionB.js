import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class AccordionB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('아코디언 부트스트랩');
  }

  render() {
    return <div>아코디언 부트스트랩</div>;
  }
}

export default AccordionB;
