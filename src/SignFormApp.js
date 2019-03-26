import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Helper from './utils/Helper';

@withRouter
@inject('appStore')
@observer
class SignFormApp extends Component {
  constructor(props) {
    super(props);
    let formId = props.formId;
    let formData = Helper.getInfoByLocalStorage(formId);
    this.state = {
      formData: formData,
      url: document.location.origin + '/signresult.html'
    };
  }

  render() {
    return (
      <div>
        <form
          action="http://ec2-54-180-120-228.ap-northeast-2.compute.amazonaws.com:3000/view/redirect"
          method="post"
        >
          name : <input type="text" name="name" /> <br />
          계좌번호 : <input type="text" name="accountno" /> <br />
          url : <input type="text" name="url" value={this.state.url} /> <br />
          <button type="submit">전송</button>
        </form>
        <p>{JSON.stringify(this.state.formData)}</p>
      </div>
    );
  }
}

export default SignFormApp;
