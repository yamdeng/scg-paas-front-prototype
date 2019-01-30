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
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(contents) {
    this.setState({ data: contents });
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
      </div>
    );
  }
}

export default SummerEditorTest;
