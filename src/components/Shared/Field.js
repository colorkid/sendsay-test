import React from "react";
import PropTypes from 'prop-types';

const Field = React.memo(function Field(props) {
  const className = props.mixClass ? `input input--${props.mixClass}` : 'input';
  return (
    <input
      name={props.name}
      className={className}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.handleInputChange}
    />
  );
});

Field.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  mixClass: PropTypes.string
};

export default Field;