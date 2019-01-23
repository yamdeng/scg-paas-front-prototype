import React from 'react';
import HOC from '../../../utils/HOC';

@HOC.withRender
@HOC.withRender2
class HocChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>HocChild</div>;
  }
}

export default HocChild;
