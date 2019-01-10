import React from 'react';

class InnerTableComponent extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    console.log('InnerTableComponent constructor call');
  }

  componentDidMount() {
    // eslint-disable-next-line
    console.log('InnerTableComponent componentDidMount call');
  }

  render() {
    // eslint-disable-next-line
    console.log('InnerTableComponent render call');
    return <p>{this.props.text}</p>;
  }
}

// const InnerTextComponent = props => {
//   return <p>{props.text + 'hhhhh'}</p>;
// };

export default InnerTableComponent;
