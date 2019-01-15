import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

@withRouter
@inject('appStore')
@observer
class DeviceBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAlert = this.handleAlert.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleAlert() {
    alert('alert call?');
  }

  handleConfirm() {
    if (confirm('confirm call?')) {
      alert('confirm success');
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('다비이스 테스트');
  }

  render() {
    return (
      <div>
        디바이스 테스트
        <form>
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <br />
          <input type="date" />
          <br />
          <input type="time" />
        </form>
        <Button color="primary" size="lg" block onClick={this.handleAlert}>
          alert
        </Button>
        <Button color="primary" size="lg" block onClick={this.handleConfirm}>
          confirm
        </Button>
        <br />
        <p>
          전화 테스트 : <a href="tel:010-7338-4183">1-847-555-5555</a>
        </p>
      </div>
    );
  }
}

export default DeviceBasic;
