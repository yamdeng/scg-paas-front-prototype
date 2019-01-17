import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import update from 'immutability-helper';
import shortid from 'shortid';
import Logger from '../../utils/Logger';
import ListDetail from './help/ListDetail';

@withRouter
@inject('appStore', 'frontIssueStore')
@observer
class ImmutabilityTest extends React.Component {
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
    // this.setState({
    //   arrayTest: [
    //     {
    //       id: shortid.generate(),
    //       name: 'test'
    //     }
    //   ]
    // });

    this.setState({
      arrayTest: this.state.arrayTest.concat({
        id: shortid.generate(),
        name: 'test'
      })
    });

    //   console.log(Array.isArray(this.state.arrayTest));
    //   this.setState({
    //     arrayTest: update(this.state.arrayTest, {
    //       $push: [{ id: shortid.generate(), name: 'test' }]
    //     })
    //   });
  }

  handleArrayTest2() {
    this.props.frontIssueStore.addArrayTestInfo(1, {
      id: shortid.generate(),
      name: 'test'
    });
  }

  handleArrayTest3() {}

  handleArrayTest4() {}

  handleArrayTest5() {}

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
    this.props.appStore.changeHeadTitle('ImmutabilityTest');
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div>
          <Button color="primary" onClick={this.clearArrayTest}>
            clearArrayTest
          </Button>{' '}
          <Button color="secondary" onClick={this.clearStoreArray}>
            clearStore Array
          </Button>{' '}
        </div>
        <br />
        <div>
          <Button color="primary" onClick={this.handleArrayTest1}>
            handleArrayTest1
          </Button>{' '}
          <Button color="secondary" onClick={this.handleArrayTest2}>
            handleArrayTest2
          </Button>{' '}
          <Button color="success" onClick={this.handleArrayTest3}>
            handleArrayTest3
          </Button>{' '}
          <Button color="info" onClick={this.handleArrayTest4}>
            handleArrayTest4
          </Button>{' '}
          <Button color="warning" onClick={this.handleArrayTest5}>
            handleArrayTest5
          </Button>{' '}
        </div>
        <br />
        <div>
          <Button color="primary" onClick={this.handleObjectTest1}>
            handleObjectTest1
          </Button>{' '}
          <Button color="secondary" onClick={this.handleObjectTest2}>
            handleObjectTest2
          </Button>{' '}
          <Button color="success" onClick={this.handleObjectTest3}>
            handleObjectTest3
          </Button>{' '}
          <Button color="info" onClick={this.handleObjectTest4}>
            handleObjectTest4
          </Button>{' '}
          <Button color="warning" onClick={this.handleObjectTest5}>
            handleObjectTest5
          </Button>{' '}
        </div>
        <h1>arrayTest</h1>
        <ul>
          {this.state.arrayTest.map(info => {
            return <ListDetail key={info.id} id={info.id} name={info.name} />;
          })}
        </ul>
        <h1>store arrayTest</h1>
        <ul>
          {this.props.frontIssueStore.arrayTest.map(info => {
            return <ListDetail key={info.id} id={info.id} name={info.name} />;
          })}
        </ul>
      </div>
    );
  }
}

export default ImmutabilityTest;
