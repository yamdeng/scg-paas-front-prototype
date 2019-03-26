import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../../utils/Logger';
import Helper from '../../utils/Helper';
import shortid from 'shortid';

@withRouter
@inject('appStore')
@observer
class OpenWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: null };
    this.openWindow = this.openWindow.bind(this);
  }

  openWindow() {
    let formId = shortid.generate();
    Helper.saveInfoToLocalStorage(formId, {
      name: 'yamdeng',
      accountno: formId
    });
    window.open('/#/?appType=sign&formId=' + formId);
    $(window).on('message', data => {
      Logger.log('data : ' + JSON.stringify(data.originalEvent.data));
      this.setState({ message: data.originalEvent.data });
    });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('OpenWindow');
  }

  componentWillUnmount() {
    $(window).off('message');
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.openWindow}>
          open window
        </button>
        <p>{JSON.stringify(this.state.message)}</p>
      </div>
    );
  }
}

export default OpenWindow;
