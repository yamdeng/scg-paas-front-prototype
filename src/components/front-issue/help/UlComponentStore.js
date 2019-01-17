import React from 'react';
import { observer, inject } from 'mobx-react';
import Logger from '../../../utils/Logger';
import ListDetail from './ListDetail';

@inject('appStore', 'frontIssueStore')
@observer
class UlComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('UlComponent constructor call : ' + props.list.length);
  }

  componentDidMount() {
    Logger.info(
      'UlComponent componentDidMount call : ' + this.props.list.length
    );
  }

  render() {
    Logger.info('UlComponent list render : ' + this.props.list.length);
    return (
      <div>
        {this.props.frontIssueStore.arrayTest.map(info => {
          return <ListDetail key={info.id} id={info.id} name={info.name} />;
        })}
      </div>
    );
  }
}

export default UlComponent;
