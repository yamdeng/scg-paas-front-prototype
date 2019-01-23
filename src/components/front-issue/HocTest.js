import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import HOC from '../../utils/HOC';
import HocChild from './help/HocChild';

@withRouter
@inject('appStore')
@observer
class HocTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('HocTest');
  }

  render() {
    return (
      <div>
        <HocChild />
      </div>
    );
  }
}

// export default HOC.withRender(HocTest);
export default HocTest;
