import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Shared/Field';
import TextArea from '../Shared/TextArea';
import WarningParagraph from '../Shared/WarningParagraph';

const FieldsList = React.memo(function FieldsList(props) {
  const inputsValues = props.inputsValues;
  return (
    <div className='fields-list'>
      <div className='fields-list__row'>
        <span className='fields-list__title'>От кого</span>
        <div className='fields-list__cell'>
          <Field
            name='nameFrom'
            placeholder='Имя'
            value={inputsValues.nameFrom}
            type='text'
            handleInputChange={props.handleInputChange}
            mixClass='first'
          />
          {props.emptyFields.includes('nameFrom')
            &&  <WarningParagraph mixClass='fields-list__warning-paragraph' message='Поле не может быть пустым'/>}
        </div>
        <div className='fields-list__cell'>
          <Field
            name='emailFrom'
            placeholder='Email'
            value={inputsValues.emailFrom}
            type='email'
            handleInputChange={props.handleInputChange}
            mixClass='second'
          />
          {(props.emptyFields.includes('emailFrom')
            && <WarningParagraph mixClass='fields-list__warning-paragraph' message='Email не может быть пустым'/>)
              || (props.invalidEmails.includes('emailFrom')
                && <WarningParagraph mixClass='fields-list__warning-paragraph' message='Email введен некорректно'/>)}
        </div>
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Кому</span>
        <div className='fields-list__cell'>
          <Field
            name='nameTo'
            placeholder='Имя'
            value={inputsValues.nameTo}
            type='text'
            handleInputChange={props.handleInputChange}
            mixClass='first'
          />
          {props.emptyFields.includes('nameTo')
            && <WarningParagraph mixClass='fields-list__warning-paragraph' message='Поле не может быть пустым'/>}
        </div>
        <div className='fields-list__cell'>
          <Field
            name='emailTo'
            placeholder='Email'
            value={inputsValues.emailTo}
            type='email'
            handleInputChange={props.handleInputChange}
            mixClass='second'
          />
          {(props.emptyFields.includes('emailTo')
            && <WarningParagraph mixClass='fields-list__warning-paragraph' message='Email не может быть пустым'/>)
              || (props.invalidEmails.includes('emailTo')
                && <WarningParagraph mixClass='fields-list__warning-paragraph' message='Email введен некорректно'/>)}
        </div>
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Тема письма</span>
        <Field
          name='messageSubject'
          value={inputsValues.messageSubject}
          type='text'
          handleInputChange={props.handleInputChange}
        />
        {props.emptyFields.includes('messageSubject')
          && <WarningParagraph mixClass='fields-list__warning-paragraph' message='Поле не может быть пустым'/>}
      </div>
      <div className='fields-list__row'>
        <span className='fields-list__title'>Сообщение</span>
        <TextArea
          name='message'
          value={inputsValues.message}
          handleInputChange={props.handleInputChange}
        />
        {props.emptyFields.includes('message')
          && <WarningParagraph mixClass='fields-list__warning-paragraph' message='Сообщение не может быть пустым'/>}
      </div>
    </div>
  )
});

FieldsList.propTypes = {
  inputsValues: PropTypes.object,
  handleInputChange: PropTypes.func,
  emptyFields: PropTypes.array,
  invalidEmails: PropTypes.array
};

export default FieldsList;