import React from 'react';
import {Row} from 'react-bootstrap';

const CompetenceArea = (name, yearsOfExperience) => {
  return (
    <Row className="CompetenceArea">
      <p>{name}</p>
      <p>{yearsOfExperience}</p>
    </Row>
  );
};

export default CompetenceArea;
