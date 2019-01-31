import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Helper from '../../utils/Helper';

@withRouter
@inject('appStore')
@observer
class ClipCopyTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bankName: '우리은행', accountNumber: '123123' };
    this.copyClipboard = this.copyClipboard.bind(this);
  }

  copyClipboard() {
    $('#clipcopy').val(this.state.bankName + ' | ' + this.state.accountNumber);
    Helper.copyToClipboard('clipcopy');
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ClipCopyTest');
  }

  render() {
    return (
      <div onClick={this.copyClipboard}>
        ClipCopyTest
        <textarea
          id="clipcopy"
          type="text"
          value=""
          style={{
            display: 'block',
            opacity: 0,
            width: '0px',
            height: '0px'
          }}
        />
      </div>
    );
  }
}

export default ClipCopyTest;
