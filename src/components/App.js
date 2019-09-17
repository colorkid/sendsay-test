import React, {Component} from 'react';
import Form from './Form/Form';
import Messages from './Messages/Messages';
import '../styles/style.scss';

const initialState = {
  inputsValues: {
    nameFrom: '',
    emailFrom: '',
    nameTo: '',
    emailTo: '',
    messageSubject: 'Моя тема письма',
    message: ''
  },
  files: [],
  emptyFields: [],
  invalidEmails: [],
  isTooMuchAllFilesSize: false,
  isVisibleDragDropArea: false
};

class App extends Component {
  render() {
    return (
      <div className='main'>
        <div className='logo main__block'>
          <img src='./img/logo.svg' alt='logo' className='logo__img'/>
        </div>
        <Form initialState={initialState} mixClass='main__block'/>
        <Messages mixClass='main__block'/>
      </div>
    );
  }
}

export default App;