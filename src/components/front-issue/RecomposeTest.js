import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { lifecycle } from 'recompose';
import { componentDidMount } from '../../utils/LifeCycle';

// @withRouter
// @inject('appStore')
// @observer
class RecomposeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>RecomposeTest</div>;
  }
}

export default componentDidMount(RecomposeTest);

// const basicLifeCycleHoc = lifecycle({
//   componentDidMount() {
//     alert('componentDidMount');
//   }
// });

// export default basicLifeCycleHoc(RecomposeTest);
