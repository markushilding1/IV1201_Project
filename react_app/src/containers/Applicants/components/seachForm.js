import React from 'react';
import PropTypes from 'prop-types';
import {Col, Form, Button} from 'react-bootstrap';

import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const seachForm = (props) => {
  const {
    onFormChange,
    onSubmit,
    startDate,
    endDate,
    focusedInput,
    onDatesChange,
    onFocusChange,
  } = props;

  return (
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
            onDatesChange={({startDate, endDate}) =>
              onDatesChange({startDate, endDate})
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
  );
};

seachForm.propTypes = {
  onFormChange: PropTypes.func,
  onSubmit: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  focusedInput: PropTypes.object,
  onDatesChange: PropTypes.func,
  onFocusChange: PropTypes.func,
};

export default seachForm;
