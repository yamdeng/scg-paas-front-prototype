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
    this.state = {
      percent: 0,
      fileUrl: null,
      beforeFileUrl: null,
      fileObject: null
    };
    this.onChange = this.onChange.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.sendServer = this.sendServer.bind(this);
  }

  onUploadProgress(event) {
    let percent = (event.loaded / event.total) * 100;
    this.setState({ percent: percent });
  }

  onChange(event) {
    let formData = new FormData();
    let file = event.target.files[0];
    let fileReader = new FileReader();
    formData.append('imageFile', file);
    this.setState({ fileObject: file });
    if (file.type.match('image')) {
      fileReader.onload = () => {
        this.setState({ beforeFileUrl: fileReader.result });
      };
      fileReader.readAsDataURL(file);
    }
  }

  sendServer() {
    let config = {
      onUploadProgress: this.onUploadProgress
    };
    let formData = new FormData();
    formData.append('imageFile', this.state.fileObject);
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
        <input
          type="file"
          name="sign"
          id="sign"
          title="camera1"
          capture="camera"
          onChange={this.onChange}
        />
        <input
          type="file"
          name="sign2"
          id="sign2"
          title="camera2"
          onChange={this.onChange}
        />
        <br />
        <div className="text-center">{this.state.percent}%</div>
        <Progress value={this.state.percent} />
        이전 이미지
        <img
          src={this.state.beforeFileUrl}
          style={{ width: 200, height: 200 }}
          alt=" beforeimage"
        />
        <br />
        전송된 이미지
        <img
          src={this.state.fileUrl}
          style={{ width: 200, height: 200 }}
          alt="uploadimage"
        />
        <br />
        <button onClick={this.sendServer}>전송</button>
      </div>
    );
  }
}

export default FileUpload;
