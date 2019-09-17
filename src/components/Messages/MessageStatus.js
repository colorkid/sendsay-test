import React from 'react';
import PropTypes from 'prop-types';

const MessageStatus = React.memo(function MessageStatus(props) {
  const Status = () => {
    if (props.status === -1) {
      return <div className='messages-status messages-status--success'>Отправлено</div>;
    } else if (props.status < -1) {
      return <div className='messages-status messages-status--error'>Ошибка</div>;
    } else if (props.status > -1) {
      return <div className='messages-status messages-status--loading'>В очереди</div>;
    }
  };
  return <Status/>
});

MessageStatus.propTypes = {
  status: PropTypes.number
};

export default MessageStatus;