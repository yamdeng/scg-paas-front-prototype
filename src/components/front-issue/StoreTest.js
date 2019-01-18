import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import shortid from 'shortid';
import ListDetail from './help/ListDetail';
import ListDetailPure from './help/ListDetailPure';
import ListDetailObject from './help/ListDetailObject';
import ListDetailObjectPure from './help/ListDetailObjectPure';
import UlComponent from './help/UlComponent';
import UlComponentPure from './help/UlComponentPure';

@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class StoreTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addArrayTestInfo = this.addArrayTestInfo.bind(this);
    this.addArrayTestInfoToDomain = this.addArrayTestInfoToDomain.bind(this);
    this.handleArrayInfoChange = this.handleArrayInfoChange.bind(this);
    this.clearData = this.clearData.bind(this);
    this.changeObject1 = this.changeObject1.bind(this);
    this.changeObject1Name = this.changeObject1Name.bind(this);
    this.changeObject2 = this.changeObject2.bind(this);
    this.changeObject2Name = this.changeObject2Name.bind(this);
  }

  addArrayTestInfo() {
    this.props.frontIssueStore.addArrayTestInfo({
      id: shortid.generate(),
      name: 'test'
    });
  }

  addArrayTestInfoToDomain() {
    this.props.frontIssueStore.addArrayTestInfoToDomain({
      id: shortid.generate(),
      name: 'test'
    });
  }

  handleArrayInfoChange() {
    this.props.frontIssueStore.changArrayTestInfo(1, 'yamdeng777');
  }

  changeObject1() {
    this.props.frontIssueStore.changeObject1({ id: 1001, name: '1001' });
  }

  changeObject1Name() {
    this.props.frontIssueStore.changeObject1Name('1002');
  }

  changeObject2() {
    this.props.frontIssueStore.changeObject2({ id: 2001, name: '2001' });
  }

  changeObject2Name() {
    this.props.frontIssueStore.changeObject2Name('2002');
  }

  clearData() {
    this.props.frontIssueStore.clearData();
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('StoreTest');
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div>
          <Button color="primary" onClick={this.addArrayTestInfo}>
            addArrayTestInfo
          </Button>{' '}
          <Button color="success" onClick={this.addArrayTestInfoToDomain}>
            addArrayTestInfoToDomain
          </Button>{' '}
          <Button color="info" onClick={this.handleArrayInfoChange}>
            array 요소 수정
          </Button>{' '}
          <Button color="info" onClick={this.changeObject1}>
            changeObject1
          </Button>{' '}
          <Button color="info" onClick={this.changeObject1Name}>
            changeObject1Name
          </Button>{' '}
          <Button color="info" onClick={this.changeObject2}>
            changeObject2
          </Button>{' '}
          <Button color="info" onClick={this.changeObject2Name}>
            changeObject2Name
          </Button>{' '}
        </div>
        <br />
        <div>
          <Button color="primary" onClick={this.clearData}>
            clearData
          </Button>{' '}
        </div>

        <Container>
          <Row>
            <Col sm="4">
              <h1>primary</h1>
              <ul>
                {this.props.frontIssueStore.arrayTest.map(info => {
                  return (
                    <ListDetail key={info.id} id={info.id} name={info.name} />
                  );
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>primary pure</h1>
              <ul>
                {this.props.frontIssueStore.arrayTest.map(info => {
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
                {this.props.frontIssueStore.arrayTest.map(info => {
                  return <ListDetailObject key={info.id} info={info} />;
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>object pure</h1>
              <ul>
                {this.props.frontIssueStore.arrayTest.map(info => {
                  return <ListDetailObjectPure key={info.id} info={info} />;
                })}
              </ul>
            </Col>
            <Col sm="4">
              <h1>UlComponent</h1>
              <UlComponent list={this.props.frontIssueStore.arrayTest} />
            </Col>
            <Col sm="4">
              <h1>UlComponentPure</h1>
              <UlComponentPure list={this.props.frontIssueStore.arrayTest} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObject</h1>
              <ListDetailObject info={this.props.frontIssueStore.objectTest} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObjectPure</h1>
              <ListDetailObjectPure
                info={this.props.frontIssueStore.objectTest}
              />
            </Col>
            <Col sm="6">
              <h1>ListDetailObject(domain)</h1>
              <ListDetailObject info={this.props.frontIssueStore.objectTest2} />
            </Col>
            <Col sm="6">
              <h1>ListDetailObjectPure(domain)</h1>
              <ListDetailObjectPure
                info={this.props.frontIssueStore.objectTest2}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StoreTest;
