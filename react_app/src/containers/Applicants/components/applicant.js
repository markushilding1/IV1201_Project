import React from 'react';
import PropTypes from 'prop-types';

const applicant = ({name, surname, apDate, onClick}) => {
  return (
    <li className="applicants" onClick={onClick}>
      <p>
        {name} {surname}
      </p>
      <p>{apDate}</p>
    </li>
  );
};

applicant.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  apDate: PropTypes.string,
  onClick: PropTypes.func,
};

export default applicant;
