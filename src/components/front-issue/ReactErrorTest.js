import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import AppError from '../../utils/AppError';

@withRouter
@inject('appStore')
@observer
class ReactErrorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { manualError: false };
    this.handleRenderError = this.handleRenderError.bind(this);
    this.handleCoreError = this.handleCoreError.bind(this);
    this.handleAppError = this.handleAppError.bind(this);
  }

  handleRenderError() {
    this.setState({ manualError: true });
  }

  handleCoreError() {
    this.manualTest();
  }

  handleAppError() {
    throw new AppError('app error test');
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ReactErrorTest');
  }

  render() {
    let resultComponent = null;

    if (this.state.manualError) {
      resultComponent = (
        <div>
          <p>asdasdasd{this.props.asdasd.asdasd}</p>
        </div>
      );
    }

    return (
      <div>
        ReactErrorTest
        <br />
        <button onClick={this.handleRenderError}>render error</button>
        <button onClick={this.handleCoreError}>handler core error</button>
        <button onClick={this.handleAppError}>handler custom app error</button>
        <br />
        <div>{resultComponent}</div>
      </div>
    );
  }
}

export default ReactErrorTest;
