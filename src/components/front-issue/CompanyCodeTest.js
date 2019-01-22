import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Constant from '../../config/Constant';
import Home from '../Home';
import CompanyInchonTest from './CompanyInchonTest';
import CompanySeoulTest from './CompanySeoulTest';

@withRouter
@inject('appStore', 'companyStore')
@observer
class CompanyCodeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { InitComponent: Home };
    if (this.props.companyStore.companyCode === Constant.COMPANY_CODE_INCHON) {
      import('./CompanyInchonTest').then(({ default: CompanyInchonTest }) => {
        this.setState({
          InitComponent: CompanyInchonTest
        });
      });
    } else {
      import('./CompanySeoulTest').then(({ default: CompanySeoulTest }) => {
        this.setState({
          InitComponent: CompanySeoulTest
        });
      });
    }
    this.chanageCompanyCodeBySeoul = this.chanageCompanyCodeBySeoul.bind(this);
    this.chanageCompanyCodeByInchon = this.chanageCompanyCodeByInchon.bind(
      this
    );
    this.handleButton = this.handleButton.bind(this);
  }

  chanageCompanyCodeBySeoul() {
    this.props.companyStore.setCompanyCode(Constant.COMPANY_CODE_SEOUL);
  }

  chanageCompanyCodeByInchon() {
    this.props.companyStore.setCompanyCode(Constant.COMPANY_CODE_INCHON);
  }

  handleButton() {
    if (this.props.companyStore.companyCode === Constant.COMPANY_CODE_INCHON) {
      alert('inchon handle');
    } else {
      alert('seoul handle');
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('CompanyCodeTest');
  }
  render() {
    const { InitComponent } = this.state;
    let DynamicComponent = <CompanySeoulTest />;
    if (this.props.companyStore.companyCode === Constant.COMPANY_CODE_INCHON) {
      DynamicComponent = <CompanyInchonTest />;
    }
    return (
      <div>
        <Button color="primary" onClick={this.chanageCompanyCodeBySeoul}>
          seoul로 수정
        </Button>{' '}
        <Button color="primary" onClick={this.chanageCompanyCodeByInchon}>
          inchon로 수정
        </Button>{' '}
        <br />
        <p>{this.props.companyStore.companyInfo.label1}</p>
        <p>{this.props.companyStore.companyInfo.info1.label2}</p>
        <p>{this.props.companyStore.companyInfo.info2.label2}</p>
        <br />
        {<InitComponent />}
        <br />
        {DynamicComponent}
        <br />
        <Button color="primary" onClick={this.handleButton}>
          handle function
        </Button>{' '}
      </div>
    );
  }
}

export default CompanyCodeTest;
