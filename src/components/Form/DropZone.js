import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import WarningParagraph from '../Shared/WarningParagraph';

class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tooMuchSizeFile: false};
    this.onDrop = this.onDrop.bind(this);
    this.hideDragDropArea = this.hideDragDropArea.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.hideDragDropArea)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideDragDropArea)
  }

  hideDragDropArea(e) {
    if (e.target.closest('#dropzone') === null) this.props.hideDragDropArea();
  }

  onDrop(file) {
    const MAX_SIZE_FILE = 5242880;
    if (file[0].size > MAX_SIZE_FILE) {
      this.setState({tooMuchSizeFile: true});
      return;
    }
    this.setState({tooMuchSizeFile: false});
    this.props.onDrop(file);
  }

	render() {
    const acceptFilesMessage = <div className='dropzone__message'>
      <h2 className='dropzone__title'>Бросайте сюда файлы, я ловлю</h2>
      <p className='dropzone__paragraph'>Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. Размеры файла до 5 МБ</p>
    </div>;
	  return (
	  	<Dropzone onDrop={this.onDrop} noClick noKeyboard>
        {({getRootProps, getInputProps}) => (
          <div id='dropzone' {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            {this.state.tooMuchSizeFile ? <WarningParagraph
              mixClass='dropzone__warning-paragraph'
              message='Слишком большой размер файла. Размер файл не должен превышать 5 Mb.'/> : acceptFilesMessage}
          </div>
        )}
      </Dropzone>
	  );
  }
}

DropZone.propTypes = {
  onDrop: PropTypes.func,
  hideDragDropArea: PropTypes.func
};

export default DropZone;