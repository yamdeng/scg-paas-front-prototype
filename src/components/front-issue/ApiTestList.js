import React from 'react';
import { Table } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import Config from '../../config/Config';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class ApiTestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ApiTestList');
    this.search();
  }

  search() {
    Api.get('board').then(result => {
      this.setState({ data: result.data });
    });
  }

  reload() {
    this.search();
  }

  render() {
    let resultComponent = this.state.data.map(info => {
      return (
        <tr key={info.id}>
          <td>{info.id}</td>
          <td>{info.title}</td>
          <td>
            <Link to={'/api-detail?id=' + info.id}>{info.content}</Link>
          </td>
          <td>{moment(info.created).format(Config.dateDisplayFormat)}</td>
          <td>{moment(info.lastModified).format(Config.dateDisplayFormat)}</td>
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

export default ApiTestList;
