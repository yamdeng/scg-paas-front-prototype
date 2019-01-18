import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import update from 'immutability-helper';
import shortid from 'shortid';
import Logger from '../../utils/Logger';
import UlComponent from './help/UlComponent';
import UlComponentStore from './help/UlComponentStore';
import ListDetailOuter from './help/ListDetail';
import ListDetailObject from './help/ListDetailObject';

// PureComponent
const ListDetailPure = React.memo(props => {
  Logger.info('ListDetailPure render call : ' + props.id);
  return <li>{props.id + ' : ' + props.name}</li>;
});

// Basic Component
const ListDetail = props => {
  Logger.info('ListDetail render call : ' + props.id);
  return <li>{props.id + ' : ' + props.name}</li>;
};

// const ListDetailObject = props => {
//   Logger.info('ListDetailObject render call : ' + props.info.id);
//   return <li>{props.info.id + ' : ' + props.info.name}</li>;
// };

// const ListDetailObject = React.memo(props => {
//   Logger.info('ListDetailObject render call : ' + props.info.id);
//   return <li>{props.info.id + ' : ' + props.info.name}</li>;
// });

@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class ImmutabilityTest3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayTest: [],
      objectTest: []
    };
    this.handleArrayTest1 = this.handleArrayTest1.bind(this);
    this.handleArrayTest2 = this.handleArrayTest2.bind(this);
    this.handleArrayTest3 = this.handleArrayTest3.bind(this);
    this.handleArrayTest4 = this.handleArrayTest4.bind(this);
    this.handleArrayTest5 = this.handleArrayTest5.bind(this);
    this.handleObjectTest1 = this.handleObjectTest1.bind(this);
    this.handleObjectTest2 = this.handleObjectTest2.bind(this);
    this.handleObjectTest3 = this.handleObjectTest3.bind(this);
    this.handleObjectTest4 = this.handleObjectTest4.bind(this);
    this.handleObjectTest5 = this.handleObjectTest5.bind(this);
    this.clearArrayTest = this.clearArrayTest.bind(this);
    this.clearStoreArray = this.clearStoreArray.bind(this);
  }

  handleArrayTest1() {
    let updateArrayTest = this.state.arrayTest.concat({
      id: shortid.generate(),
      name: 'test'
    });
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleArrayTest2() {
    this.props.frontIssueStore.addArrayTestInfo({
      id: shortid.generate(),
      name: 'test'
    });
  }

  handleArrayTest3() {
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
      $push: [
        { id: shortid.generate(), name: 'test' },
        { id: shortid.generate(), name: 'test' }
      ]
    });
    Logger.info('asd :' + updateArrayTest === this.state.arrayTest);
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleArrayTest4() {
    let updateArrayTest = update(this.state.arrayTest, {
      2: { name: { $set: shortid.generate() } }
    });
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleArrayTest5() {
    this.props.frontIssueStore.changArrayTestInfo(1, 'yamdeng');
  }

  handleObjectTest1() {}

  handleObjectTest2() {}

  handleObjectTest3() {}

  handleObjectTest4() {}

  handleObjectTest5() {}

  clearArrayTest() {
    this.setState({
      arrayTest: []
    });
  }

  clearStoreArray() {
    this.props.frontIssueStore.clearData();
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ImmutabilityTest3');
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div>
          <Button color="primary" onClick={this.handleArrayTest1}>
            arrayTest1
          </Button>{' '}
          <Button color="secondary" onClick={this.handleArrayTest2}>
            arrayTest2
          </Button>{' '}
          <Button color="success" onClick={this.handleArrayTest3}>
            arrayTest3
          </Button>{' '}
          <Button color="info" onClick={this.handleArrayTest4}>
            arrayTest4
          </Button>{' '}
          <Button color="warning" onClick={this.handleArrayTest5}>
            arrayTest5
          </Button>{' '}
        </div>
        <br />
        <div>
          <Button color="primary" onClick={this.handleObjectTest1}>
            ObjectTest1
          </Button>{' '}
          <Button color="secondary" onClick={this.handleObjectTest2}>
            ObjectTest2
          </Button>{' '}
          <Button color="success" onClick={this.handleObjectTest3}>
            ObjectTest3
          </Button>{' '}
          <Button color="info" onClick={this.handleObjectTest4}>
            ObjectTest4
          </Button>{' '}
          <Button color="warning" onClick={this.handleObjectTest5}>
            ObjectTest5
          </Button>{' '}
        </div>
        <br />
        <div>
          <Button color="primary" onClick={this.clearArrayTest}>
            clearArrayTest
          </Button>{' '}
          <Button color="secondary" onClick={this.clearStoreArray}>
            clearStore Array
          </Button>{' '}
        </div>

        <Container>
          <Row>
            <Col sm="4">
              <h1>arrayTest2</h1>
              <ul>
                {this.state.arrayTest.map(info => {
                  return (
                    <ListDetail key={info.id} id={info.id} name={info.name} />
                  );
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>arrayTest</h1>
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
              {/* <UlComponent list={this.state.arrayTest} /> */}
            </Col>
            <Col sm="4">
              <h1>storeTest</h1>
              {/* <UlComponentStore list={[]} /> */}
              {/* <UlComponent list={this.props.frontIssueStore.arrayTest.toJS()} /> */}
              {/* <UlComponent list={this.props.frontIssueStore.arrayTest} /> */}
              {/* <ul>
                {this.props.frontIssueStore.arrayTest.map(info => {
                  return (
                    <ListDetail key={info.id} id={info.id} name={info.name} />
                  );
                })}
              </ul> */}
              <ul>
                {this.props.frontIssueStore.arrayTest.map(info => {
                  return <ListDetailObject key={info.id} info={info} />;
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ImmutabilityTest3;
