import React from 'react';
import { observer, inject } from 'mobx-react';
import Logger from '../../../utils/Logger';
import ListDetail from './ListDetail';

@inject('appStore', 'frontIssueStore')
@observer
class UlComponentStorePure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('UlComponentStorePure constructor call : ' + props.list.length);
  }

  componentDidMount() {
    Logger.info(
      'UlComponentStorePure componentDidMount call : ' + this.props.list.length
    );
  }

  render() {
    Logger.info('UlComponentStorePure list render : ' + this.props.list.length);
    return (
      <div>
        {this.props.frontIssueStore.arrayTest.map(info => {
          return <ListDetail key={info.id} id={info.id} name={info.name} />;
        })}
      </div>
    );
  }
}

export default UlComponentStorePure;
