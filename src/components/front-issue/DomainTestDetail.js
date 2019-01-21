import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import RestCommonDomain from '../../stores/domain/RestCommonDomain';
import queryString from 'query-string';

@withRouter
@inject('appStore')
@observer
class DomainTestDetail extends React.Component {
  detailId = null;
  constructor(props) {
    super(props);
    this.state = { domain: new RestCommonDomain('board') };
    this.reload = this.reload.bind(this);
    this.detailId = queryString.parse(this.props.location.search).id;
    this.delete = this.delete.bind(this);
    this.goList = this.goList.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('DomainTestDetail');
    this.state.domain.getDetail(this.detailId);
  }

  reload() {
    this.state.domain.getDetail(this.detailId);
  }

  delete() {
    this.state.domain.delete(this.detailId).then(result => {
      if (result.data.success) {
        this.props.history.push('/domain-list');
      }
    });
  }

  goList() {}

  render() {
    return (
      <div>
        <p onClick={this.reload}>id : {this.state.domain.detailData.id}</p>
        <p onClick={this.reload}>
          title : {this.state.domain.detailData.title}
        </p>
        <p>content : {this.state.domain.detailData.content}</p>
        <div>
          <button onClick={this.delete}>삭제</button>
          <button>
            <Link to="/domain-list">목록으로</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default DomainTestDetail;
