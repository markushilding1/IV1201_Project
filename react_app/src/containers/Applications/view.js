import React from 'react';

import './styles.scss';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const View = (props) => {
  const {
    error,
    loading,
    expertiseDropDown,
    date,
    onExpertiseChange,
    onYearsChange,
    onExpertiseSubmit,
    onAvailabilitySubmit,
    onDateSelect,
    component,
  } = props;
  const buttonText = 'Submit';
  const dropDown =
    expertiseDropDown != (null && false) ? (
      <Form.Control as="select" name="areaOfExpertise">
        <option value="" disabled selected>
          Select your option
        </option>
        {expertiseDropDown.map((option) => (
          <option key={option.competence_id} value={option.name}>
            {option.name}
          </option>
        ))}
      </Form.Control>
    ) : (
      <Form.Control as="select">
        <option>Work</option>
      </Form.Control>
    );
  return (
    <Container className="Applications">
      <Row className="d-flex align-items-center align-content-center
      justify-content-center">
        <Col className="form-wrapper mt-5">
          <Form onSubmit={onExpertiseSubmit}>
            <Form.Group controlId="formAreaOfExpertise"
              onChange={onExpertiseChange}>
              <Form.Label>Area of Expertise</Form.Label>
              {dropDown}
            </Form.Group>
            <Form.Group controlId="formYearsOfExperience">
              <Form.Label>Years of experience</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="yearsOfExperience"
                placeholder="Enter years of experience"
                onChange={onYearsChange}
              />
            </Form.Group>
            {error && (
              <Form.Group controlId="formErrorMessage">
                <Form.Text className="text-danger">{error}</Form.Text>
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {buttonText}
            </Button>
          </Form>
        </Col>
        <Col className="form-wrapper mt-5">
          <Form onSubmit={onAvailabilitySubmit}>
            <Form.Group controlId="availabilityPeriod">
              <Form.Label>Availability Period</Form.Label>
              <Row>
                <DateRangePicker onChange={onDateSelect} value={date} />
              </Row>
            </Form.Group>
            {error && (
              <Form.Group controlId="formErrorMessage">
                <Form.Text className="text-danger">{error}</Form.Text>
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {buttonText}
            </Button>
          </Form>
        </Col>
      </Row>
      {component}
    </Container>
  );
};

export default View;
