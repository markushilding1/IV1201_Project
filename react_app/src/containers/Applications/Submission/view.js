import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles.scss';

const SubmissionView = (props) => {
  const {error, loading, areaOfExpertise, availabilityPeriod, onDiscardApplication, onSubmitApplication} = props;
  let area = '';
  let availability = '';
  if (!(areaOfExpertise === undefined || areaOfExpertise.length < 1)) {
    area = (
      <Container className="innerContainer">
        {areaOfExpertise.map((singleArea) =>
          (<Row>
            <p>
              Area: {singleArea.areaOfExpertise}
            </p>
            <p>
             Years of experience: {singleArea.yearsOfExperience}
            </p>
          </Row>))
        }
      </Container>);
  }
  if (!(availabilityPeriod === undefined || availabilityPeriod.length < 1)) {
    availability = (
      <Container className="innerContainer">
        {availabilityPeriod.map((date) =>
          (<Row className="application">
            <p>
              From: {date.fromDate}
            </p>
            <p>
              To : {date.toDate}
            </p>
          </Row>))
        }
      </Container>);
  }
  return (
    <Container className="outerContainer">
      <Row className="d-flex align-items-center align-content-center justify-content-center">
        <Col>
          <Form>
            <Form.Group controlId="areaOfExpertise">
              <Form.Label>Application</Form.Label>
              {area}
            </Form.Group>
            <Form.Group controlId="availabilityPeriod">
              {availability}
            </Form.Group>
          </Form>
          <Form>
            <Row>
              <Button variant="primary" type="submit" onClick={() => onSubmitApplication()} >
                  Submit
              </Button>
              <Button variant="primary" type="submit" onClick={() => onDiscardApplication()}>
                  Discard
              </Button>
            </Row>
          </Form>

        </Col>
      </Row>
    </Container>
  );
};

export default SubmissionView;
