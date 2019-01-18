import React from 'react';
import Logger from '../../../utils/Logger';
import { observer } from 'mobx-react';

@observer
class ListDetailPure extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('ListDetailPure constructor call : ' + props.id);
  }

  componentDidMount() {
    Logger.info('ListDetailPure componentDidMount call : ' + this.props.id);
  }

  render() {
    Logger.info('ListDetailPure render call : ' + this.props.id);
    return (
      <li style={{ color: this.props.color ? this.props.color : '' }}>
        {this.props.id + ' : ' + this.props.name}
      </li>
    );
  }
}

export default ListDetailPure;
