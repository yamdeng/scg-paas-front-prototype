import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'companyStore')
@observer
class CompanySeoulTest extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('CompanySeoulTest');
  }
  render() {
    return (
      <div>
        <h1>CompanySeoulTest</h1>
      </div>
    );
  }
}

export default CompanySeoulTest;
