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

class ChargeRateYearSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
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
        <ComposedChart
          data={this.state.recentUseChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="useGas"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            yAxisId="left"
          />
          <Bar dataKey="useAmt" yAxisId="right" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </div>
    );
  }
}

export default ChargeRateYearSearch;
