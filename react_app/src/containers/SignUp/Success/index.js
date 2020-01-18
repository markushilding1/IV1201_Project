import React from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignUpSuccess = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h4>Sign Up Successful</h4>
          <p>
            A verification link has been sent to the email you signed up with
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpSuccess;
