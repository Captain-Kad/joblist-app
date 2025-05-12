import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <Row className="gy-4">
          <Col md={3}>
            <h5 className="mb-3">JobList</h5>
            <p className="text-muted">Find your dream job or the perfect candidate for your company.</p>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">For Job Seekers</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Browse Jobs</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Create Profile</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Job Alerts</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">For Employers</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Post a Job</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Browse Candidates</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Pricing</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-3">Contact</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">support@joblist.com</li>
              <li className="mb-2">+1 (555) 123-4567</li>
              <li className="mb-2">123 Main St, City, State</li>
            </ul>
          </Col>
        </Row>
        <div className="text-center text-muted pt-4 mt-4 border-top border-secondary">
          <p>&copy; 2025 JobList. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;