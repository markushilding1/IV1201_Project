import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';

const PermissionDenied = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Permission Denied</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default PermissionDenied;
