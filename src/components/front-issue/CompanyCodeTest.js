import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'companyStore')
@observer
class CompanyCodeTest extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('CompanyCodeTest');
  }
  render() {
    return (
      <div>
        <h1>CompanyCodeTest</h1>
      </div>
    );
  }
}

export default CompanyCodeTest;
