import React from 'react';

class InnerTextComponent extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    console.log('InnerTextComponent constructor call');
  }

  componentDidMount() {
    // eslint-disable-next-line
    console.log('InnerTextComponent componentDidMount call');
  }

  render() {
    // eslint-disable-next-line
    console.log('InnerTextComponent render call');
    return <p>{this.props.text}</p>;
  }
}

// const InnerTextComponent = props => {
//   return <p>{props.text + 'hhhhh'}</p>;
// };

export default InnerTextComponent;
