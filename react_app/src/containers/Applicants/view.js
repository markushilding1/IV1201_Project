import React from 'react';
import PropTypes from 'prop-types';
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
    updateApplicationStatus,
  } = props;

  if (!authorized) {
    return null;
  }
  return (
    <Container className="outerContainer d-flex align-items-center" >
      <Modal
        showModal={showModal}
        toggleModal={toggleModal}
        updateApplicationStatus={updateApplicationStatus}
      />
      <Row fluid>
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
      
          <Container className="innerContainer">
            {loading ? (
              <Spinner animation="border" />
            ) : applicants.length ? (
              applicants.map((applicant, i) => (
                <Applicant
                  name={applicant.name}
                  surname={applicant.surname}
                  key={applicant.id}
                  apDate={applicant.createdAt?.split('T')[0]}
                  onClick={() => toggleModal(applicant.id)}
                />
              ))
            ) : (
              <p>No results.</p>
            )}
          </Container>
  
          <PageBar handlePageClick={handlePageClick} />
        </Col>
      </Row>
    </Container>
  );
};

View.propTypes = {
  applicants: PropTypes.array,
  loading: PropTypes.bool,
  authorized: PropTypes.bool,
  onFormChange: PropTypes.func,
  onSubmit: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  focusedInput: PropTypes.object,
  onDatesChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  handlePageClick: PropTypes.func,
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  updateApplicationStatus: PropTypes.func,
};

export default View;
