import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import update from 'immutability-helper';
import Logger from '../../utils/Logger';
import LifeCycleChild from './LifeCycleChild';

@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class LifeCycleTest extends React.Component {
  dummyObjectTest = { id: 701, name: '701' };
  constructor(props) {
    super(props);
    this.state = { objectTest: { id: 2000, name: 'parent object' }, age: 100 };
    Logger.info(
      'LifeCycleTest constructor this.constructor.name :' +
        this.constructor.name
    );
    this.handleStoreObject = this.handleStoreObject.bind(this);
    this.handleStoreObjectName = this.handleStoreObjectName.bind(this);
    this.handleStoreAge = this.handleStoreAge.bind(this);
    this.handleParentObject = this.handleParentObject.bind(this);
    this.handleParentObjectName = this.handleParentObjectName.bind(this);
    this.handleParentAge = this.handleParentAge.bind(this);
  }

  componentDidMount() {
    Logger.info('LifeCycleTest componentDidMount call');
    this.props.appStore.changeHeadTitle('LifeCycleTest');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    Logger.info('LifeCycleTest componentDidUpdate call');
    // store를 inject한 상태에서 JSON.stringify 재귀로 돌게되서 오류남
    // Logger.info('LifeCycleTest prevProps : ' + JSON.stringify(prevProps));
    Logger.info('LifeCycleTest prevState : ' + JSON.stringify(prevState));
    Logger.info('LifeCycleTest snapshot : ' + JSON.stringify(snapshot));
  }

  handleStoreObject() {
    this.props.frontIssueStore.changeObject1({ id: 301, name: '301' });
  }

  handleStoreObjectName() {
    this.props.frontIssueStore.changeObject1Name('hahaha');
  }

  handleStoreAge() {
    this.props.frontIssueStore.changeAge(200);
  }

  handleParentAge() {
    this.setState({ age: 700 });
  }

  handleParentObject() {
    this.setState({ objectTest: this.dummyObjectTest });
  }

  handleParentObjectName() {
    let updateObjectTest = update(this.state.objectTest, {
      $merge: { id: 1, name: 'yamdeng10' }
    });
    this.setState({ objectTest: updateObjectTest });
  }

  render() {
    Logger.info('LifeCycleTest render call');
    return (
      <div>
        <Button color="primary" onClick={this.handleStoreObject}>
          storeObject change
        </Button>{' '}
        <Button color="primary" onClick={this.handleStoreObjectName}>
          storeObject name change
        </Button>{' '}
        <Button color="primary" onClick={this.handleStoreAge}>
          store age change
        </Button>{' '}
        <Button color="primary" onClick={this.handleParentObject}>
          parentObject change
        </Button>{' '}
        <Button color="primary" onClick={this.handleParentObjectName}>
          parentObject name change
        </Button>{' '}
        <Button color="primary" onClick={this.handleParentAge}>
          parent age change
        </Button>{' '}
        <br />
        <LifeCycleChild
          storeObject={this.props.frontIssueStore.objectTest}
          parentObject={this.state.objectTest}
          storeAge={this.props.frontIssueStore.age}
          parentAge={this.state.age}
        />
      </div>
    );
  }
}

export default LifeCycleTest;
