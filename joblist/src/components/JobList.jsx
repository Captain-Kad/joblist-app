import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, Form, Button, Alert } from 'react-bootstrap';
import JobCard from './JobCard';
import JobFilter from './JobFilter';
import AddJobForm from './AddJobForm';
import initialJobs from '../data/initialJobs';

const JobList = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    jobType: '',
    category: '',
    location: ''
  });

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, jobs]);

  const applyFilters = () => {
    let result = [...jobs];
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply job type filter
    if (filters.jobType) {
      result = result.filter(job => job.job_type === filters.jobType);
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(job => job.job_category === filters.category);
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }
    
    setFilteredJobs(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      jobType: '',
      category: '',
      location: ''
    });
    setSearchTerm('');
  };

  const addJob = (newJob) => {
    setJobs(prev => [newJob, ...prev]);
  };

  return (
    <main className="bg-light py-5 flex-grow-1">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <h2 className="mb-3 mb-md-0">Available Job Listings</h2>
          <Button 
            variant="primary"
            onClick={() => setShowAddForm(true)}
            className="d-flex align-items-center"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Post New Job
          </Button>
        </div>
        
        <InputGroup className="mb-4" size="lg">
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for jobs by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <JobFilter 
          onFilterChange={handleFilterChange} 
          clearFilters={clearFilters}
          filters={filters}
        />
        
        <p className="text-muted mb-4">{filteredJobs.length} jobs found</p>
        
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job.job_id} job={job} />
          ))
        ) : (
          <Alert variant="light" className="text-center py-4">
            <p className="mb-3">No jobs found matching your criteria.</p>
            <Button 
              variant="outline-primary"
              onClick={clearFilters}
            >
              Clear filters and try again
            </Button>
          </Alert>
        )}
        
        {/* Add Job Modal Form */}
        <AddJobForm 
          show={showAddForm}
          handleClose={() => setShowAddForm(false)}
          addJob={addJob}
        />
      </Container>
    </main>
  );
};

export default JobList;