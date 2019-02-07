import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';

@withRouter
@inject('appStore')
@observer
class CkeditorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.onUploadRequest = this.onUploadRequest.bind(this);
    this.onUploadResponse = this.onUploadResponse.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onEditorAfterPaste = this.onEditorAfterPaste.bind(this);
  }

  onUploadRequest(event) {
    event.data.requestData.imageFile = event.data.requestData.upload;
    delete event.data.requestData.upload;
  }
  onUploadResponse(event) {
    event.stop();
    let data = event.data,
      xhr = data.fileLoader.xhr,
      response = JSON.parse(xhr.responseText);
    data.url = response.fileUrl;
  }

  onEditorAfterPaste(event) {
    this.setState({ data: event.editor.getData() });
  }

  onEditorChange(event) {
    this.setState({ data: event.editor.getData() });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('CkeditorTest');
  }

  render() {
    return (
      <div>
        <CKEditor
          data={this.state.data}
          config={{
            extraPlugins: 'uploadimage,preview',
            filebrowserImageUploadUrl: '/api/front/uploadImage'
            // filebrowserImageUploadUrl: '/api/front/uploadImageCkEditor'
          }}
          onChange={this.onEditorChange}
          onFileUploadRequest={this.onUploadRequest}
          onFileUploadResponse={this.onUploadResponse}
          onEditorAfterPaste={this.onEditorAfterPaste}
        />
      </div>
    );
  }
}

export default CkeditorTest;