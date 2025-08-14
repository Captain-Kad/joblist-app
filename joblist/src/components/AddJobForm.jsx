import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


const AddJobForm = ({ show, handleClose }) => {
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    job_type: 'Full-time',
    location: '',
    salary: '',
    job_category: 'Development',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create new job with generated fields
    const job = {
      ...newJob,
      posted_date: new Date().toISOString().split('T')[0],
      category_id: newJob.job_category === 'Development' ? 1 :
                  newJob.job_category === 'Design' ? 2 :
                  newJob.job_category === 'Operations' ? 3 : 4,
      job_url: `https://example.com/jobs/${newJob.title.toLowerCase().replace(/\s+/g, '-')}`
    };
    
    try {
      await axios.post("http://localhost:3001/jobs", job, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Job posted successfully!");
      handleClose();
      setNewJob({
        title: '',
        description: '',
        requirements: '',
        job_type: 'Full-time',
        location: '',
        salary: '',
        job_category: 'Development',
      });
    } catch (error) {
      console.error("Failed to post job:", error);
      alert("There was a problem submitting the job.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Job</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Job Type</Form.Label>
                <Form.Select
                  name="job_type"
                  value={newJob.job_type}
                  onChange={handleChange}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={newJob.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Salary Range</Form.Label>
                <Form.Control
                  type="text"
                  name="salary"
                  value={newJob.salary}
                  onChange={handleChange}
                  placeholder="e.g. $80,000 - $100,000"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="job_category"
              value={newJob.job_category}
              onChange={handleChange}
              required
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newJob.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Requirements</Form.Label>
            <Form.Control
              as="textarea"
              name="requirements"
              value={newJob.requirements}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Job
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddJobForm;