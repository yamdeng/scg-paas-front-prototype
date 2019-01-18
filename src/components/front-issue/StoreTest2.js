import React from 'react';
import { Table } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore', 'testStore')
@observer
class StoreTest2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.testStore.clear();
  }

  componentDidMount() {
    this.props.testStore.search({ page: 1, pageSize: 10 });
    this.props.appStore.changeHeadTitle('StoreTest2');
  }

  render() {
    let resultComponent = this.props.testStore.data.map(info => {
      return (
        <tr key={info.id}>
          <td>{info.id}</td>
          <td>{info.name}</td>
        </tr>
      );
    });
    return (
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>{resultComponent}</tbody>
      </Table>
    );
  }
}

export default StoreTest2;
