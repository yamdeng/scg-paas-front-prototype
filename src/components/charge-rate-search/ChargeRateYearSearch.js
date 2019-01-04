import React from 'react';
import Api from '../../utils/Api';
import Config from '../../config/Config';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ComposedChart
} from 'recharts';
import { Table } from 'reactstrap';

class ChargeRateYearSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMonthChartData: []
    };
  }

  componentDidMount() {
    Api.get('allMonthInfo/' + Config.contractNo).then(result => {
      this.setState({
        allMonthChartData: result.data.allMonthChartData,
        totalUseGas: result.data.totalUseGas,
        totalChargeAmt: result.data.totalChargeAmt,
        totalDueAmt: result.data.totalDueAmt
      });
    });
  }

  render() {
    return (
      <div>
        <div style={{ overflow: 'scroll' }}>
          <ComposedChart
            data={this.state.allMonthChartData}
            width={1500}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              mirror={true}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#82ca9d"
              mirror={true}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="chargeAmt"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              yAxisId="left"
            />
            <Bar dataKey="dueAmt" yAxisId="right" barSize={20} fill="#413ea0" />
          </ComposedChart>
        </div>
        <div>
          <Table style={{ overflow: 'scroll' }}>
            <thead>
              <tr>
                <th>청구년월</th>
                <th>사용량(m)</th>
                <th>청구금액</th>
                <th>미납금액</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allMonthChartData.map(info => {
                return (
                  <tr key={info.date}>
                    <td>{info.date}</td>
                    <td>{info.useGas}</td>
                    <td>{info.chargeAmt}</td>
                    <td>{info.dueAmt}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ChargeRateYearSearch;
