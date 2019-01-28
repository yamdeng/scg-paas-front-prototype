import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class IntroPage extends React.Component {
  render() {
    return (
      <div>
        <h1>IntroPage</h1>
      </div>
    );
  }
}

export default IntroPage;
