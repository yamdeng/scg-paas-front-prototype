import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import InnerTextComponent from './help/InnerTextComponent';
// import AppHistory from '../../utils/AppHistory';

@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class AccordionB extends React.Component {
  /*

    store의 값을 변경해서 아코디언 상세 값을 바꾸기

  */

  constructor(props) {
    super(props);
    this.state = { display1: false, display2: false, display3: false };
    // eslint-disable-next-line
    console.log('AccordionB constructor call');
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.handlerHistory = this.handlerHistory.bind(this);
  }

  handlerHistory() {
    // this.props.history.push('/code-split');
    // AppHistory.push('/code-split');
  }

  toggleAccordion(accrodionNumber, isDisplay, text) {
    this.props.frontIssueStore.setAccodionData(accrodionNumber, text);
    this.setState({
      ['display' + accrodionNumber]: isDisplay
    });
  }

  hideAccordion(accrodionNumber) {
    this.setState({
      ['display' + accrodionNumber]: false
    });
  }

  componentDidMount() {
    // eslint-disable-next-line
    console.log('AccordionB componentDidMount call');
    this.props.appStore.changeHeadTitle('아코디언 부트스트랩');

    // 마운트시에 페이지 권한 체크
    // Helper.checkAuthByUrl(this.props.match.url);
    this.props.frontIssueStore.clearAccordionData();
    this.props.frontIssueStore.setAccodionData(1, '사용자 정보 상세');
  }

  render() {
    // eslint-disable-next-line
    console.log('AccordionB render call');
    return (
      <ListGroup>
        <ListGroupItem
          onClick={event =>
            this.toggleAccordion(1, !this.state.display1, '사용자 정보 상세!')
          }
        >
          사용자 정보
        </ListGroupItem>
        {this.state.display1 ? (
          <div
            style={{ display: this.state.display1 ? 'block' : 'none' }}
            onClick={this.handlerHistory}
          >
            <InnerTextComponent
              text={this.props.frontIssueStore.accordionData[1]}
            />
          </div>
        ) : null}
        <ListGroupItem
          onClick={event =>
            this.toggleAccordion(2, !this.state.display2, '청구 정보 상세!')
          }
        >
          청구 정보
        </ListGroupItem>
        <div style={{ display: this.state.display2 ? 'block' : 'none' }}>
          <InnerTextComponent
            text={this.props.frontIssueStore.accordionData[2]}
          />
        </div>
        <ListGroupItem
          onClick={event =>
            this.toggleAccordion(3, !this.state.display3, '미납 정보 상세!')
          }
        >
          미납 정보
        </ListGroupItem>
        <div style={{ display: this.state.display3 ? 'block' : 'none' }}>
          <InnerTextComponent
            text={this.props.frontIssueStore.accordionData[3]}
          />
        </div>
      </ListGroup>
    );
  }
}

export default AccordionB;
