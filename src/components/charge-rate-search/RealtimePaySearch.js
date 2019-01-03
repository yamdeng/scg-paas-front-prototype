import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Api from '../../utils/Api';
import Config from '../../config/Config';

class RealtimePaySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realtimePayInfos: []
    };
  }

  componentDidMount() {
    Api.get('realtimePayInfo/' + Config.contractNo).then(result => {
      this.setState({
        realtimePayInfos: result.data.realtimePayInfos
      });
    });
  }

  render() {
    return (
      <div>
        <List>
          {this.state.realtimePayInfos.map(info => {
            return (
              <React.Fragment>
                <ListItem button>
                  <ListItemText primary="카드번호" secondary={info.cardNo} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="결재일" secondary={info.payDate} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText
                    primary="결재금액"
                    secondary={info.totalPayAmt.toLocaleString()}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </div>
    );
  }
}

export default RealtimePaySearch;
