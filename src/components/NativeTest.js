import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class NativeTest extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ marginTop: 70, padding: 10 }}>
        <Button variant="contained" color="primary">
          디바이스 정보
        </Button>{' '}
        <Button variant="contained" color="primary">
          GPS 정보
        </Button>{' '}
        <Button variant="contained" color="primary">
          카메라
        </Button>{' '}
        <Button variant="contained" color="primary">
          버전 전송
        </Button>
      </div>
    );
  }
}

export default NativeTest;
