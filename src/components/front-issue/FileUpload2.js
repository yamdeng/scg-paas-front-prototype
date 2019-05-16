import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

@withRouter
@inject('appStore')
@observer
class FileUpload2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileObject: null,
      resultInfo: '',
      fileName: ''
    };
    this.onChange = this.onChange.bind(this);
    this.sendServer = this.sendServer.bind(this);
    this.file1Ref = React.createRef();
    this.file2Ref = React.createRef();
    this.clickInputFile = this.clickInputFile.bind(this);
  }

  onChange(event) {
    let file = event.target.files[0];
    this.setState({ fileObject: file, fileName: file.name });
  }

  sendServer() {
    let formData = new FormData();
    formData.append('imageFile', this.state.fileObject);
    formData.append('name', 'yamdeng');
    axios.post('/api/front/uploadImageAjaxForm', formData, {}).then(result => {
      this.setState({ resultInfo: result.data });
    });
  }

  clickInputFile(inputName) {
    if (inputName === 'file1') {
      this.file1Ref.current.click();
    } else {
      this.file2Ref.current.click();
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('FileUpload2');
  }

  render() {
    /*

      [file1 open] 버튼 클릭시 input file의 capture="camera" 속성으로 오픈되고 [전송] 버튼 클릭시 "전송결과값"에 값이 셋팅되면 성공
      [file2 open] 버튼 클릭시 input file의 capture="gallery" 속성으로 오픈되고 [전송] 버튼 클릭시 "전송결과값"에 값이 셋팅되면 성공

    */
    return (
      <div>
        <h1>FileUpload</h1>
        <input
          ref={this.file1Ref}
          type="file"
          name="sign"
          id="sign"
          title="camera1"
          capture="camera"
          onChange={this.onChange}
          style={{ width: 0, height: 0 }}
        />
        <input
          ref={this.file2Ref}
          type="file"
          name="sign2"
          id="sign2"
          title="camera2"
          capture="gallery"
          onChange={this.onChange}
          style={{ width: 0, height: 0 }}
        />
        <p>전송결과값 : {JSON.stringify(this.state.resultInfo)}</p>
        <div>
          {this.state.resultInfo ? (
            <a
              href={
                'http://ec2-3-0-184-167.ap-southeast-1.compute.amazonaws.com:3000' +
                this.state.resultInfo.fileUrl
              }
            >
              다운로드
            </a>
          ) : null}
        </div>
        <br />
        <p>
          <button onClick={() => this.clickInputFile('file1')}>
            file1 open
          </button>{' '}
          : {this.state.fileName}
        </p>
        <p>
          <button onClick={() => this.clickInputFile('file2')}>
            file2 open
          </button>{' '}
          : {this.state.fileName}
        </p>
        <button onClick={this.sendServer}>전송</button>
      </div>
    );
  }
}

export default FileUpload2;
