import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './styles.scss';
import {Spinner} from 'react-bootstrap';
import availabilityPeriod from './components/availabilityPeriod';
import competenceArea from './components/competenceArea';

const SubmissionView = (props) => {
  const {error, loading, areaOfExpertise} = props;
  let area = '';
  if (!(areaOfExpertise === undefined || areaOfExpertise.length === 0 )) {
    area = areaOfExpertise[0].id;
  }
  return (
    <Container className="outerContainer">
      <Row className="d-flex align-items-center align-content-center justify-content-center">
        <Col>
          <Form >
            <Form.Group controlId="formFirstName">
              <Form.Label>Area of experties</Form.Label>
              <p>{area}</p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmissionView;
