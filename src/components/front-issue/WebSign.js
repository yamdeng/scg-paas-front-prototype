import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from 'reactstrap';
import Logger from '../../utils/Logger';

@withRouter
@inject('appStore')
@observer
class WebSign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signCanvasRef = React.createRef();
    this.clear = this.clear.bind(this);
    this.save = this.save.bind(this);
  }

  clear() {
    let signCanvas = this.signCanvasRef.current;
    signCanvas.clear();
  }

  save() {
    let signCanvas = this.signCanvasRef.current;
    alert('base64 : ' + signCanvas.toDataURL());
    Logger.info('base64 : ' + signCanvas.toDataURL());
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('WebSign');
  }

  render() {
    return (
      <React.Fragment>
        <div
          id="sign-canvas"
          style={{ border: '1px solid black', marginTop: 80 }}
        >
          <SignatureCanvas
            penColor="green"
            canvasProps={{
              className: 'sigCanvas'
            }}
            ref={this.signCanvasRef}
          />
        </div>
        <div>
          <Button color="primary" onClick={this.clear}>
            취소
          </Button>{' '}
          <Button color="primary" onClick={this.save}>
            저장
          </Button>{' '}
        </div>
      </React.Fragment>
    );
  }
}

export default WebSign;
