import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class SummerEditorTest extends React.Component {
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
    this.props.appStore.changeHeadTitle('SummerEditorTest');
    $('#summernote').summernote();
  }

  render() {
    return (
      <div>
        <div id="summernote">Hello Summernote</div>
      </div>
    );
  }
}

export default SummerEditorTest;
