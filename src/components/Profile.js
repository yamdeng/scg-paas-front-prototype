import React from 'react';
import Api from '../utils/Api';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
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
