import React from 'react';
import { observer, inject } from 'mobx-react';
import Logger from '../../../utils/Logger';
import ListDetail from './ListDetail';
import HOC from '../../../utils/HOC';

@inject('appStore', 'frontIssueStore')
@observer
class UlComponentStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    Logger.info('UlComponentStore constructor call : ' + props.list.length);
  }

  componentDidMount() {
    Logger.info(
      'UlComponentStore componentDidMount call : ' + this.props.list.length
    );
  }

  render() {
    Logger.info('UlComponentStore list render : ' + this.props.list.length);
    return (
      <div>
        {this.props.frontIssueStore.arrayTest.map(info => {
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

export default HOC.withRender(UlComponentStore);
