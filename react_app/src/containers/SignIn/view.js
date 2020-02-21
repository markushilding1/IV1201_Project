import React from 'react';
import PropTypes from 'prop-types';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {Formik} from 'formik';
import * as yup from 'yup'; // for everything

import './style.scss';

const SignInSchema = yup.object({
  email: yup
      .string()
      .required()
      .email('Invalid email'),
  password: yup
      .string()
      .required()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!'),
});

const SignInView = (props) => {
  const {error, loading} = props;
  const buttonText = loading ? 'Signing in...' : 'Sign In';

  return (
    <Container className="SignInView">
      <Row
        className={`
        d-flex 
        align-items-center 
        align-content-center 
        justify-content-center`}
      >
        <Col className="form-wrapper mt-5">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
              props.onFormSubmit(values);
            }}
          >
            {({handleSubmit, handleChange, values, errors}) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    disabled={loading}
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    disabled={loading}
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {error && (
                  <Form.Group controlId="formErrorMessage">
                    <Form.Text className="text-danger">{error}</Form.Text>
                  </Form.Group>
                )}

                <Button variant="primary" type="submit" disabled={loading}>
                  {buttonText}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

SignInView.propTypes = {
  error: PropTypes.shape,
  loading: PropTypes.bool,
  onFormSubmit: PropTypes.func,
};

export default SignInView;
