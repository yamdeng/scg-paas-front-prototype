import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import queryString from 'query-string';
import InnerTableComponent from './help/InnerTableComponent';

import HOC from '../../utils/HOC';

@HOC.analytics2('TabB')
@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class TabB extends React.Component {
  constructor(props) {
    super(props);
    let queryStringInfo = queryString.parse(this.props.location.search);
    let activeTab = queryStringInfo.activeTab ? queryStringInfo.activeTab : '1';
    this.state = {
      activeTab: activeTab
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.props.frontIssueStore.loadTabData(2);
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('탭 부트스트랩');
    this.props.frontIssueStore.loadTabData(1);
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              사용자 정보
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              청구 정보
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <InnerTableComponent
                  data={this.props.frontIssueStore.tabData1}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <InnerTableComponent
                  data={this.props.frontIssueStore.tabData2}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default TabB;
