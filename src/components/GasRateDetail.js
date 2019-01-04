import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Api from '../utils/Api';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class GasRateDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle(
      '가스요금 상세 : ' + this.props.match.params.gasId
    );
    Api.get('tariff/' + this.props.match.params.gasId).then(result => {
      this.setState({ data: result.data });
    });
  }

  render() {
    return (
      <ListGroup>
        <ListGroupItem>ID : {this.state.data.id}</ListGroupItem>
        <ListGroupItem>날짜 : {this.state.data.date}</ListGroupItem>
        <ListGroupItem>점검내용 : {this.state.data.content}</ListGroupItem>
      </ListGroup>
    );
  }
}

export default GasRateDetail;
