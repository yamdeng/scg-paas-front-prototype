import React from 'react';
import Api from '../../utils/Api';
import Config from '../../config/Config';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Table } from 'reactstrap';
import shortid from 'shortid';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ComposedChart,
  ResponsiveContainer
} from 'recharts';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class ChargeRateMonthSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMonthChartData: [],
      recentUseChartData: [],
      monthDetailInfo: {}
    };
  }

  componentDidMount() {
    Api.get('monthInfo/201810/' + Config.contractNo).then(result => {
      this.setState({
        allMonthChartData: result.data.allMonthChartData,
        monthDetailInfo: result.data.monthDetailInfo,
        recentUseChartData: result.data.monthDetailInfo
          ? result.data.monthDetailInfo.recentUseChartData
          : []
      });
    });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>연간 차트정보</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ overflow: 'scroll' }}>
            <LineChart
              width={1500}
              height={300}
              data={this.state.allMonthChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="chargeAmt"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="dueAmt" stroke="#82ca9d" />
            </LineChart>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>기본정보</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    '사용기간 : ' +
                    (this.state.monthDetailInfo.monthBasic
                      ? this.state.monthDetailInfo.monthBasic
                          .useDateRangeBefore +
                        ' ~ ' +
                        this.state.monthDetailInfo.monthBasic.useDateRangeAfter
                      : '-')
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    '납부마감일 : ' +
                    (this.state.monthDetailInfo.monthBasic
                      ? this.state.monthDetailInfo.monthBasic.paymentDeadline
                      : '-')
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    '주소 : ' +
                    (this.state.monthDetailInfo.monthBasic
                      ? this.state.monthDetailInfo.monthBasic.address
                      : '-')
                  }
                />
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>청구 상세 내역</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <tbody>
                {
                  <React.Fragment>
                    <tr>
                      <td>기본요금</td>
                      <td>
                        {this.state.monthDetailInfo.claimDetail
                          ? this.state.monthDetailInfo.claimDetail.basicAmt.toLocaleString() +
                            '원'
                          : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td>사용요금</td>
                      <td>
                        {this.state.monthDetailInfo.claimDetail
                          ? this.state.monthDetailInfo.claimDetail.useAmt.toLocaleString() +
                            '원'
                          : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td>부가세</td>
                      <td>
                        {this.state.monthDetailInfo.claimDetail
                          ? this.state.monthDetailInfo.claimDetail.vatAmt.toLocaleString() +
                            '원'
                          : '-'}
                      </td>
                    </tr>
                    <tr>
                      <td>절사금액</td>
                      <td>
                        {this.state.monthDetailInfo.claimDetail
                          ? '-' +
                            this.state.monthDetailInfo.claimDetail.cutAmt.toLocaleString() +
                            '원'
                          : '-'}
                      </td>
                    </tr>
                  </React.Fragment>
                }
              </tbody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>입금 전용 계좌</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <tbody>
                {this.state.monthDetailInfo.depositAccount
                  ? this.state.monthDetailInfo.depositAccount.map(info => {
                      return (
                        <tr key={shortid.generate()}>
                          <td>{info.bankName}</td>
                          <td>{info.bankAccountNo}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              최근 1년 가스 사용량 추이
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ResponsiveContainer height={300}>
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
                <Bar
                  dataKey="useAmt"
                  yAxisId="right"
                  barSize={20}
                  fill="#413ea0"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(ChargeRateMonthSearch);
