import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import shortid from 'shortid';
import Logger from '../utils/Logger';
import Helper from '../utils/Helper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

@withRouter
@inject('appStore')
@observer
class ErrorBoundary extends React.Component {
  queue = [];
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      messageInfo: {}
    };
    this.refreshPage = this.refreshPage.bind(this);
    this.copyToClipboardByTextArea = this.copyToClipboardByTextArea.bind(this);
  }

  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime()
    });
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.processQueue();
    }
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
  };

  copyToClipboardByTextArea(textAreaId) {
    Helper.copyToClipboard(textAreaId);
  }

  componentDidCatch(error, info) {
    let errorObject = {};
    if (error.message) {
      errorObject.message = error.message;
    }
    if (error.stack) {
      errorObject.stack = error.stack;
    }
    if (info && info.componentStack) {
      errorObject.componentStack = info.componentStack;
    }
    this.setState({
      hasError: true,
      errorObject: errorObject
    });
    Logger.error(JSON.stringify(errorObject));
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      const { messageInfo } = this.state;
      let errorObject = this.state.errorObject;
      let errorObjectConvertString = '';
      if (errorObject) {
        errorObjectConvertString = JSON.stringify(errorObject);
      }
      let textAreaId = shortid.generate();
      return (
        <div>
          <textarea
            id={textAreaId}
            value={errorObjectConvertString}
            style={{
              display: 'block',
              opacity: 0,
              width: '0px',
              height: '0px'
            }}
          />
          <Button
            color="primary"
            onClick={event => this.copyToClipboardByTextArea(textAreaId)}
          >
            에러 복사
          </Button>
          <br />
          <Button color="primary" onClick={this.refreshPage}>
            페이지 리프레쉬
          </Button>
        </div>
        // <div>
        //   <Button onClick={this.handleClick('message a')}>
        //     Show message A
        //   </Button>
        //   <Button onClick={this.handleClick('message b')}>
        //     Show message B
        //   </Button>
        //   <Snackbar
        //     key={messageInfo.key}
        //     anchorOrigin={{
        //       vertical: 'bottom',
        //       horizontal: 'left'
        //     }}
        //     open={this.state.open}
        //     autoHideDuration={6000}
        //     onClose={this.handleClose}
        //     onExited={this.handleExited}
        //     ContentProps={{
        //       'aria-describedby': 'message-id'
        //     }}
        //     message={<span id="message-id">{messageInfo.message}</span>}
        //     action={[
        //       <Button
        //         key="undo"
        //         color="secondary"
        //         size="small"
        //         onClick={this.handleClose}
        //       >
        //         UNDO
        //       </Button>,
        //       <IconButton
        //         key="close"
        //         aria-label="Close"
        //         color="inherit"
        //         onClick={this.handleClose}
        //       >
        //         <CloseIcon />
        //       </IconButton>
        //     ]}
        //   />
        // </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
