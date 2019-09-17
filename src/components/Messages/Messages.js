import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessagesContainer from './MessagesContainer';

const Messages = (props) => {
  const className = props.mixClass ? `messages ${props.mixClass}` : 'messages';
  return (
    <div className={className}>
      <h2>Отправленные сообщения</h2>
      {props.messages.length <= 0 ? <p>Сообщения ещё не отправлялись</p> : <MessagesContainer messages={props.messages}/>}
    </div>
  )
};

Messages.propTypes = {
  messages: PropTypes.array,
  mixClass: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps)(Messages);