import React from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import ReactPaginate from 'react-paginate';

import Applicant from './components/applicant';
import './style.css';

/**
 * @description View functional component for applicants page
 * @author Philip Romn
 */
const view = (props) => {
  const {
    applicants,
    loading,
    authorized,
    onFormChange,
    onSubmit,
    startDate,
    endDate,
    focusedInput,
    onDatesChange,
    onFocusChange,
    handlePageClick,
  } = props;

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
                <Form.Label className="formLabel">Name</Form.Label>
                <Form.Control name="name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridNamn">
                <Form.Label className="formLabel">Availability</Form.Label>
                <DateRangePicker
                  startDate={startDate}
                  startDateId="your_unique_start_date_id"
                  endDate={endDate}
                  endDateId="your_unique_end_date_id"
                  onDatesChange={({ startDate, endDate }) =>
                    onDatesChange({ startDate, endDate })
                  }
                  focusedInput={focusedInput}
                  onFocusChange={(focusedInput) => onFocusChange(focusedInput)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCompetence">
                <Form.Label className="formLabel">Competence</Form.Label>
                <Form.Control name="competence" as="select">
                  <option></option>
                  <option>Korvgrillning</option>
                  <option>Karuselldrift</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSort">
                <Form.Label className="formLabel">
                  Sort by application date
                </Form.Label>
                <Form.Control name="sort" as="select">
                  <option></option>
                  <option>ASC</option>
                  <option>DESC</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button onClick={onSubmit} className="searchBtn">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Container className="innerContainer">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          applicants.map((applicant, i) => (
            <Applicant
              name={applicant.name}
              surname={applicant.surname}
              apDate={applicant.createdAt.split('T')[0]}
            />
          ))
        )}
      </Container>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </Container>
  );
};

export default view;
