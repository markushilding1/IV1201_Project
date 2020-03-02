import React from 'react';
import PropTypes from 'prop-types';
import { Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';

const modal = (props) => {
  const { showModal, toggleModal, updateApplicationStatus } = props;
  const { loading, applicant, error } = props.applicant;

  const competence = applicant?.competence?.map((competence) => {
    return <li>{competence}</li>;
  });

  const yearsOfExperience = applicant?.yoe?.map((yoe) => {
    return <li>{yoe}</li>;
  });

  const availableFrom = applicant?.fromdate?.map((date) => {
    return <li>{date.split('T')[0]}</li>;
  });

  const availableTo = applicant?.todate?.map((date) => {
    return <li>{date.split('T')[0]}</li>;
  });

  if (error) {
    console.log(error);
  }
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={toggleModal}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {loading
            ? 'Loading...'
            : !error
            ? applicant?.name + ' ' + applicant?.surname + ' ' + applicant?.ssn
            : 'Error getting applicant information'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="inlineBox">
          <h1>Competence</h1>
          <ul className="inlineList">{competence}</ul>
          <ul className="inlineList">{yearsOfExperience}</ul>
        </div>
        <div className="inlineBox">
          <h1>Availability</h1>
          <ul className="inlineList">{availableFrom}</ul>
          <ul className="inlineList">{availableTo}</ul>
        </div>
        <div className="inlineBox">
          <h1>Status</h1>
          {applicant?.status}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <DropdownButton id="dropdown-basic-button" title="Handle application">
          <Dropdown.Item
            href="#/action-1"
            onClick={() => updateApplicationStatus(applicant.id, 'Accepted')}
          >
            Accept
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => updateApplicationStatus(applicant.id, 'Rejected')}
          >
            Reject
          </Dropdown.Item>
        </DropdownButton>
      </Modal.Footer>
    </Modal>
  );
};

modal.propTypes = {
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  updateApplicationStatus: PropTypes.func,
  applicant: PropTypes.object,
};

const mapStateToProps = (state) => ({
  applicant: state.applicant,
});

export default connect(mapStateToProps)(modal);
