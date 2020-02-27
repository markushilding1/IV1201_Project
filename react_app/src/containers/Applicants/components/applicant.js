import React from 'react';

const applicant = ({ name, surname, apDate, onClick }) => {
  return (
    <li className="applicants" onClick={onClick}>
      <p>
        {name} {surname}
      </p>
      <p>{apDate}</p>
    </li>
  );
};

export default applicant;
