import React from 'react';
import 'react-daterange-picker/dist/css/react-calendar.css';

import './styles.scss';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const View = (props) => {
  const {error, loading, onFormSubmit, onFormChange, areaOfExpertise} = props;
  const buttonText = loading ? 'Submitting...' : 'Submit';
  return (
    <Container className="Applications">
      <Row className="d-flex align-items-center align-content-center justify-content-center">
        <Col className="form-wrapper mt-5">
          <Form onChange={onFormChange} onSubmit={onFormSubmit}>
            <Form.Group controlId="areaOfExpertise">
              <Form.Label>Area of Expertise</Form.Label>
              <Form.Control as="select">
                {areaOfExpertise.map((option,index) =>
                  <option key={index} value={option.obj}>
                    {option.name}
                  </option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="yearsOfExperience">
              <Form.Label>Years of experience</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="yearsOfExperience"
                placeholder="Enter years of experience "
              />
            </Form.Group>
            {error && (
              <Form.Group controlId="formErrorMessage">
                <Form.Text className="text-danger">{error}</Form.Text>
              </Form.Group>
            )}
            <Button variant="primary" type="submit" disabled={loading}>
              {buttonText}
            </Button>
          </Form>
        </Col>
        <Col className="form-wrapper mt-5">
          <Form onChange={onFormChange} onSubmit={onFormSubmit}>
            <Form.Group controlId="applicationDate">
            </Form.Group>
            {error && (
              <Form.Group controlId="formErrorMessage">
                <Form.Text className="text-danger">{error}</Form.Text>
              </Form.Group>
            )}
            <Button variant="primary" type="submit" disabled={loading}>
              {buttonText}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default View;
