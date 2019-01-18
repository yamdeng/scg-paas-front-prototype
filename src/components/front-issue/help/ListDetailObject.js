import React from 'react';
import { observer } from 'mobx-react';
import Logger from '../../../utils/Logger';

@observer
class ListDetailObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('ListDetailObject constructor call : ' + props.info.id);
  }

  componentDidMount() {
    Logger.info(
      'ListDetailObject componentDidMount call : ' + this.props.info.id
    );
  }

  render() {
    Logger.info('ListDetail render call : ' + this.props.info.id);
    return (
      <li style={{ color: this.props.info.color ? this.props.info.color : '' }}>
        {this.props.info.id + ' : ' + this.props.info.name}
      </li>
    );
  }
}

export default ListDetailObject;
