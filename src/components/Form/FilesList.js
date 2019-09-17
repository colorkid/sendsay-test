import React from 'react';
import PropTypes from 'prop-types';

const FilesList = React.memo(function ListFiles(props) {
  const className = props.mixClass ? `files-list ${props.mixClass}` : 'files-list';
  const Files =  props.files.map((file, index) => {
    return <li className='files-list__item' key={index}>
      <div className='files-list__name'>{file.name}</div>
      <div onClick={() => props.removeFile(index)} className='files-list__remove-button'>Удалить</div>
    </li>
  });
  return <ul className={className}>{Files}</ul>
});

FilesList.propTypes = {
  files: PropTypes.array,
  removeFile: PropTypes.func,
  mixClass: PropTypes.string
};

export default FilesList;