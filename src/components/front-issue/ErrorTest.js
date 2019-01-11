import React from 'react';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class ErrorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.callErrorApi = this.callErrorApi.bind(this);
  }

  callErrorApi(url) {
    Api.get(url);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ErrorTest');
  }

  render() {
    return (
      <div style={{ marginTop: 70, padding: 10 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.callErrorApi('errorClientCode')}
        >
          클라이언트 에러 코드
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.callErrorApi('errorAuthCode')}
        >
          권한 에러 코드
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.callErrorApi('errorServerCode')}
        >
          서버 에러 코드
        </Button>
        {/* {실제 에러} */}
        <br />
        <div style={{ marginTop: 20 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.callErrorApi('errorClient')}
        >
          클라이언트 에러
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.callErrorApi('errorAuth')}
        >
          권한 에러
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.callErrorApi('errorServer')}
        >
          서버 에러
        </Button>
      </div>
    );
  }
}

export default ErrorTest;
