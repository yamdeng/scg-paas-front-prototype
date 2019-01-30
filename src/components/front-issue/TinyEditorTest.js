import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

@withRouter
@inject('appStore')
@observer
class TinyEditorTest extends React.Component {
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
    this.props.appStore.changeHeadTitle('TinyEditorTest');
  }

  render() {
    return (
      <div>
        <Editor
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            plugins: 'link image code',
            toolbar:
              'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={this.onEditorChange}
        />
      </div>
    );
  }
}

export default TinyEditorTest;
