import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

const JobFilter = ({ onFilterChange, clearFilters, filters }) => {
  const hasActiveFilters = Object.values(filters).some(Boolean);
  
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            <i className="bi bi-funnel me-2"></i>
            Filter Jobs
          </h5>
          {hasActiveFilters && (
            <Button
              variant="link"
              className="text-danger p-0"
              onClick={clearFilters}
            >
              <i className="bi bi-x-circle me-1"></i>
              Clear Filters
            </Button>
          )}
        </div>
        
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                name="jobType"
                value={filters.jobType || ''}
                onChange={onFilterChange}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={filters.category || ''}
                onChange={onFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Select
                name="location"
                value={filters.location || ''}
                onChange={onFilterChange}
              >
                <option value="">All Locations</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="Remote">Remote</option>
                <option value="New York, NY">New York, NY</option>
                <option value="Austin, TX">Austin, TX</option>
                <option value="Chicago, IL">Chicago, IL</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default JobFilter;