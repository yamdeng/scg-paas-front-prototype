import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../../../utils/Logger';

@withRouter
@inject('homeStore')
@observer
class Home1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Logger.info('Home1');
    this.props.homeStore.loadHomeDataByeHomeIndex(0);
  }

  render() {
    let data = this.props.homeStore.homeInfoObject['0'] || {};
    return (
      <div>
        <p>Home1 : {JSON.stringify(data)}</p>
      </div>
    );
  }
}

export default Home1;
