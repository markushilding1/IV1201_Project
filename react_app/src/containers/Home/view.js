import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomeView = (props) => {
  return (
    <Container className="mt-5">
      <Row
        className={`
        d-flex 
        align-items-center 
        align-content-center 
        justify-content-center`}
      >
        <Col>
          <h1>Recruitment Applications</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeView;
