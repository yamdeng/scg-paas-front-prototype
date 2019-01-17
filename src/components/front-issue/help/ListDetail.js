import React from 'react';
import Logger from '../../../utils/Logger';

class ListDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('ListDetail constructor call : ' + props.id);
  }

  componentDidMount() {
    Logger.info('ListDetail componentDidMount call : ' + this.props.id);
  }

  render() {
    Logger.info('ListDetail render call : ' + this.props.id);
    return <li>{this.props.id + ' : ' + this.props.name}</li>;
  }
}

export default ListDetail;
