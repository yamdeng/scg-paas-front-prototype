/* global database */

import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import shortid from 'shortid';
import classNames from 'classnames';
import Logger from '../../utils/Logger';

@withRouter
@inject('appStore')
@observer
class Firebase extends React.Component {
  pageSize = 10;
  constructor(props) {
    super(props);
    this.state = { isTablePagination: false, totalCount: 0, errorLogInfos: [] };
    this.addBatch = this.addBatch.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.getDataAll = this.getDataAll.bind(this);
    this.deleteErrorInfoLog = this.deleteErrorInfoLog.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getDataFilterByPlatform = this.getDataFilterByPlatform.bind(this);
    this.getDataFilterByContent = this.getDataFilterByContent.bind(this);
  }

  addBatch() {
    let loginId = 'yamdeng';
    for (let index = 0; index < 100; index++) {
      let newData = {};
      newData.uuid = shortid.generate();
      newData.loginId = loginId + (index + 1);
      if (index % 2 === 0) {
        newData.platform = 'android';
        newData.errorMessage =
          'yamdeng android error huhuhu hohoho : stack=asdasd123123';
      } else {
        newData.platform = 'ios';
        newData.errorMessage =
          'yamdeng ios error kukuku kokoko : stack=dfgdfgdfg35345';
      }
      database
        .collection('errorLog')
        .doc(newData.uuid)
        .set(newData)
        .then(() => {
          Logger.log('Document successfully written!');
        })
        .catch(error => {
          Logger.error('Error writing document: ', error);
        });
    }
  }

  deleteAll() {
    database
      .collection('errorLog')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          database
            .collection('errorLog')
            .doc(doc.id)
            .delete();
        });
      });
  }

  getDataAll() {
    database
      .collection('errorLog')
      .get()
      .then(querySnapshot => {
        let updateErrorLogInfos = [];
        let totalCount = querySnapshot.size;
        Logger.info('totalCount : ' + totalCount);
        querySnapshot.forEach(doc => {
          updateErrorLogInfos.push(doc.data());
        });
        this.setState({
          errorLogInfos: updateErrorLogInfos,
          isTablePagination: false,
          totalCount: totalCount
        });
      });
  }

  getDataFilterByPlatform() {
    database
      .collection('errorLog')
      .where('platform', '==', 'ios')
      .limit(10)
      .get()
      .then(querySnapshot => {
        let updateErrorLogInfos = [];
        let totalCount = querySnapshot.size;
        Logger.info('totalCount : ' + totalCount);
        querySnapshot.forEach(doc => {
          updateErrorLogInfos.push(doc.data());
        });
        this.setState({
          errorLogInfos: updateErrorLogInfos,
          isTablePagination: false,
          totalCount: totalCount
        });
      });
  }

  getDataFilterByContent() {}

  deleteErrorInfoLog(id) {
    database
      .collection('errorLog')
      .doc(id)
      .delete()
      .then(() => {
        this.refresh();
      });
  }

  refresh() {
    this.getDataAll();
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('Firebase');
  }

  render() {
    return (
      <div>
        <div>
          <Button color="primary" onClick={this.addBatch}>
            테스트 데이터 넣기
          </Button>{' '}
          <Button color="primary" onClick={this.deleteAll}>
            테스트 데이터 삭제
          </Button>{' '}
          <Button color="primary" onClick={this.getDataAll}>
            데이터 가져오기
          </Button>{' '}
          <Button color="primary" onClick={this.getDataFilterByPlatform}>
            filter로 데이터 가져오기(플랫폼)
          </Button>{' '}
          <Button color="primary" onClick={this.getDataFilterByContent}>
            filter로 데이터 가져오기(내용검색)
          </Button>{' '}
        </div>
        <h3>firebase table</h3>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">index</th>
              <th scope="col">id</th>
              <th scope="col">로그인 ID</th>
              <th scope="col">디바아스종류</th>
              <th scope="col">에러메시지</th>
            </tr>
          </thead>
          <tbody>
            {this.state.errorLogInfos.map((errorLogInfo, index) => {
              return (
                <tr>
                  <td
                    onClick={() => this.deleteErrorInfoLog(errorLogInfo.uuid)}
                  >
                    {index + 1}
                  </td>
                  <td>{errorLogInfo.uuid}</td>
                  <td>{errorLogInfo.loginId}</td>
                  <td>{errorLogInfo.platform}</td>
                  <td>{errorLogInfo.errorMessage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 테이블 페이징 */}
        <nav
          aria-label="..."
          className={classNames({ none: !this.state.isTablePagination })}
        >
          <ul class="pagination">
            <li class="page-item active" aria-current="page">
              <span class="page-link">
                1<span class="sr-only">(current)</span>
              </span>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Firebase;
