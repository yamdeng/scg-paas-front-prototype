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
    // this.props.history.push('code-split');
    // Api.get(url).then(() => {
    //   // this.props.history.push('code-split');
    //   // history.pushState(null, '코드분류', '#/code-split');
    // });
    // history.pushState(null, '코드분류', '#/code-split');
    // this.props.history.push('code-split');
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
      </div>
    );
  }
}

export default ErrorTest;
