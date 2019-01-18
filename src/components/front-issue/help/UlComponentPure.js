import React from 'react';
import { observer } from 'mobx-react';
import Logger from '../../../utils/Logger';
import ListDetail from './ListDetail';

@observer
class UlComponentPure extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('UlComponentPure constructor call : ' + props.list.length);
  }

  componentDidMount() {
    Logger.info(
      'UlComponentPure componentDidMount call : ' + this.props.list.length
    );
  }

  render() {
    Logger.info('UlComponentPure list render : ' + this.props.list.length);
    return (
      <div>
        {this.props.list.map(info => {
          return (
            <ListDetail
              key={info.id}
              id={info.id}
              name={info.name}
              color={info.color}
            />
          );
        })}
      </div>
    );
  }
}

export default UlComponentPure;
