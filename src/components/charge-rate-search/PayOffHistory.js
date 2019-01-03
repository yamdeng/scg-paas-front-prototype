import React from 'react';
import { Table } from 'reactstrap';
import Api from '../../utils/Api';
import Config from '../../config/Config';

import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import RealtimePaySearch from './RealtimePaySearch';
import shortid from 'shortid';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PayOffHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payOffHistoryInfo: [],
      totalPayOffUseGas: 0,
      totalPayOffChargeAmt: 0,
      totalPayOffDueAmt: 0,
      viewModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ viewModal: true });
  }

  closeModal() {
    this.setState({ viewModal: false });
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
    const classes = this.props.classes;
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
                <tr key={shortid.generate()}>
                  <td onClick={this.openModal}>{info.date}</td>
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

        <Dialog
          fullScreen
          open={this.state.viewModal}
          onClose={this.closeModal}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.closeModal}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                납부 실시간 조회
              </Typography>
            </Toolbar>
          </AppBar>
          <RealtimePaySearch />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PayOffHistory);
