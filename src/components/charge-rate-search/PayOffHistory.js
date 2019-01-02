import React from 'react';
import { Table } from 'reactstrap';
import Api from '../../utils/Api';
import Config from '../../config/Config';

class PayOffHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payOffHistoryInfo: [],
      totalPayOffUseGas: 0,
      totalPayOffChargeAmt: 0,
      totalPayOffDueAmt: 0
    };
  }

  componentDidMount() {
    Api.get('payOffHistory/' + Config.contractNo).then(result => {
      this.setState({
        payOffHistoryInfo: result.data.payOffHistoryInfo,
        totalPayOffUseGas: result.data.totalPayOffUseGas,
        totalPayOffChargeAmt: result.data.totalPayOffChargeAmt,
        totalPayOffDueAmt: result.data.totalPayOffDueAmt
      });
    });
  }
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>청구년월</th>
              <th>사용량(m)</th>
              <th>청구금액</th>
              <th>미납금액</th>
            </tr>
          </thead>
          <tbody>
            {this.state.payOffHistoryInfo.map(info => {
              return (
                <tr>
                  <td>{info.date}</td>
                  <td>{info.useGas}</td>
                  <td>{info.chargeAmt.toLocaleString() + '원'}</td>
                  <td>{info.dueAmt.toLocaleString() + '원'}</td>
                </tr>
              );
            })}
            <tr style={{ fontWeight: 'bold' }}>
              <td>합계</td>
              <td>{this.state.totalPayOffUseGas}</td>
              <td>{this.state.totalPayOffChargeAmt.toLocaleString() + '원'}</td>
              <td>{this.state.totalPayOffDueAmt.toLocaleString() + '원'}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PayOffHistory;
