import React from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './style.css';

const TopNavbar = (props) => {
  const {auth, user, userLoading} = props;
  const home = <Nav.Link href="/">Home</Nav.Link>;
  const signOut = <Nav.Link onClick={props.onSignOutClick}>Sign Out</Nav.Link>;

  return (
    <Container fluid="true" className="top-navbar">
      <Row
        className={`
        d-flex 
        align-items-center 
        align-content-center 
        justify-content-center
      `}
      >
        <Col xs="12">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Logo</Navbar.Brand>

            {auth.isLoaded && !user && !userLoading ? (
              <Nav className="mr-auto">
                {home}
                <Nav.Link href="/sign-in">Sign In</Nav.Link>
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
              </Nav>
            ) : user && user.role === 'applicant' ? (
              <Nav className="mr-auto">
                {home}
                <Nav.Link href="/applications">Apply for job</Nav.Link>
                {signOut}
              </Nav>
            ) : user && user.role === 'recruit' ? (
              <Nav className="mr-auto">
                {home}
                <Nav.Link href="/applicants">Applicants</Nav.Link>
                {signOut}
              </Nav>
            ) : null}
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

TopNavbar.propTypes = {
  auth: PropTypes.shape({
    isLoaded: PropTypes.bool,
  }),
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  userLoading: PropTypes.bool,
  onSignOutClick: PropTypes.func,
};

export default TopNavbar;
