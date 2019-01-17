import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class TalkList extends React.Component {
  dummyTalkList = [];
  currentDummyTalkListIndex = 0;
  constructor(props) {
    super(props);
    this.state = {
      talkList: []
    };
  }

  repeatAddTalkList() {
    if (this.state.talkList.length < this.dummyTalkList.length) {
      setTimeout(() => {
        this.setState({
          talkList: [
            ...this.state.talkList,
            this.dummyTalkList[this.currentDummyTalkListIndex]
          ]
        });
        this.currentDummyTalkListIndex++;
        this.repeatAddTalkList();
        this.props.frontIssueStore.addTalkInfo({
          index: this.currentDummyTalkListIndex,
          name: 'name' + (this.currentDummyTalkListIndex + 1),
          color: 'success'
        });
      }, 1000);
    }
  }

  init() {
    let talkList = [];
    for (let index = 0; index < 20; index++) {
      talkList.push({
        index: index,
        name: 'name' + (index + 1),
        color: 'primary'
      });
    }
    this.dummyTalkList = talkList;
    this.repeatAddTalkList();
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('TalkList');
    this.props.frontIssueStore.clearTalkList();
    this.init();
  }

  render() {
    return (
      <div>
        {this.state.talkList.map(talkInfo => {
          return (
            <Button key={talkInfo.index} color={talkInfo.color} size="lg" block>
              {talkInfo.name}
            </Button>
          );
        })}
        {this.props.frontIssueStore.talkList.map(talkInfo => {
          return (
            <Button key={talkInfo.index} color={talkInfo.color} size="lg" block>
              {talkInfo.name}
            </Button>
          );
        })}
      </div>
    );
  }
}

export default TalkList;
