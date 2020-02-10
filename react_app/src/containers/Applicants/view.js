import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import Applicant from './components/applicant';
import './style.css';

/**
 * @description View functional component for applicants page
 * @author Philip Romn
 */

const view = (props) => {
  const { applicants, loading, authorized, onFormChange } = props;
  console.log(props);

  if (!authorized) {
    return null;
  }

  return (
    <Container className="outerContainer">
      <Row className="searchBar">
        <Col>
          <Form onChange={onFormChange}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNamn">
                <Form.Control name="namn" placeholder="Namn" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCompetence">
                <Form.Control name="kompetens" as="select">
                  <option>Välj Kompetens...</option>
                  <option>Korvgrillning</option>
                  <option>Karuselldrift</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Control />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Control />
              </Form.Group>
            </Form.Row>
            <Button className="searchBtn">Search</Button>
          </Form>
        </Col>
      </Row>
      <Container className="innerContainer">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          applicants.map((applicant, i) => (
            <Applicant name={applicant.name} apDate={'2020-01-25'} />
          ))
        )}
      </Container>
      <Row className="navButtons">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button variant="light">1</Button>
          <Button variant="light">2</Button>
          <Button variant="light">3</Button>
          <Button variant="light">4</Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
};

export default view;
