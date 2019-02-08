import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../../../utils/Logger';

@withRouter
@inject('homeStore')
@observer
class Home2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Logger.info('Home2');
    this.props.homeStore.loadHomeDataByeHomeIndex(1);
  }

  render() {
    let data = this.props.homeStore.homeInfoObject['1'] || {};
    return (
      <div>
        <p>Home2 : {JSON.stringify(data)}</p>
      </div>
    );
  }
}

export default Home2;
