import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../../utils/Logger';

@withRouter
@inject('appStore')
@observer
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('FileUpload');
  }
  render() {
    return (
      <div>
        <h1>FileUpload</h1>
      </div>
    );
  }
}

export default FileUpload;
