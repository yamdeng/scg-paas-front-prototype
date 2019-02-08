import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../../../utils/Logger';

@withRouter
@inject('homeStore')
@observer
class Home3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Logger.info('Home3');
    this.props.homeStore.loadHomeDataByeHomeIndex(2);
  }

  render() {
    let data = this.props.homeStore.homeInfoObject[2] || {};
    return (
      <div>
        <p>Home3 : {JSON.stringify(data)}</p>
      </div>
    );
  }
}

export default Home3;
