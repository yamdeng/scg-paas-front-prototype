import React from 'react';
import { observer } from 'mobx-react';
import Logger from '../../../utils/Logger';

@observer
class ListDetailObjectPure extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('ListDetailObjectPure constructor call : ' + props.info.id);
  }

  componentDidMount() {
    Logger.info(
      'ListDetailObjectPure componentDidMount call : ' + this.props.info.id
    );
  }

  render() {
    Logger.info('ListDetailObjectPure render call : ' + this.props.info.id);
    return <li>{this.props.info.id + ' : ' + this.props.info.name}</li>;
  }
}

export default ListDetailObjectPure;
