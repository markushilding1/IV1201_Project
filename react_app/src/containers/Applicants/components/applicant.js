import React from 'react';
import { Row } from 'react-bootstrap';

const applicant = ({ name, surname, apDate }) => {
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
