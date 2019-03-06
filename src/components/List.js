import React from 'react';

import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import logo from '../logo.svg';
import { Helmet } from 'react-helmet';
import { Table } from 'reactstrap';

@withRouter
@observer
class List extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>List</title>
        </Helmet>
        <img src={logo} className="App-logo" alt="logo" />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name 1</th>
              <th>Last Name 2</th>
              <th>Username 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1 123123</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
          <h1>HUHUHUH</h1>
        </Table>
      </div>
    );
  }
}

export default List;
