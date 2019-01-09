import React from 'react';

class InnerTextComponent2 extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    console.log('InnerTextComponent2 constructor call');
  }

  componentDidMount() {
    // eslint-disable-next-line
    console.log('InnerTextComponent2 componentDidMount call');
  }

  render() {
    // eslint-disable-next-line
    console.log('InnerTextComponent2 render call');
    return <p>{this.props.text}</p>;
  }
}

export default InnerTextComponent2;
