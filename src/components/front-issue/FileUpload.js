import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Progress } from 'reactstrap';

@withRouter
@inject('appStore')
@observer
class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { percent: 0, fileUrl: null };
    this.onChange = this.onChange.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this);
  }

  onUploadProgress(event) {
    let percent = (event.loaded / event.total) * 100;
    this.setState({ percent: percent });
  }

  onChange(event) {
    let formData = new FormData();
    formData.append('imageFile', event.target.files[0]);
    let config = {
      onUploadProgress: this.onUploadProgress
    };
    axios.post('/api/front/uploadImage', formData, config).then(result => {
      this.setState({ fileUrl: result.data.fileUrl });
    });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('FileUpload');
  }

  render() {
    return (
      <div>
        <h1>FileUpload</h1>
        <input type="file" onChange={this.onChange} />
        <br />
        <div className="text-center">{this.state.percent}%</div>
        <Progress value={this.state.percent} />
        <img
          src={this.state.fileUrl}
          style={{ width: '100%', height: '100%' }}
          alt="uploadimage"
        />
      </div>
    );
  }
}

export default FileUpload;
