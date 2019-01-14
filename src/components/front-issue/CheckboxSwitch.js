import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Button } from 'reactstrap';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class CheckboxSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noneFormData: {
        isPush: true,
        isEvent: false
      },
      formData: {
        isPush: true,
        isEvent: false
      }
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.submit1 = this.submit1.bind(this);
    this.submit2 = this.submit2.bind(this);
  }

  handleChange1(name, event) {
    let noneFormData = this.state.noneFormData;
    noneFormData[name] = event.target.checked;
    this.setState({ noneFormData: noneFormData });
  }

  handleChange2(name, event) {
    let formData = this.state.formData;
    formData[name] = event.target.checked;
    this.setState({ formData: formData });
  }

  submit1() {
    Api.post('formJson', this.state.noneFormData).then(result =>
      alert('data : ' + JSON.stringify(result.data))
    );
  }

  submit2() {
    Api.post('formJson', this.state.formData).then(result =>
      alert('data : ' + JSON.stringify(result.data))
    );
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('체크박스 스위치');
  }

  render() {
    return (
      <React.Fragment>
        <div>
          none check box
          <FormControl component="fieldset" style={{ marginLeft: 10 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.noneFormData.isPush}
                    onChange={event => this.handleChange1('isPush', event)}
                    value="isPush"
                  />
                }
                label="기본 Push 알림 수신"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.noneFormData.isEvent}
                    onChange={event => this.handleChange1('isEvent', event)}
                    value="isEvent"
                  />
                }
                label="혜택 알림 수신"
              />
            </FormGroup>
          </FormControl>
          <Button color="primary" size="lg" block onClick={this.submit1}>
            none 전송
          </Button>
        </div>
        <div>
          form check box
          <form>
            <input
              type="checkbox"
              name="isPush"
              checked={this.state.formData.isPush}
              onChange={event => this.handleChange2('isPush', event)}
            />
            <input
              type="checkbox"
              name="isEvent"
              checked={this.state.formData.isEvent}
              onChange={event => this.handleChange2('isEvent', event)}
            />
          </form>
          <Button color="primary" size="lg" block onClick={this.submit2}>
            form 전송
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckboxSwitch;
