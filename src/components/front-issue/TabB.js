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
import InnerTextComponent from './help/InnerTextComponent';
import InnerTextComponent2 from './help/InnerTextComponent2';
import Api from '../../utils/Api';
import Config from '../../config/Config';

/*

  1.탭 외부 컴포넌트에서 불러와서 props로 주입시키는 방법

  2.store를 사용하는 방법

*/

@withRouter
@inject('appStore')
@observer
class TabB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      tabData1: []
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('탭 부트스트랩');
    Api.get('safeHistory/' + Config.contractNo).then(result => {
      this.setState({ tabData1: result.data.safeHistory });
    });
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
                <InnerTextComponent text="사용자 정보 상세" />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <InnerTextComponent2 text="청구 정보 상세" />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default TabB;
