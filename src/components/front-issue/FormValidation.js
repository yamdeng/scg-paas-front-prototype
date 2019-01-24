import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import { Button } from 'reactstrap';
import Api from '../../utils/Api';

@withRouter
@inject('appStore', 'companyStore')
@observer
class FormValidation extends React.Component {
  inputNames = [
    'contractNo1',
    'contractNo2',
    'contractNo3',
    'age',
    'content',
    'paymentPeriod'
  ];
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        paymentKind: '0',
        isApply: false,
        paymentPeriod: ''
      },
      validationRule: {},
      currentFocusFormInputIndex: null,
      beforeFocusFormInputIndex: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.contractNo1Ref = React.createRef();
    this.contractNo2Ref = React.createRef();
    this.contractNo3Ref = React.createRef();
    this.ageRef = React.createRef();
    this.contentRef = React.createRef();
    this.paymentPeriodRef = React.createRef();
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.validation = this.validation.bind(this);
    this.onFocusApplyIndex = this.onFocusApplyIndex.bind(this);
    this.onBlurApplyIndex = this.onBlurApplyIndex.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('FormValidation');
  }

  onFocusApplyIndex(index) {
    if (this.state.currentFocusFormInputIndex !== index) {
      this.setState({
        beforeFocusFormInputIndex: this.state.currentFocusFormInputIndex,
        currentFocusFormInputIndex: index
      });
    }
  }

  onBlurApplyIndex(index) {
    if (
      this.state.beforeFocusFormInputIndex &&
      this.state.currentFocusFormInputIndex === index
    ) {
      this.setState({
        currentFocusFormInputIndex: null,
        beforeFocusFormInputIndex: null
      });
    }
  }

  handleInputChange(event, nextInputName, inputMaxLength) {
    let inputName = event.target.name;
    let inputValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

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

  reset() {
    this.setState({
      formData: {
        paymentKind: '1',
        contractNo1: '',
        contractNo2: '',
        contractNo3: '',
        age: '',
        isApply: false,
        paymentPeriod: '0',
        content: ''
      },
      currentFocusFormInputIndex: null,
      beforeFocusFormInputIndex: null
    });
  }

  save() {
    if (this.validation()) {
      Api.post('formJson', this.state.formData).then(result =>
        alert('data : ' + JSON.stringify(result.data))
      );
    }
  }

  validation() {
    let inputRealDomInfos = this.inputNames.map(inputName => {
      return this[inputName + 'Ref'].current;
    });
    debugger;
    return this.validationAlert();
  }

  validationAlert() {
    return true;
  }

  validationDisplay() {
    return true;
  }

  render() {
    return (
      <div style={{ marginTop: 90 }}>
        <div>
          계약번호 :{' '}
          <input
            type="text"
            name="contractNo1"
            className={
              this.state.currentFocusFormInputIndex === 1 ? 'focus-input' : ''
            }
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
            onFocus={event => this.onFocusApplyIndex(1, event)}
            onBlur={event => this.onBlurApplyIndex(1, event)}
            placeholder="계약번호1"
          />{' '}
          {' : '}
          <input
            type="text"
            name="contractNo2"
            className={
              this.state.currentFocusFormInputIndex === 2 ? 'focus-input' : ''
            }
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
            onFocus={event => this.onFocusApplyIndex(2, event)}
            onBlur={event => this.onBlurApplyIndex(2, event)}
            placeholder="계약번호2"
          />{' '}
          {' : '}
          <input
            type="text"
            name="contractNo3"
            className={
              this.state.currentFocusFormInputIndex === 3 ? 'focus-input' : ''
            }
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
            onFocus={event => this.onFocusApplyIndex(3, event)}
            onBlur={event => this.onBlurApplyIndex(3, event)}
            placeholder="계약번호3"
          />
        </div>
        <div>
          age :{' '}
          <input
            type="number"
            name="age"
            className={
              this.state.currentFocusFormInputIndex === 4 ? 'focus-input' : ''
            }
            ref={this.ageRef}
            value={this.state.formData.age}
            onChange={event => this.handleInputChange(event)}
            onFocus={event => this.onFocusApplyIndex(4, event)}
            onBlur={event => this.onBlurApplyIndex(4, event)}
            placeholder="나이"
            min="1"
            max="10"
          />
        </div>

        <div>
          체크박스 :{' '}
          <input
            type="checkbox"
            name="isApply"
            className={
              this.state.currentFocusFormInputIndex === 5 ? 'focus-input' : ''
            }
            checked={this.state.formData.isApply}
            onChange={event => this.handleInputChange(event)}
          />
        </div>

        <div>
          라디오 :{' '}
          <input
            type="radio"
            name="paymentKind"
            checked={this.state.formData.paymentKind === '0'}
            value="0"
            onChange={event => this.handleInputChange(event)}
          />
          {'   '}
          <input
            type="radio"
            name="paymentKind"
            checked={this.state.formData.paymentKind === '1'}
            value="1"
            onChange={event => this.handleInputChange(event)}
          />
        </div>

        <div>
          선택 :{' '}
          <select
            name="paymentPeriod"
            value={this.state.formData.paymentPeriod}
            ref={this.paymentPeriodRef}
            onChange={event => this.handleInputChange(event)}
            onFocus={event => this.onFocusApplyIndex(5, event)}
            onBlur={event => this.onBlurApplyIndex(5, event)}
            className={!this.state.formData.paymentPeriod ? 'input-empty' : ''}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            <option value="0">일시불</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>
        <div>
          에디터 :{' '}
          <textarea
            name="content"
            value={this.state.formData.content}
            ref={this.contentRef}
            onChange={event => this.handleInputChange(event)}
            onFocus={event => this.onFocusApplyIndex(6, event)}
            onBlur={event => this.onBlurApplyIndex(6, event)}
            placeholder="내용"
          />
        </div>
        <br />
        <div>
          phone :{' '}
          <input
            type="text"
            name="이메일"
            className={
              this.state.currentFocusFormInputIndex === 4 ? 'focus-input' : ''
            }
            ref={this.ageRef}
            value={this.state.formData.age}
            onChange={event => this.handleInputChange(event)}
            onFocus={event => this.onFocusApplyIndex(-1, event)}
            onBlur={event => this.onBlurApplyIndex(-1, event)}
            placeholder="이메일"
            pattern="1"
          />
        </div>
        <div>
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
