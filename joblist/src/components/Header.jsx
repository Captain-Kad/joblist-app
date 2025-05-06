import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="#" className="fw-bold fs-3">JobList</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className="px-3">Home</Nav.Link>
            <Nav.Link href="#" className="px-3">Browse Jobs</Nav.Link>
            <Nav.Link href="#" className="px-3">Categories</Nav.Link>
            <Nav.Link href="#" className="px-3">About</Nav.Link>
            <Nav.Link href="#" className="px-3">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;