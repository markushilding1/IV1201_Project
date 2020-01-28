import React from 'react';
import {Row} from 'react-bootstrap';

const AvailabilityPeriod = ({fromDate, toDate}) => {
  return (
    <Row className="availabilityPeriod">
      <p>{fromDate}</p>
      <p>{toDate}</p>
    </Row>
  );
};

export default AvailabilityPeriod;
