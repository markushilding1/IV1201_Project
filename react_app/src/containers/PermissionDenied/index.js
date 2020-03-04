import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';

const PermissionDenied = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Access Denied</h1>
          <p>You do not have permission to view the requested page.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissionDenied;
