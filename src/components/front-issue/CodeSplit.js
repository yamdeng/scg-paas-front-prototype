import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import SpliteComponent3 from './help/SpliteComponent3';

@withRouter
@inject('appStore')
@observer
class CodeSplit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoadable: false };
    this.functionSplit = this.functionSplit.bind(this);
    this.componentSplit = this.componentSplit.bind(this);
    this.toggleIsLoadable = this.toggleIsLoadable.bind(this);
  }

  functionSplit() {
    import('./help/SpilteFunction').then(({ default: SpilteFunction }) => {
      SpilteFunction.test1();
      SpilteFunction.test2();
    });
  }

  componentSplit() {
    import('./help/SpliteComponent1').then(({ default: SpliteComponent1 }) => {
      this.setState({
        SpliteComponent1: SpliteComponent1
      });
    });
    import('./help/SpliteComponent2').then(({ default: SpliteComponent2 }) => {
      this.setState({
        SpliteComponent2: SpliteComponent2
      });
    });
  }

  toggleIsLoadable() {
    this.setState({ isLoadable: !this.state.isLoadable });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('CodeSplit2');
  }

  render() {
    const { SpliteComponent1, SpliteComponent2 } = this.state;
    const LoadbleComponent = this.state.isLoadable ? (
      <SpliteComponent3 />
    ) : null;
    return (
      <div>
        <Button color="primary" onClick={this.functionSplit}>
          함수 코드 스플리팅
        </Button>{' '}
        <Button color="primary" onClick={this.componentSplit}>
          함수 코드 스플리팅
        </Button>{' '}
        <Button color="primary" onClick={this.toggleIsLoadable}>
          toggleIsLoadable
        </Button>{' '}
        <br />
        {SpliteComponent1 && <SpliteComponent1 />}
        {SpliteComponent2 && <SpliteComponent2 />}
        {LoadbleComponent}
      </div>
    );
  }
}

export default CodeSplit;
