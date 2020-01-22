import React from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './style.scss';

const SignUpView = (props) => {
  const {error, loading, onFormSubmit, onFormChange} = props;
  const buttonText = loading ? 'Signing Up...' : 'Sign Up';

  return (
    <Container className="SignInView">
      <Row className="d-flex align-items-center align-content-center justify-content-center">
        <Col className="form-wrapper mt-5">
          <Form onChange={onFormChange} onSubmit={onFormSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="firstName"
                placeholder="Enter first name"
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="lastName"
                placeholder="Enter last name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoComplete="new-password"
                disabled={loading}
                type="email"
                name="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                disabled={loading}
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordVerification">
              <Form.Label>Password</Form.Label>
              <Form.Control
                disabled={loading}
                type="password"
                name="passwordVerification"
                placeholder="Verify password"
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
      </Row>
    </Container>
  );
};

export default SignUpView;
