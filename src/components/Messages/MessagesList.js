import React from 'react';
import PropTypes from 'prop-types';
import MessageStatus from "./MessageStatus";

const MessagesList = React.memo(function MessagesList(props) {
  const Messages =  props.messages.map(messages => {
    return <li className='messages-list__item' key={messages.id}>
      <div className='messages-list__date'>{messages.date}</div>
      <div className='messages-list__subject'>{messages.messageSubject}</div>
      <div className='messages-list__status'><MessageStatus status={messages.status}/></div>
    </li>
  });
  return <ul className='messages-list'>{Messages}</ul>
});

MessagesList.propTypes = {
  messages: PropTypes.array
};

export default MessagesList;