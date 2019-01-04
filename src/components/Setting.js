import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

@withRouter
@inject('appStore')
@observer
class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPush: true,
      isEvent: false,
      isSync: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, event) {
    this.setState({ [name]: event.target.checked });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('설정');
  }

  render() {
    return (
      <FormControl component="fieldset" style={{ marginLeft: 10 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.isPush}
                onChange={event => this.handleChange('isPush', event)}
                value="isPush"
              />
            }
            label="기본 Push 알림 수신"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.isEvent}
                onChange={event => this.handleChange('isEvent', event)}
                value="isEvent"
              />
            }
            label="혜택 알림 수신"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.isSync}
                onChange={event => this.handleChange('isSync', event)}
                value="isSync"
              />
            }
            label="자동 동기화 여부"
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default Setting;
