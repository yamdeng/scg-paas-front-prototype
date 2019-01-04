import React from 'react';
import Api from '../utils/Api';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Config from '../config/Config';

const styles = {
  avatar: {
    margin: 10,
    width: 70,
    height: 70
  }
};

@withRouter
@inject('appStore')
@observer
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('프로필');
    Api.get('profile').then(result => {
      this.setState({ data: result.data });
    });
  }

  render() {
    let classes = this.props.classes;
    return (
      <React.Fragment>
        <Grid container justify="center" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
            className={classes.avatar}
          />
        </Grid>
        <ListGroup>
          <ListGroupItem>로그인ID : {this.state.data.loginId}</ListGroupItem>
          <ListGroupItem>이름 : {this.state.data.name}</ListGroupItem>
          <ListGroupItem>계약관리번호 : {Config.contractNo}</ListGroupItem>
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);
