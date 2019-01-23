import React from 'react';
import { observer } from 'mobx-react';
import Logger from '../../../utils/Logger';
import shortid from 'shortid';
import HOC from '../../../utils/HOC';

@observer
class ListDetailObjectPure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('ListDetailObjectPure constructor call : ' + props.info.id);
    this.changeInfo = this.changeInfo.bind(this);
  }

  changeInfo() {
    this.props.info.changeInfo({
      id: shortid.generate(),
      name: shortid.generate()
    });
  }

  componentDidMount() {
    Logger.info(
      'ListDetailObjectPure componentDidMount call : ' + this.props.info.id
    );
  }

  render() {
    Logger.info('ListDetailObjectPure render call : ' + this.props.info.id);
    return (
      <li
        style={{ color: this.props.info.color ? this.props.info.color : '' }}
        onClick={this.changeInfo}
      >
        {this.props.info.id + ' : ' + this.props.info.name}
      </li>
    );
  }
}

export default HOC.withRender(ListDetailObjectPure);
