import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Api from '../utils/Api';

class GasRateTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    Api.get('tariff').then(result => {
      this.setState({ data: result.data.gasTariffSimpleInfos });
    });
  }

  render() {
    let resultComponent = this.state.data.map(info => {
      return (
        <tr key={info.id}>
          <td>
            <Link className="nav-link" to={`/tariff/${info.id}`}>
              {info.id}
            </Link>
          </td>
          <td>{info.date}</td>
          <td>{info.content}</td>
        </tr>
      );
    });
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>날짜</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>{resultComponent}</tbody>
      </Table>
    );
  }
}

export default GasRateTable;
