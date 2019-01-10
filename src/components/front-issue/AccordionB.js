import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import InnerTextComponent from './help/InnerTextComponent';

const checkPageAuth = function() {
  history.pushState(null, '코드분류', '#/code-split');
  return false;
};

@withRouter
@inject('appStore')
@observer
class AccordionB extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display1: false, display2: false, display3: false };
    // eslint-disable-next-line
    console.log('AccordionB constructor call');
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  toggleAccordion(accrodionNumber, isDisplay) {
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
    // checkPageAuth();
  }

  render() {
    // eslint-disable-next-line
    console.log('AccordionB render call');
    return (
      <ListGroup>
        <ListGroupItem
          onClick={event => this.toggleAccordion(1, !this.state.display1)}
        >
          사용자 정보
        </ListGroupItem>
        {this.state.display1 ? (
          <div style={{ display: this.state.display1 ? 'block' : 'none' }}>
            <InnerTextComponent text="사용자 정보 상세" />
          </div>
        ) : null}
        <ListGroupItem
          onClick={event => this.toggleAccordion(2, !this.state.display2)}
        >
          청구 정보
        </ListGroupItem>
        <div style={{ display: this.state.display2 ? 'block' : 'none' }}>
          <InnerTextComponent text="청구 정보 상세" />
        </div>
        <ListGroupItem
          onClick={event => this.toggleAccordion(3, !this.state.display3)}
        >
          미납 정보
        </ListGroupItem>
        <div style={{ display: this.state.display3 ? 'block' : 'none' }}>
          <InnerTextComponent text="미납 정보 상세" />
        </div>
      </ListGroup>
    );
  }
}

export default AccordionB;
