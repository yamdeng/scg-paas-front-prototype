import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';

@withRouter
@inject('appStore', 'companyStore')
@observer
class FormTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formData: {} };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.contractNo1Ref = React.createRef();
    this.contractNo2Ref = React.createRef();
    this.contractNo3Ref = React.createRef();
    this.ageRef = React.createRef();
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('FormTest');
  }

  handleInputChange(event, nextInputName, inputMaxLength) {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let updateFormData = update(this.state.formData, {
      $merge: { [inputName]: inputValue }
    });
    if (
      nextInputName &&
      inputValue &&
      inputMaxLength &&
      inputValue.length >= inputMaxLength
    ) {
      this[nextInputName + 'Ref'].current.focus();
    }
    this.setState({ formData: updateFormData });
  }

  render() {
    return (
      <div style={{ marginTop: 90 }}>
        <div>
          계약번호 :{' '}
          <input
            type="text"
            name="contractNo1"
            maxLength={
              this.props.companyStore.configInfo.contractInputFirstSize
            }
            ref={this.contractNo1Ref}
            value={this.state.formData.contractNo1}
            onChange={event =>
              this.handleInputChange(
                event,
                'contractNo2',
                this.props.companyStore.configInfo.contractInputFirstSize
              )
            }
          />{' '}
          {' : '}
          <input
            type="text"
            name="contractNo2"
            maxLength={
              this.props.companyStore.configInfo.contractInputSecondSize
            }
            ref={this.contractNo2Ref}
            value={this.state.formData.contractNo2}
            onChange={event =>
              this.handleInputChange(
                event,
                'contractNo3',
                this.props.companyStore.configInfo.contractInputSecondSize
              )
            }
          />{' '}
          {' : '}
          <input
            type="text"
            name="contractNo3"
            maxLength={
              this.props.companyStore.configInfo.contractInputThirdSize
            }
            ref={this.contractNo3Ref}
            value={this.state.formData.contractNo3}
            onChange={event =>
              this.handleInputChange(
                event,
                'age',
                this.props.companyStore.configInfo.contractInputThirdSize
              )
            }
          />
        </div>
        <div>
          number :{' '}
          <input
            type="number"
            name="age"
            ref={this.ageRef}
            value={this.state.formData.age}
            onChange={event => this.handleInputChange(event)}
          />
        </div>
      </div>
    );
  }
}

export default FormTest;
