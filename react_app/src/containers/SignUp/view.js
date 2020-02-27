import React from 'react';
// Bootstrap
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Formik} from 'formik';
import * as yup from 'yup'; // for everything
import './style.scss';

const SignUpSchema = yup.object({
  name: yup.string().min(2, 'To short!'),
  surname: yup.string().min(2, 'To short!'),
  ssn: yup
      .string()
      .matches(
          /^[1-2]{1}[0-9]{3}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}-[0-9]{4}$/,
          'Invalid social security number. Must be of form yymmdd-xxxx',
      ),
  email: yup
      .string()
      .required()
      .email('Invalid email'),
  password: yup
      .string()
      .required()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!'),
  passwordVerification: yup
      .string()
      .required()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .oneOf([yup.ref('password')], 'Both password need to be the same'),
});

const SignUpView = (props) => {
  const {error, loading} = props;
  const buttonText = loading ? 'Signing Up...' : 'Sign Up';

  return (
    <Container className="SignInView">
      <Row
        className={`
          d-flex 
          align-items-center 
          align-content-center 
          justify-content-center
        `}
      >
        <Col className="form-wrapper mt-5">
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              ssn: '',
              password: '',
              passwordVerification: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
              props.onFormSubmit(values);
            }}
          >
            {({handleSubmit, handleChange, values, errors}) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    disabled={loading}
                    type="text"
                    name="name"
                    placeholder="Enter first name"
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formLastName">
                  <Form.Label>Efternamn</Form.Label>
                  <Form.Control
                    disabled={loading}
                    type="text"
                    name="surname"
                    placeholder="Enter last name"
                    onChange={handleChange}
                    isInvalid={!!errors.surname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.surname}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formSSN">
                  <Form.Label>Personnummer</Form.Label>
                  <Form.Control
                    disabled={loading}
                    type="text"
                    name="ssn"
                    placeholder=""
                    onChange={handleChange}
                    isInvalid={!!errors.ssn}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ssn}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    disabled={loading}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Text className="text-muted">
                    We&apos;ll never share your email with anyone else.
                  </Form.Text>

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
                    placeholder="Password"
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordVerification">
                  <Form.Label>Verify Password</Form.Label>
                  <Form.Control
                    disabled={loading}
                    type="password"
                    name="passwordVerification"
                    placeholder="Verify password"
                    onChange={handleChange}
                    isInvalid={!!errors.passwordVerification}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordVerification || errors.passwordConfirm}
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

SignUpView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  onFormSubmit: PropTypes.func,
};

export default SignUpView;
