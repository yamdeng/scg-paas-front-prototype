import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import { Button } from 'reactstrap';
import _ from 'lodash';

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

    if (inputData.maxLength) {
      if (inputValue && inputValue.length > inputData.maxLength) {
        validResult.isValid = false;
        validResult.errorMessage =
          '입력값을 초과하였습니다(' + inputData.maxLength + '자리)';
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
  checkInputNames = ['textInput', 'textNumberInput'];
  constructor(props) {
    super(props);
    let formData = {};
    formData.textInput = {
      inputName: 'textInput',
      touched: false,
      isRequired: true,
      isValid: true,
      errorMessage: '',
      value: null,
      maxLength: 5
    };
    formData.textNumberInput = {
      inputName: 'textNumberInput',
      touched: false,
      isRequired: true,
      isNumber: true,
      isValid: true,
      errorMessage: '',
      value: null
    };
    this.state = { formData: formData };
    this.textInputRef = React.createRef();
    this.textNumberInputRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.refreshDisplayValidation = this.refreshDisplayValidation.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.save = this.save.bind(this);

    /*
      
      -input type="text" maxLength
      -input type="number" max, min
      -pattern : email, phone(3, 3, 4), 숫자와 자릿수
      -whitelist: ['alligator', 'crocodile']
      -message를 custom하게 셋팅할수 있도록 수정ㅇ

    */
  }

  save() {
    if (this.refreshDisplayValidation()) {
      alert('save true');
    } else {
      alert('save false');
    }
    let inputKeys = _.keys(this.state.formData);
    let sendFormData = {};
    inputKeys.forEach(key => {
      sendFormData[key] = this.state.formData[key].value;
    });
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
    let updateInputData = update(inputData, {
      $merge: {
        touched: true,
        errorMessage: validResult.errorMessage,
        isValid: validResult.isValid
      }
    });
    let updateFormData = update(this.state.formData, {
      $merge: {
        [inputName]: updateInputData
      }
    });
    this.setState({ formData: updateFormData });
  }

  refreshDisplayValidation() {
    let validationFormData = _.cloneDeep(this.state.formData);
    let firstErrorInputData = null;
    let successValidation = true;
    this.checkInputNames.forEach(inputName => {
      let inputData = validationFormData[inputName];
      inputData.touched = true;
      let validResult = checkValidation(inputData);
      inputData.errorMessage = validResult.errorMessage;
      inputData.isValid = validResult.isValid;
      if (!firstErrorInputData && !inputData.isValid) {
        firstErrorInputData = inputData;
        successValidation = false;
      }
    });
    if (firstErrorInputData) {
      alert('errorMessage : ' + firstErrorInputData.errorMessage);
      this[firstErrorInputData.inputName + 'Ref'].current.focus();
    }
    this.setState({ formData: validationFormData });
    return successValidation;
  }

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
        {/* textNumberInput */}
        <div>
          textNumberInput :{' '}
          <input
            type="text"
            id="textNumberInput"
            name="textNumberInput"
            ref={this.textNumberInputRef}
            value={this.state.formData.textNumberInput.value}
            onChange={event => this.handleInputChange(event, 'textNumberInput')}
            onBlur={event => this.onBlur(event, 'textNumberInput')}
            placeholder="text number 인풋"
            required
          />
          {this.state.formData.textNumberInput.errorMessage ? (
            <div className="validation-warning">
              {this.state.formData.textNumberInput.errorMessage}
            </div>
          ) : null}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button color="primary" onClick={this.refreshDisplayValidation}>
            validation
          </Button>{' '}
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
