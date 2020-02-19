import React from 'react';
import {Row} from 'react-bootstrap';

<<<<<<< HEAD
const applicant = ({name, apDate}) => {
=======
const applicant = ({ name, surname, apDate }) => {
>>>>>>> added pagination and sort
  return (
    <Row className="applicants">
      <p>
        {name} {surname}
      </p>
      <p>{apDate}</p>
    </Row>
  );
};

export default applicant;
