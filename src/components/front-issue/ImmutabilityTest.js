import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import update from 'immutability-helper';
import shortid from 'shortid';
import Logger from '../../utils/Logger';

// PureComponent
const ListDetailPure = React.memo(props => {
  Logger.info('ListDetailPure render call : ' + props.id);
  return (
    <li style={{ color: props.color ? props.color : '' }}>
      {props.id + ' : ' + props.name}
    </li>
  );
});

// // Basic Component
const ListDetail = props => {
  Logger.info('ListDetail render call : ' + props.id);
  return (
    <li style={{ color: props.color ? props.color : '' }}>
      {props.id + ' : ' + props.name}
    </li>
  );
};

const ListDetailObject = props => {
  Logger.info('ListDetailObject render call : ' + props.info.id);
  return (
    <li style={{ color: props.info.color ? props.info.color : '' }}>
      {props.info.id + ' : ' + props.info.name}
    </li>
  );
};

const ListDetailObjectPure = React.memo(props => {
  Logger.info('ListDetailObjectPure render call : ' + props.info.id);
  return (
    <li style={{ color: props.info.color ? props.info.color : '' }}>
      {props.info.id + ' : ' + props.info.name}
    </li>
  );
});

const UlComponent = props => {
  Logger.info('UlComponent render call : ' + props.list.length);
  return (
    <div>
      {props.list.map(info => {
        return (
          <ListDetail
            key={info.id}
            id={info.id}
            name={info.name}
            color={info.color}
          />
        );
      })}
    </div>
  );
};

const UlComponentPure = React.memo(props => {
  Logger.info('UlComponentPure render call : ' + props.list.length);
  return (
    <div>
      {props.list.map(info => {
        return (
          <ListDetailPure
            key={info.id}
            id={info.id}
            name={info.name}
            color={info.color}
          />
        );
      })}
    </div>
  );
});

@withRouter
@inject('appStore')
@observer
class ImmutabilityTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayTest: [],
      objectTest: { id: 1, name: 'yamdeng' }
    };
    this.handleArrayConcat = this.handleArrayConcat.bind(this);
    this.handleArrayimmutabilityHelper = this.handleArrayimmutabilityHelper.bind(
      this
    );
    this.handleArrayInfoChange = this.handleArrayInfoChange.bind(this);
    this.clearArrayTest = this.clearArrayTest.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleObjectMerge = this.handleObjectMerge.bind(this);
  }

  handleArrayConcat() {
    let updateArrayTest = this.state.arrayTest.concat({
      id: shortid.generate(),
      name: 'test'
    });
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleArrayimmutabilityHelper() {
    // let debuggerUpdate = update;
    // debugger;
    /*

      var testObj = {aaa:'aaa'};
      var initialArray = [testObj, 2, 3];
      var newArray = debuggerUpdate(initialArray, {$push: [4]});
      initialArray === newArray
      testObj === newArray[0]

      var obj = {a: 5, b: 3};
      var newObj = debuggerUpdate(obj, {$merge: {b: 6, c: 7}});

      var deepObj = {a: 5, b: 3, c:{c1:'ccc'}, d:{d1:'ddd'}};
      var newDeepObj = debuggerUpdate(deepObj, {$merge: {c:{c1:'ccc1', c2:'ccc2'}}});

      // 얕은 copy가 기본을 이룬다. 다만 해당 루트의 변수값 자체가 틀려지므로

    */

    let updateArrayTest = update(this.state.arrayTest, {
      $push: [{ id: shortid.generate(), name: 'test' }]
    });
    Logger.info(
      'handleArrayimmutabilityHelper check :' +
        (updateArrayTest === this.state.arrayTest)
    );
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleArrayInfoChange() {
    let updateArrayTest = update(this.state.arrayTest, {
      2: { name: { $set: shortid.generate() } }
    });
    Logger.info(
      'handleArrayInfoChange check :' +
        (updateArrayTest === this.state.arrayTest)
    );
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleObjectChange() {
    this.setState({
      objectTest: { id: shortid.generate(), name: 'yamdeng10' }
    });
  }

  handleObjectMerge() {
    // merge하는 기준의 값이 같으면 그대로 변수를 유지
    let updateObjectTest = update(this.state.objectTest, {
      $merge: { id: 1, name: 'yamdeng10' }
    });
    Logger.info(
      'handleObjectMerge check :' + (updateObjectTest === this.state.objectTest)
    );
    this.setState({
      objectTest: updateObjectTest
    });
  }

  clearArrayTest() {
    this.setState({
      arrayTest: []
    });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ImmutabilityTest');
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div>
          <Button color="primary" onClick={this.handleArrayConcat}>
            state array concat
          </Button>{' '}
          <Button color="success" onClick={this.handleArrayimmutabilityHelper}>
            immutability-helper
          </Button>{' '}
          <Button color="info" onClick={this.handleArrayInfoChange}>
            array 요소 수정
          </Button>{' '}
          <Button color="info" onClick={this.handleObjectChange}>
            object change
          </Button>{' '}
          <Button color="info" onClick={this.handleObjectMerge}>
            object merge
          </Button>{' '}
        </div>
        <br />
        <div>
          <Button color="primary" onClick={this.clearArrayTest}>
            clear state
          </Button>{' '}
        </div>

        <Container>
          <Row>
            <Col sm="4">
              <h1>primary</h1>
              <ul>
                {this.state.arrayTest.map(info => {
                  return (
                    <ListDetail key={info.id} id={info.id} name={info.name} />
                  );
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>primary pure</h1>
              <ul>
                {this.state.arrayTest.map(info => {
                  return (
                    <ListDetailPure
                      key={info.id}
                      id={info.id}
                      name={info.name}
                    />
                  );
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>object basic</h1>
              <ul>
                {this.state.arrayTest.map(info => {
                  return <ListDetailObject key={info.id} info={info} />;
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>object pure</h1>
              <ul>
                {this.state.arrayTest.map(info => {
                  return <ListDetailObjectPure key={info.id} info={info} />;
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>UlComponent</h1>
              <UlComponent list={this.state.arrayTest} />
            </Col>
            <Col sm="4">
              <h1>UlComponentPure</h1>
              <UlComponentPure list={this.state.arrayTest} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObject</h1>
              <ListDetailObject info={this.state.objectTest} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObjectPure</h1>
              <ListDetailObjectPure info={this.state.objectTest} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ImmutabilityTest;
