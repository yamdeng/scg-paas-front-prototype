import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import _ from 'lodash';
import Api from '../../utils/Api';

@withRouter
@inject('appStore', 'companyStore')
@observer
class FormTest2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentKind: '0',
      isApply: false,
      paymentPeriod: '2',
      currentFocusFormInputIndex: null,
      beforeFocusFormInputIndex: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.contractNo1Ref = React.createRef();
    this.contractNo2Ref = React.createRef();
    this.contractNo3Ref = React.createRef();
    this.ageRef = React.createRef();
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.validation = this.validation.bind(this);
    this.onFocusApplyIndex = this.onFocusApplyIndex.bind(this);
    this.onBlurApplyIndex = this.onBlurApplyIndex.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('FormTest2');
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
    if (
      nextInputName &&
      inputValue &&
      inputMaxLength &&
      inputValue.length >= inputMaxLength
    ) {
      this[nextInputName + 'Ref'].current.focus();
    }
    this.setState({ [inputName]: inputValue });
  }

  reset() {
    this.setState({
      paymentKind: '1',
      contractNo1: '',
      contractNo2: '',
      contractNo3: '',
      age: '',
      isApply: false,
      paymentPeriod: '0',
      content: '',
      currentFocusFormInputIndex: null,
      beforeFocusFormInputIndex: null
    });
  }

  save() {
    if (this.validation()) {
      Api.post(
        'formJson',
        _.omit(this.state, [
          'currentFocusFormInputIndex',
          'beforeFocusFormInputIndex'
        ])
      ).then(result => alert('data : ' + JSON.stringify(result.data)));
    }
  }

  validation() {
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
            value={this.state.contractNo1}
            onChange={event =>
              this.handleInputChange(
                event,
                'contractNo2',
                this.props.companyStore.configInfo.contractInputFirstSize
              )
            }
            onFocus={event => this.onFocusApplyIndex(1, event)}
            onBlur={event => this.onBlurApplyIndex(1, event)}
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
            value={this.state.contractNo2}
            onChange={event =>
              this.handleInputChange(
                event,
                'contractNo3',
                this.props.companyStore.configInfo.contractInputSecondSize
              )
            }
            onFocus={event => this.onFocusApplyIndex(2, event)}
            onBlur={event => this.onBlurApplyIndex(2, event)}
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
            value={this.state.contractNo3}
            onChange={event =>
              this.handleInputChange(
                event,
                'age',
                this.props.companyStore.configInfo.contractInputThirdSize
              )
            }
            onFocus={event => this.onFocusApplyIndex(3, event)}
            onBlur={event => this.onBlurApplyIndex(3, event)}
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
            value={this.state.age}
            onChange={event => this.handleInputChange(event)}
            onFocus={event => this.onFocusApplyIndex(4, event)}
            onBlur={event => this.onBlurApplyIndex(4, event)}
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
            checked={this.state.isApply}
            onChange={event => this.handleInputChange(event)}
          />
        </div>

        <div>
          라디오 :{' '}
          <input
            type="radio"
            name="paymentKind"
            checked={this.state.paymentKind === '0'}
            value="0"
            onChange={event => this.handleInputChange(event)}
          />
          {'   '}
          <input
            type="radio"
            name="paymentKind"
            checked={this.state.paymentKind === '1'}
            value="1"
            onChange={event => this.handleInputChange(event)}
          />
        </div>

        <div>
          선택 :{' '}
          <select
            name="paymentPeriod"
            value={this.state.paymentPeriod}
            onChange={event => this.handleInputChange(event)}
            onFocus={event => this.onFocusApplyIndex(5, event)}
            onBlur={event => this.onBlurApplyIndex(5, event)}
          >
            <option value="">선택해주세요</option>
            <option value="0" checked="checked">
              일시불
            </option>
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
            value={this.state.content}
            onChange={event => this.handleInputChange(event)}
            onFocus={event => this.onFocusApplyIndex(6, event)}
            onBlur={event => this.onBlurApplyIndex(6, event)}
          />
        </div>
        <br />
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

export default FormTest2;
