import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class ApiTestDetail extends React.Component {
  detailId = null;
  constructor(props) {
    super(props);
    this.state = { detailData: {} };
    this.reload = this.reload.bind(this);
    this.detailId = this.props.match.params.id;
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ApiTestDetail');
    this.loadDetail();
  }

  loadDetail() {
    Api.get('board/' + this.detailId).then(result => {
      this.setState({ detailData: result.data });
    });
  }

  reload() {
    this.loadDetail();
  }

  delete() {
    Api.delete('board/' + this.detailId).then(result => {
      if (result.data.success) {
        this.props.history.push('/api-list');
      }
    });
  }

  render() {
    return (
      <div>
        <p onClick={this.reload}>id : {this.state.detailData.id}</p>
        <p onClick={this.reload}>title : {this.state.detailData.title}</p>
        <p>content : {this.state.detailData.content}</p>
        <div>
          <button onClick={this.delete}>삭제</button>
          <button>
            <Link to="/api-list">목록으로</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default ApiTestDetail;
