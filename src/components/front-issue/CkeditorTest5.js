import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@withRouter
@inject('appStore')
@observer
class CkeditorTest5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.onUploadRequest = this.onUploadRequest.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onEditorAfterPaste = this.onEditorAfterPaste.bind(this);
  }

  onUploadRequest(event) {
    event.data.requestData.imageFile = event.data.requestData.upload;
    delete event.data.requestData.upload;
  }

  onEditorAfterPaste(event) {
    this.setState({ data: event.editor.getData() });
  }

  onEditorChange(event, editor) {
    this.setState({ data: editor.getData() });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('CkeditorTest5');
  }

  render() {
    return (
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={this.state.data}
          onInit={editor => {}}
          onChange={(event, editor) => {
            this.onEditorChange(event, editor);
          }}
        />
      </div>
    );
  }
}

export default CkeditorTest5;
