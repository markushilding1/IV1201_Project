import React from 'react';
import { Row } from 'react-bootstrap';

const applicant = ({ name, apDate }) => {
  return (
    <Row className="applicants">
      <p>{name}</p> <p>{apDate}</p>
    </Row>
  );
};

export default applicant;
