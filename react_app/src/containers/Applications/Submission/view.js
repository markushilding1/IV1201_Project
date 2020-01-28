import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './style.scss';
import {Spinner} from 'react-bootstrap';
import availabilityPeriod from './components/availabilityPeriod';
import competenceArea from './components/competenceArea';

const SubmissionView = (props) => {
  const {competenceArea, availabilityPeriod} = props;
  return (
    <Container className="outerContainer">
      <Row className="d-flex align-items-center align-content-center justify-content-center">
        <Col>
          {competenceArea.map((area) => (
            <competenceArea
              name={area.name}
              yearsOfExperience={area.yearsOfExperience}
            />
          ))}
          {availabilityPeriod.map((date) => (
            <availabilityPeriod
              fromDate={date.fromDate}
              yearsOfExperience={date.toDate}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SubmissionView;
