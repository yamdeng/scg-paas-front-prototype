import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import { Button } from 'reactstrap';
import Api from '../../utils/Api';

const checkValidation = function(inputData) {
  let validResult = { isValid: true, errorMessage: '' };
  let inputValue = inputData.value;
  if (inputData.touched) {
    if (inputData.isRequired) {
      if (!inputValue) {
        validResult.isValid = false;
        validResult.errorMessage = '필수값입니다';
        return validResult;
      }
    }
    if (inputData.isNumber) {
      if (isNaN(inputValue)) {
        validResult.isValid = false;
        validResult.errorMessage = '숫자가 아닙니다';
        return validResult;
      }
    }
  }
  return validResult;
};

@withRouter
@inject('appStore', 'companyStore')
@observer
class FormValidation extends React.Component {
  constructor(props) {
    super(props);
    let formData = {};
    formData.textInput = {
      touched: false,
      isRequired: true,
      isValid: true,
      errorMessage: '',
      value: null
    };
    formData.textInput2 = {
      touched: false,
      isRequired: true,
      isValid: true,
      errorMessage: '',
      value: null
    };
    this.state = { formData: formData };
    this.textInputRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.refreshDisplayValidation = this.refreshDisplayValidation.bind(this);
    this.onBlur = this.onBlur.bind(this);

    /*

      <form> tag에 넣지 않음. 
      id와 name을 동일하게 가져간다


      1.isRequired
      2.touched(dirty)
      3.max
      4.min
      5.maxLength
      6.minLegnth
      7.pattern
      8.number
      9.focus
      10.valid
      11.errorMessage
      12.value
      13.whitelist: ['alligator', 'crocodile']

      1.text
      2-1.number
      2-2.text number
      3.email
      3-1.email
      3-2.pattern
      4.max(number)
      5.min(number)
      6.maxLength

    */
  }

  handleInputChange(event) {
    let inputName = event.target.name;
    let inputValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    let updateFormData = update(this.state.formData, {
      [inputName]: {
        $merge: { value: inputValue }
      }
    });
    this.setState({ formData: updateFormData });
  }

  onBlur(event, inputName) {
    let inputData = this.state.formData[inputName];
    inputData.touched = true;
    let validResult = checkValidation(inputData);
    let updateFormData = update(this.state.formData, {
      [inputName]: {
        $merge: {
          touched: true,
          errorMessage: validResult.errorMessage,
          isValid: validResult.isValid
        }
      }
    });
    this.setState({ formData: updateFormData });
  }

  refreshDisplayValidation() {}

  componentDidMount() {
    this.props.appStore.changeHeadTitle('FormValidation');
  }

  render() {
    return (
      <div style={{ marginTop: 90 }}>
        {/* textInput */}
        <div>
          textInput :{' '}
          <input
            type="text"
            id="textInput"
            name="textInput"
            ref={this.textInputRef}
            value={this.state.formData.textInput.value}
            onChange={event => this.handleInputChange(event, 'textInput')}
            onBlur={event => this.onBlur(event, 'textInput')}
            placeholder="text 인풋"
            required
          />
          {this.state.formData.textInput.errorMessage ? (
            <div className="validation-warning">
              {this.state.formData.textInput.errorMessage}
            </div>
          ) : null}
        </div>
        {/* textInput2 */}
        <div>
          textInput2 :{' '}
          <input
            type="text"
            id="textInput2"
            name="textInput2"
            ref={this.textInput2Ref}
            value={this.state.formData.textInput2.value}
            onChange={event => this.handleInputChange(event, 'textInput2')}
            onBlur={event => this.onBlur(event, 'textInput2')}
            placeholder="text 인풋2"
            required
          />
          {this.state.formData.textInput2.errorMessage ? (
            <div className="validation-warning">
              {this.state.formData.textInput2.errorMessage}
            </div>
          ) : null}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button color="primary" onClick={this.reset}>
            취소
          </Button>{' '}
          <Button color="primary" onClick={this.save}>
            저장
          </Button>{' '}
        </div>
      </div>
    );
  }
}

export default FormValidation;
