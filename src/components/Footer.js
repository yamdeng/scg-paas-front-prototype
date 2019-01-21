import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Logger from '../utils/Logger';

// widthRouter는 router가 변경시(history 변경시) 하위 컴포넌트를 재 render를 해야하는 경우에만 선언
// @withRouter
@inject('appStore')
@observer
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    Logger.info('Footer render');
    let bottomMeunStyle = { position: 'fixed', bottom: 0, width: '100%' };
    bottomMeunStyle.display = 'none';
    return (
      <React.Fragment>
        <div style={bottomMeunStyle}>
          <Button color="secondary" size="lg" block style={{ margin: 0 }}>
            하단 메뉴
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
