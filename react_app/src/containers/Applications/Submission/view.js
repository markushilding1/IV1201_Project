import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles.scss';
import PropTypes from 'prop-types';

const SubmissionView = (props) => {
  const {
    areaOfExpertise,
    availabilityPeriod,
    submissionSuccess,
    onDiscardApplication,
    onSubmitApplication,
  } = props;
  let area = '';
  let availability = '';
  const submissionResult = submissionSuccess ? 'Submission Success' : '';
  if (!(areaOfExpertise === undefined || areaOfExpertise.length < 1)) {
    area = (
      <Container>
        {areaOfExpertise.map((singleArea) => (
          <Row className="application" key={singleArea.id}>
            <p>Area: {singleArea.areaOfExpertise}</p>
            <p>Years of experience: {singleArea.yearsOfExperience}</p>
          </Row>
        ))}
      </Container>
    );
  }
  if (!(availabilityPeriod === undefined || availabilityPeriod.length < 1)) {
    availability = (
      <Container>
        {availabilityPeriod.map((date) => (
          <Row className="application" key={date.id}>
            <p>From: {date.fromDate}</p>
            <p>To : {date.toDate}</p>
          </Row>
        ))}
      </Container>
    );
  }
  return (
    <Container className="outerContainer">
      <Row
        className="d-flex align-items-center
       align-content-center justify-content-center"
      >
        <Col>
          <Form>
            <Form.Group controlId="areaOfExpertise">
              <Form.Label className="applicationLabel">Application</Form.Label>
              {area}
            </Form.Group>
            <Form.Group controlId="availabilityPeriod">
              {availability}
            </Form.Group>
          </Form>
          <Form>
            <Row>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => onSubmitApplication(e)}
              >
                Submit
              </Button>
              <Button
                variant="danger"
                type="submit"
                onClick={() => onDiscardApplication()}
              >
                Discard
              </Button>
            </Row>
            <p>{submissionResult}</p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

SubmissionView.propTypes = {
  error: PropTypes.shape,
  loading: PropTypes.bool,
  areaOfExpertise: PropTypes.array,
  availabilityPeriod: PropTypes.array,
  submissionSuccess: PropTypes.any,
  onDiscardApplication: PropTypes.func,
  onSubmitApplication: PropTypes.func,
};

export default SubmissionView;
