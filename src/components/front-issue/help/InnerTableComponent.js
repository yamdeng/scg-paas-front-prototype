import React from 'react';
import { Table } from 'reactstrap';

class InnerTableComponent extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    console.log('InnerTableComponent constructor call');
  }

  componentDidMount() {
    // eslint-disable-next-line
    console.log('InnerTableComponent componentDidMount call');
  }

  render() {
    let resultComponent = this.props.data.map(info => {
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

export default InnerTableComponent;
