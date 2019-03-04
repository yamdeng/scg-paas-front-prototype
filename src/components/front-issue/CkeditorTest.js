import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
import { Button } from 'reactstrap';
import Logger from '../../utils/Logger';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class CkeditorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: '', serverData: null };
    this.onUploadRequest = this.onUploadRequest.bind(this);
    this.onUploadResponse = this.onUploadResponse.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onEditorAfterPaste = this.onEditorAfterPaste.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  reset() {
    this.setState({ data: null });
  }

  save() {
    let data = this.state.data;
    Api.post('editor/ckEditorData', { data: data }).then(result =>
      this.refresh()
    );
  }

  refresh() {
    Api.get('editor/ckEditorData').then(result => {
      let data = result.data.data;
      Logger.info('result.data : ' + result.data);
      this.setState({ data: data, serverData: data });
    });
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
    this.refresh();
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
        <div>
          <Button color="primary" onClick={this.reset}>
            취소
          </Button>{' '}
          <Button color="primary" onClick={this.save}>
            저장
          </Button>{' '}
        </div>
        <div dangerouslySetInnerHTML={{ __html: this.state.serverData }} />
      </div>
    );
  }
}

export default CkeditorTest;
