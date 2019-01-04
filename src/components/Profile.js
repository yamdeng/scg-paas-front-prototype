import React from 'react';
import Api from '../utils/Api';
import { ListGroup, ListGroupItem } from 'reactstrap';

import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

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
    return (
      <ListGroup>
        <ListGroupItem>로그이ID : {this.state.data.loginId}</ListGroupItem>
        <ListGroupItem>이름 : {this.state.data.name}</ListGroupItem>
      </ListGroup>
    );
  }
}

export default Profile;
