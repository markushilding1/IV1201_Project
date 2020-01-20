import React from 'react';

import './styles.scss';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const View = (props) => {

  return(
    <Container className='page-name'>
      <Row>
        <Col md="4">Hello from column 1</Col>
        <Col md="4">Hello from column 2</Col>
        <Col md="4">Hello from column 3</Col>
      </Row>
    </Container>    
  )
}

export default View;