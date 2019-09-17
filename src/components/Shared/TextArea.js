import React from "react";
import PropTypes from 'prop-types';

const TextArea = React.memo(function Field(props) {
  return (
    <textarea
      name={props.name}
      className='textarea'
      value={props.value}
      onChange={props.handleInputChange}
    />
  );
});

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func
};

export default TextArea;