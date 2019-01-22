import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'companyStore')
@observer
class CompanyInchonTest extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('CompanyInchonTest');
  }
  render() {
    return (
      <div>
        <h1>CompanyInchonTest</h1>
      </div>
    );
  }
}

export default CompanyInchonTest;
