import { messagesReducer } from './redux/messagesReducer';
import { addNewMessage, updateMessage } from "./redux/actions";
import { checkOnEmptyInput, checkOnValidEmail } from './utils/inputValidateUtils';
import { createConvertedFiles, getFilesSize, convertFileToBase64 } from './utils/fileUtils';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Form } from './components/Form/Form';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

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


describe('messages reducer', () => {

  it('ADD_MESSAGE', () => {
    expect(messagesReducer([], addNewMessage({id:1, 2:2}))).toHaveLength(1);
    expect(messagesReducer([{id:1, 2:2}], addNewMessage({id:2, 2:2}))).toHaveLength(2);
    expect(messagesReducer([{id:1, 2:2}, {id:2, 2:2}], addNewMessage({id:3, 2:2}))).toHaveLength(3);
    expect(messagesReducer([
      {id:1, 2:2},
      {id:2, 2:2},
      {id:3, 2:2},
      {id:4, 2:2},
      {id:5, 2:2}
      ], addNewMessage({id:6, 2:2}))).toHaveLength(6);
    expect(messagesReducer([{id:1, 2:2}], addNewMessage({id:1, 2:2}))).toEqual([{id:1, 2:2}]);
    expect(messagesReducer([
      {id:1, 2:2}, {id:2, 2:2}
      ], addNewMessage({id:1, 2:2}))).toEqual([{id:1, 2:2}, {id:2, 2:2}]);
  });

  it('UPDATE_MESSAGE', () => {
    expect(messagesReducer([{id:1, status:2}], updateMessage(1, 3))).toEqual([{id:1, status:3}]);
    expect(messagesReducer([
      {id:1, status:2},
      {id:2, status:323}
      ], updateMessage(2, 433))).toEqual([{id:1, status:2}, {id:2, status:433}]);
    expect(messagesReducer([
      {id:1, status:2},
      {id:2, status:1},
      {id:3, status:0}
    ], updateMessage(4, 111))).toEqual([{id:1, status:2}, {id:2, status:1}, {id:3, status:0}]);
  });

});

describe('Utils', () => {

  describe('inputValidateUtils', () => {

    it('checkOnEmptyInput', () => {
      expect(checkOnEmptyInput('')).toBe(false);
      expect(checkOnEmptyInput('1')).toBe(true);
      expect(checkOnEmptyInput('Hello')).toBe(true);
      expect(checkOnEmptyInput('   ')).toBe(false);
      expect(checkOnEmptyInput('Hello ')).toBe(true);
      expect(checkOnEmptyInput(' Hello ')).toBe(true);
      expect(checkOnEmptyInput(' Hello')).toBe(true);
      expect(checkOnEmptyInput('He      llo')).toBe(true);
      expect(checkOnEmptyInput('     1')).toBe(true);
      expect(checkOnEmptyInput(['value'])).toBe(false);
      expect(checkOnEmptyInput({property: 'value'})).toBe(false);
      expect(checkOnEmptyInput(null)).toBe(false);
      expect(checkOnEmptyInput(undefined)).toBe(false);
      expect(checkOnEmptyInput(123)).toBe(false);
      expect(checkOnEmptyInput(false)).toBe(false);
      expect(checkOnEmptyInput(true)).toBe(false);
    });

    it('checkOnValidEmail', () => {
      expect(checkOnValidEmail('email@domain.com')).toBe(true);
      expect(checkOnValidEmail('  email@domain.com  ')).toBe(true);
      expect(checkOnValidEmail('email@domain.com  ')).toBe(true);
      expect(checkOnValidEmail('  email@domain.com')).toBe(true);
      expect(checkOnValidEmail('firstname.lastname@domain.com')).toBe(true);
      expect(checkOnValidEmail('email@subdomain.domain.com')).toBe(true);
      expect(checkOnValidEmail('firstname+lastname@domain.com')).toBe(true);
      expect(checkOnValidEmail('"email"@domain.com')).toBe(true);
      expect(checkOnValidEmail('1234567890@domain.com')).toBe(true);
      expect(checkOnValidEmail('email@domain-one.com')).toBe(true);
      expect(checkOnValidEmail('_______@domain.com')).toBe(true);
      expect(checkOnValidEmail('email@domain.co.jp')).toBe(true);
      expect(checkOnValidEmail('firstname-lastname@domain.com')).toBe(true);
      expect(checkOnValidEmail('plainaddress')).toBe(false);
      expect(checkOnValidEmail('#@%^%#$@#$@#.com')).toBe(false);
      expect(checkOnValidEmail('Joe Smith <email@domain.com>')).toBe(false);
      expect(checkOnValidEmail('email.domain.com')).toBe(false);
      expect(checkOnValidEmail('email@domain@domain.com')).toBe(false);
      expect(checkOnValidEmail('.email@domain.com')).toBe(false);
      expect(checkOnValidEmail('email.@domain.com\t')).toBe(false);
      expect(checkOnValidEmail('email..email@domain.com')).toBe(false);
      expect(checkOnValidEmail('email@domain')).toBe(false);
      expect(checkOnValidEmail(['value'])).toBe(false);
      expect(checkOnValidEmail({property: 'value'})).toBe(false);
      expect(checkOnValidEmail(null)).toBe(false);
      expect(checkOnValidEmail(undefined)).toBe(false);
      expect(checkOnValidEmail(123)).toBe(false);
      expect(checkOnValidEmail(false)).toBe(false);
      expect(checkOnValidEmail(true)).toBe(false);
    });
  });

  describe('filesUtils', () => {
    const fileOne = new File(['file'], 'fileOne.txt', { type: 'text/plain'});
    const fileTwo = new File(['file'], 'fileTwo.txt', { type: 'text/plain'});
    const fileThree = new File(['file'], 'fileThree.txt', { type: 'text/plain'});
    const allFiles = [fileOne, fileTwo, fileThree];
    const twoFiles = [fileTwo, fileThree];
    const oneFile = [fileOne];

    it('getFilesSize', () => {
      expect(getFilesSize(allFiles)).toEqual(12);
      expect(getFilesSize(twoFiles)).toEqual(8);
      expect(getFilesSize(oneFile)).toEqual(4);
      expect(getFilesSize([])).toBe(0);
      expect(getFilesSize('string')).toBe(false);
      expect(getFilesSize(123)).toBe(false);
      expect(getFilesSize({property: 'value'})).toBe(false);
      expect(getFilesSize(null)).toBe(false);
      expect(getFilesSize(undefined)).toBe(false);
      expect(getFilesSize(['str', 'str2'])).toBe(false);
      expect(getFilesSize(['null', {property: 'value'}])).toBe(false);
      expect(getFilesSize([fileTwo, 'str2'])).toBe(false);
      expect(getFilesSize([[], fileThree])).toBe(false);
    });

    it('convertFileToBase64 with regular file', () => {
      return convertFileToBase64(fileOne).then(result => {
        expect(result.encoding).toBe('base64');
      });
    });

    it('convertFileToBase64 with string', () => {
      return expect(convertFileToBase64('string')).rejects.toEqual({message: 'ERROR: "File" is not instance of File'});
    });

    it('convertFileToBase64 with array', () => {
      const fileOne = new File(['file'], 'fileOne.txt', { type: 'text/plain'});
      return expect(convertFileToBase64([fileOne])).rejects.toEqual({message: 'ERROR: "File" is not instance of File'});
    });

    it('convertFileToBase64 with number', () => {
      return expect(convertFileToBase64(123)).rejects.toEqual({message: 'ERROR: "File" is not instance of File'});
    });

    it('createConvertedFiles with regular array with files', () => {
      return createConvertedFiles(allFiles).then(result => {
        expect(result).toHaveLength(3);
        expect(result[0].encoding).toBe('base64');
        expect(result[1].encoding).toBe('base64');
        expect(result[2].encoding).toBe('base64');
      });
    });

    it('createConvertedFiles with empty array files', () => {
      return createConvertedFiles([]).then(result => {
        expect(result).toEqual([]);
      });
    });

    it('createConvertedFiles with number array', () => {
      return expect(createConvertedFiles([1,2,3])).rejects.toEqual({message: 'ERROR: One of "File" is not instance of File'});
    });

    it('createConvertedFiles with incorrect values of array', () => {
      return expect(createConvertedFiles([fileOne,2,fileThree])).rejects.toEqual({message: 'ERROR: One of "File" is not instance of File'});
    });

  });

  describe('Form component', () => {
    it('check render dropzone component', () => {
      act(() => {
        render(<Form initialState={initialState}/>, container);
      });
      expect(container.querySelector('.dropzone')).toBe(null);
      act(() => {
        render(<Form initialState={initialState}/>, container);
        const buttonUpload = container.querySelector('.button-upload');
        buttonUpload.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(container.querySelector('.dropzone').getAttribute('id')).toBe('dropzone');
      act(() => {
        render(<Form initialState={initialState}/>, container);
        const buttonUpload = container.querySelector('.button-upload');
        buttonUpload.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(container.querySelector('.dropzone')).toBe(null);
    });

    it('check warning message', () => {
      act(() => {
        render(<Form initialState={initialState}/>, container);
        const buttonSend = container.querySelector('.button-send');
        buttonSend.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(container.querySelector('.warning-paragraph').getAttribute('class')).toBe('warning-paragraph fields-list__warning-paragraph');
    });
  });
});