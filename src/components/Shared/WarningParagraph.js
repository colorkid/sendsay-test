import React from 'react';
import PropTypes from 'prop-types';

const WarningParagraph = React.memo(function Field(props) {
  const className = props.mixClass ? `warning-paragraph ${props.mixClass}` : 'warning-paragraph';
  return <span className={className}>{props.message}</span>;
});

WarningParagraph.propTypes = {
  message: PropTypes.string,
  mixClass: PropTypes.string
};

export default WarningParagraph;