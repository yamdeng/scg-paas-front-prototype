import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import update from 'immutability-helper';
import shortid from 'shortid';
import Logger from '../../utils/Logger';
import ListDetail from './help/ListDetail';
import ListDetailPure from './help/ListDetailPure';
import ListDetailObject from './help/ListDetailObject';
import ListDetailObjectPure from './help/ListDetailObjectPure';
import UlComponent from './help/UlComponent';
import UlComponentPure from './help/UlComponentPure';

@withRouter
@observer
@inject('appStore')
class StoreTest extends React.Component {
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

export default StoreTest;
