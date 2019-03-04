import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import Logger from '../../utils/Logger';
import Api from '../../utils/Api';

@withRouter
@inject('appStore')
@observer
class SummerEditorTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: '', serverData: null };
    this.onEditorChange = this.onEditorChange.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  onEditorChange(contents) {
    this.setState({ data: contents });
  }

  reset() {
    this.setState({ data: null });
  }

  save() {
    let data = this.state.data;
    Api.post('editor/summerNoteEditorData', { data: data }).then(result =>
      this.refresh()
    );
  }

  refresh() {
    Api.get('editor/summerNoteEditorData').then(result => {
      let data = result.data.data;
      Logger.info('result.data : ' + result.data);
      this.setState({ data: data, serverData: data });
    });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('SummerEditorTest');
    $('#summernote').summernote({
      lang: 'ko-KR',
      height: 300,
      width: '100%',
      callbacks: {
        onChange: (contents, $editable) => {
          this.onEditorChange(contents);
        },
        onImageUpload: (files, editor, welEditable) => {
          let formData = new FormData();
          formData.append('imageFile', files[0]);
          $.ajax({
            data: formData,
            type: 'POST',
            url: '/api/front/uploadImage',
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
              $('#summernote').summernote(
                'insertImage',
                data.fileUrl,
                data.fileName
              );
            }
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div id="summernote">Hello Summernote</div>
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

export default SummerEditorTest;
