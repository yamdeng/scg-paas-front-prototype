import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import shortid from 'shortid';
import Logger from '../../utils/Logger';
import { Map, List, Record } from 'immutable';

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
class ImmutabilityTest2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayTest: List([Map({ id: 1, name: 'yamdeng', color: 'red' })]),
      objectTest: Map({ id: 1, name: 'yamdeng' }),
      recordTest: Record({ id: 11, name: 'yamdeng11' })()
    };
    this.handleArrayConcat = this.handleArrayConcat.bind(this);
    this.handleArrayimmutabilityHelper = this.handleArrayimmutabilityHelper.bind(
      this
    );
    this.handleArrayInfoChange = this.handleArrayInfoChange.bind(this);
    this.clearArrayTest = this.clearArrayTest.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleObjectMerge = this.handleObjectMerge.bind(this);
    this.handleObjectChangeRecord = this.handleObjectChangeRecord.bind(this);
    this.handleObjectMergeRecord = this.handleObjectMergeRecord.bind(this);
  }

  handleArrayConcat() {
    let updateArrayTest = this.state.arrayTest.concat([
      Map({ id: shortid.generate(), name: 'test' })
    ]);
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleArrayimmutabilityHelper() {
    let updateArrayTest = this.state.arrayTest.push(
      Map({ id: shortid.generate(), name: 'test' })
    );
    Logger.info(
      'handleArrayimmutabilityHelper check :' +
        (updateArrayTest === this.state.arrayTest)
    );
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleArrayInfoChange() {
    let updateArrayTest = this.state.arrayTest.update(2, info =>
      info.set('name', shortid.generate())
    );
    Logger.info(
      'handleArrayInfoChange check :' +
        (updateArrayTest === this.state.arrayTest)
    );
    this.setState({
      arrayTest: updateArrayTest
    });
  }

  handleObjectChange() {
    let updateObjectTest = this.state.objectTest
      .set('name', 'yamdeng10')
      .set('id', 11);
    Logger.info(
      'handleObjectChange check :' +
        (updateObjectTest === this.state.objectTest)
    );
    this.setState({
      objectTest: updateObjectTest
    });
  }

  handleObjectMerge() {
    // merge하는 기준의 값이 같으면 그대로 변수를 유지함
    let updateObjectTest = this.state.objectTest.merge(
      Map({ name: 'yamdeng20', id: 21 })
    );
    Logger.info(
      'handleObjectMerge check :' + (updateObjectTest === this.state.objectTest)
    );
    this.setState({
      objectTest: updateObjectTest
    });
  }

  handleObjectChangeRecord() {
    let updateObjectTest = this.state.recordTest
      .set('name', 'yamdeng10')
      .set('id', 11);
    Logger.info(
      'handleObjectChangeRecord check :' +
        (updateObjectTest === this.state.recordTest)
    );
    this.setState({
      recordTest: updateObjectTest
    });
  }

  handleObjectMergeRecord() {
    // merge하는 기준의 값이 같으면 그대로 변수를 유지함
    let updateObjectTest = this.state.recordTest.merge(
      Map({ name: 'yamdeng20', id: 21 })
    );
    Logger.info(
      'handleObjectMergeRecord check :' +
        (updateObjectTest === this.state.recordTest)
    );
    this.setState({
      recordTest: updateObjectTest
    });
  }

  clearArrayTest() {
    this.setState({
      arrayTest: List([])
    });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ImmutabilityTest2');
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
            object change(Map)
          </Button>{' '}
          <Button color="info" onClick={this.handleObjectMerge}>
            object merge(Map)
          </Button>{' '}
          <Button color="info" onClick={this.handleObjectChangeRecord}>
            object change(Record)
          </Button>{' '}
          <Button color="info" onClick={this.handleObjectMergeRecord}>
            object merge(Record)
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
                {this.state.arrayTest.toJS().map(info => {
                  Logger.info('info : ' + JSON.stringify(info));
                  Logger.info('info12312323 : ' + info.id);
                  return (
                    <ListDetail
                      key={info.id}
                      id={info.id}
                      name={info.name}
                      color={info.color}
                    />
                  );
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>primary pure</h1>
              <ul>
                {this.state.arrayTest.toJS().map(info => {
                  return (
                    <ListDetailPure
                      key={info.id}
                      id={info.id}
                      name={info.name}
                      color={info.color}
                    />
                  );
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>object basic</h1>
              <ul>
                {this.state.arrayTest.toJS().map(info => {
                  return <ListDetailObject key={info.id} info={info} />;
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>object pure</h1>
              <ul>
                {this.state.arrayTest.toJS().map(info => {
                  return <ListDetailObjectPure key={info.id} info={info} />;
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>UlComponent</h1>
              <UlComponent list={this.state.arrayTest.toJS()} />
            </Col>
            <Col sm="4">
              <h1>UlComponentPure</h1>
              <UlComponentPure list={this.state.arrayTest.toJS()} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObject(Map)</h1>
              <ListDetailObject info={this.state.objectTest.toJS()} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObjectPure(Map)</h1>
              <ListDetailObjectPure info={this.state.objectTest.toJS()} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObject(Record)</h1>
              <ListDetailObject info={this.state.recordTest} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObjectPure(Record)</h1>
              <ListDetailObjectPure info={this.state.recordTest} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ImmutabilityTest2;
