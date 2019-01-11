import React from 'react';
import { Table } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class ImageScrollPage extends React.Component {
  pageSize = 10;
  page = 1;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalCount: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if (window.scrollY + window.innerHeight + 50 > document.body.clientHeight) {
      if (this.state.data.length < this.state.totalCount) {
        Api.get('tableScroll', {
          params: {
            page: this.page,
            pageSize: this.pageSize
          }
        }).then(result => {
          this.page = this.page + 1;
          this.setState({
            data: this.state.data.concat(result.data.data),
            totalCount: result.data.totalCount
          });
        });
      }
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('TableScrollPage');
    Api.get('tableScroll', {
      params: {
        page: this.page,
        pageSize: this.pageSize
      }
    }).then(result => {
      this.setState({
        data: result.data.data,
        totalCount: result.data.totalCount
      });
    });
    this.page = this.page + 1;
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    let resultComponent = this.state.data.map(info => {
      return (
        <tr key={info.id}>
          <td>{info.id}</td>
          <td>{info.name}</td>
        </tr>
      );
    });
    return (
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>{resultComponent}</tbody>
      </Table>
    );
  }
}

export default ImageScrollPage;
