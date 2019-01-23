import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../../utils/Logger';

// @withRouter
@observer
class LifeCycleChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = { age: 1000 };
    Logger.info(
      'LifeCycleChild constructor this.constructor.name :' +
        this.constructor.name
    );
    Logger.info('LifeCycleChild.name :' + LifeCycleChild.name);
  }

  static getDerivedStateFromProps(props, state) {
    // props를 이용해서 state를 바꿀때. 바꾸지 않꾸고 싶을때는 null을 반환
    // return {
    //   age: 100000
    // };
    return null;
  }

  componentDidMount() {
    Logger.info('LifeCycleChild componentDidMount call');
    // this.state, this.props로 핸들링
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // return 10;
    return { yamdeng: 'test' };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    Logger.info('LifeCycleChild componentDidUpdate call');
    Logger.info('LifeCycleChild prevProps : ' + JSON.stringify(prevProps));
    Logger.info('LifeCycleChild prevState : ' + JSON.stringify(prevState));
    Logger.info('LifeCycleChild snapshot : ' + JSON.stringify(snapshot));
    // this.state, this.props과 같이 핸들링
  }

  render() {
    Logger.info('LifeCycleChild render call');
    return (
      <div>
        <p>child store object : {JSON.stringify(this.props.storeObject)}</p>
        <p>child parent object : {JSON.stringify(this.props.parentObject)}</p>
        <p>child store age : {this.props.storeAge}</p>
        <p>child parent age : {this.props.parentAge}</p>
        <p>child state age : {this.state.age}</p>
      </div>
    );
  }
}

export default LifeCycleChild;
