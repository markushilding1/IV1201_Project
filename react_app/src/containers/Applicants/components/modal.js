import React from 'react';
import { Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';

const modal = (props) => {
  const { showModal, toggleModal, updateApplicationStatus } = props;
  const { loading, applicant, error } = props.applicant;

  const competence = applicant?.competence?.map((competence) => {
    return competence;
  });

  const yearsOfExperience = applicant?.yoe?.map((yoe) => {
    return yoe;
  });

  const availableFrom = applicant?.fromdate?.map((date) => {
    return date.split('T')[0];
  });

  const availableTo = applicant?.todate?.map((date) => {
    return date.split('T')[0];
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
        <div>
          <h1>Competence</h1>
          <ul className="inlineList">{competence}</ul>
          <ul className="inlineList">{yearsOfExperience}</ul>
        </div>
        <div>
          <h1>Availability</h1>
          <ul className="inlineList">{availableFrom}</ul>
          <ul className="inlineList">{availableTo}</ul>
        </div>
        <div>
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

const mapStateToProps = (state) => ({
  applicant: state.applicant,
});

export default connect(mapStateToProps)(modal);
