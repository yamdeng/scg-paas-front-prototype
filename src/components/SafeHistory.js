import React from 'react';
import { Table } from 'reactstrap';
import Api from '../utils/Api';

class SafeHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let contractNo = this.props.match.params.contractNo;
    Api.get('safeHistory/' + contractNo).then(result => {
      this.setState({ data: result.data.safeHistory });
    });
  }

  render() {
    let resultComponent = this.state.data.map(info => {
      return (
        <tr>
          <td>{info.checkDate}</td>
          <td>{info.checkResult === 1 ? '적합' : '부적합'}</td>
          <td>{info.checkReason}</td>
        </tr>
      );
    });
    return (
      <Table>
        <thead>
          <tr>
            <th>점검일자</th>
            <th>결과</th>
            <th>부적합내역</th>
          </tr>
        </thead>
        <tbody>{resultComponent}</tbody>
      </Table>
    );
  }
}

export default SafeHistory;
