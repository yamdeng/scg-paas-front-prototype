import React from 'react';
import { Table } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import RestCommonDomain from '../../stores/domain/RestCommonDomain';

@withRouter
@inject('appStore')
@observer
class DomainTestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { domain: new RestCommonDomain('board') };
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('DomainTestList');
    this.state.domain.search();
  }

  reload() {
    this.state.domain.search();
  }

  render() {
    let resultComponent = this.state.domain.data.map(info => {
      return (
        <tr key={info.id}>
          <td>{info.id}</td>
          <td>{info.title}</td>
          <Link to={'/domain-detail?id=' + info.id}>{info.content}</Link>
          <td>{info.title}</td>
          <td>{info.title}</td>
        </tr>
      );
    });
    return (
      <Table>
        <thead onClick={this.reload}>
          <tr>
            <th>id</th>
            <th>제목</th>
            <th>내용</th>
            <th>생성일</th>
            <th>수정일</th>
          </tr>
        </thead>
        <tbody>{resultComponent}</tbody>
      </Table>
    );
  }
}

export default DomainTestList;
