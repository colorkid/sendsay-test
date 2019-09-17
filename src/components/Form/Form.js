import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropZone from './DropZone';
import FilesList from './FilesList';
import FieldsList from './FieldsList';
import WarningParagraph from '../Shared/WarningParagraph';
import { checkOnEmptyInput, checkOnValidEmail } from '../../utils/inputValidateUtils';
import { createConvertedFiles, getFilesSize } from '../../utils/fileUtils';
import { addNewMessage, updateMessage } from '../../redux/actions';
import 'sendsay-api';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.initialState;
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.showDragDropArea = this.showDragDropArea.bind(this);
    this.hideDragDropArea = this.hideDragDropArea.bind(this);
  }

  send() {
    if (!this._validateFields()) return false;
    this._connectApi();
    createConvertedFiles(this.state.files).then(result => {
      const data = this._createDateForSend(result);
      this._clearState();
      this.sendsay.request(data).then(res => {
        if (!this._checkIdenticalIds(res['track.id'])) return;
        this.props.addNewMessage({
          id: res['track.id'],
          date: new Date().toLocaleString('ru', {month: 'long', day: 'numeric'}),
          messageSubject: data.letter.subject,
          status: 0
        });
        this._updateStatusMessage(res['track.id']);
      });
    }).catch((e) => {
      console.log(e.message)
    });
  }

  _checkIdenticalIds(id) {
    try {
      if (this.props.messages.find(message => message.id === id) === undefined) {
        return true;
      } else {
        throw new SyntaxError('ERROR: Message with this id already exists');
      }
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  _connectApi() {
    if (this.sendsay) return;
    this.sendsay = new Sendsay({
      apiUrl: 'https://api.sendsay.ru/clu180',
      auth: {login: 'colorkid@yandex.ru', password: 'pho2Lomux'}
    });
  }

  _clearState() {
    this.setState(this.props.initialState);
  }

  _updateStatusMessage(id) {
    const SENDING_PROCESS_STATUS = -1;
    setTimeout(() => {
      this.sendsay.request({'action': 'track.get', 'id': id, 'session': 'session'}).then((result) => {
        this.props.updateMessage(id, parseInt(result.obj.status));
        if (result.obj.status > SENDING_PROCESS_STATUS) this._updateStatusMessage(id);
      });
    }, 15000);
  }

  _createDateForSend(files) {
    return {
      'action' : 'issue.send.test',
      'letter' : {
        'subject' : this.state.inputsValues.messageSubject,
        'from.name' : this.state.inputsValues.nameFrom,
        'from.email' : this.state.inputsValues.emailFrom,
        'to.name' : this.state.inputsValues.nameTo,
        'message': {'text' : this.state.inputsValues.message},
        'attaches': files
        },
      'sendwhen': 'test',
      'mca': [this.state.inputsValues.emailTo]
      }
  }

  _validateFields() {
    let emptyFields = [];
    let invalidEmails = [];
    const emailsForValidation = ['emailFrom', 'emailTo'];
    Object.keys(this.state.inputsValues).forEach(name => {
      if (!checkOnEmptyInput(this.state.inputsValues[name])) emptyFields.push(name);
      if (emailsForValidation.includes(name)) {
        if (!checkOnValidEmail(this.state.inputsValues[name])) invalidEmails.push(name);
      }
    });
    this.setState({emptyFields: emptyFields, invalidEmails: invalidEmails});
    return !(emptyFields.length > 0 || invalidEmails.length > 0);
  }

  onDrop(files) {
    const MAX_ALL_FILES_SIZE = 20971520;
    const file = files[0];
    if ((getFilesSize(this.state.files) + file.size) <= MAX_ALL_FILES_SIZE) {
      this.setState(prevState => ({
        files: [...prevState.files, file]
      }));
    } else {
      this._showMessageTooMuchSize();
    }
    this.hideDragDropArea();
  }

  _showMessageTooMuchSize() {
    this.setState({isTooMuchAllFilesSize: true});
    setTimeout(() => {
      this._hideMessageTooMuchSize();
    }, 5000)
  }

  _hideMessageTooMuchSize() {
    this.setState({isTooMuchAllFilesSize: false});
  }

  removeFile(index) {
    let files = [...this.state.files];
    files.splice(index, 1);
    this.setState({
      files: files
    });
  }

  handleInputChange(event) {
    const {name, value} = event.target;
    const inputsValues = {...this.state.inputsValues};
    inputsValues[name] = value.replace(/^\s+/g, '');
    this.setState({inputsValues});
  }

  showDragDropArea(e) {
    e.stopPropagation();
    this.setState({isVisibleDragDropArea: true});
  }

  hideDragDropArea() {
    this.setState({isVisibleDragDropArea: false});
  }

  render() {
    const className = this.props.mixClass ? `form ${this.props.mixClass}` : 'form';
    return (
      <form className={className}>
        <h1 className='form__title'>Отправлялка сообщений</h1>
        <FieldsList
            inputsValues={this.state.inputsValues}
            handleInputChange={this.handleInputChange}
            emptyFields={this.state.emptyFields}
            invalidEmails={this.state.invalidEmails}
        />
        {this.state.files.length > 0
          && <FilesList mixClass='form__files-list' files={this.state.files} removeFile={this.removeFile}/>}
        {this.state.isTooMuchAllFilesSize &&
          <WarningParagraph
            mixClass='form__warning-paragraph'
            message='Вы не можете прикрепить к письму файлов более чем на 20 Mb'/>}
        <div className='form__footer'>
          <button type='button' onClick={this.showDragDropArea} className='button-upload'>Прикрпепить файл</button>
          <button type='button' onClick={this.send} className='button-send'>Отправить</button>
        </div>
        {this.state.isVisibleDragDropArea && <DropZone hideDragDropArea={this.hideDragDropArea} onDrop={this.onDrop}/>}
      </form>    
    );
  }
}

Form.propTypes = {
  addNewMessage: PropTypes.func,
  updateMessage: PropTypes.func,
  mixClass: PropTypes.string,
  messages: PropTypes.array,
  initialState: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewMessage: (message) => {
      dispatch(addNewMessage(message));
    },
    updateMessage: (id, status) => {
      dispatch(updateMessage(id, status));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);