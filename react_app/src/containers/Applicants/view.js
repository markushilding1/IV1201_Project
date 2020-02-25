import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import Applicant from './components/applicant';
import SearchForm from './components/seachForm';
import PageBar from './components/pageBar';
import Modal from './components/modal';
import './style.css';

/**
 * @description View functional component for applicants page
 * @author Philip Romn
 */
const View = (props) => {
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
    showModal,
    toggleModal,
  } = props;

  if (!authorized) {
    return null;
  }
  return (
    <Container className="outerContainer">
      <Modal showModal={showModal} toggleModal={toggleModal} />
      <Row className="searchBar">
        <Col>
          <SearchForm
            onFormChange={onFormChange}
            onSubmit={onSubmit}
            startDate={startDate}
            endDate={endDate}
            focusedInput={focusedInput}
            onDatesChange={onDatesChange}
            onFocusChange={onFocusChange}
          />
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
              key={applicant.id}
              apDate={applicant.createdAt?.split('T')[0]}
              onClick={() => toggleModal(applicant.id)}
            />
          ))
        )}
      </Container>
      <PageBar handlePageClick={handlePageClick} />
    </Container>
  );
};

export default View;
