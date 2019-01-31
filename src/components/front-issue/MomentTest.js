import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

@withRouter
@inject('appStore')
@observer
class MomentTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('MomentTest');
  }

  render() {
    let hhMM = moment().format('a HH:mm');
    return (
      <div>
        hhMM : {hhMM}
        <br />
      </div>
    );
  }
}

export default MomentTest;
