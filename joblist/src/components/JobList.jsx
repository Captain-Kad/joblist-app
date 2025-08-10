import React, { useState, useEffect } from "react";
import {
  Container,
  InputGroup,
  Form,
  Button,
  Alert,
  Pagination,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import JobCard from "./JobCard";
import JobFilter from "./JobFilter";
import AddJobForm from "./AddJobForm";

// Number of jobs to show per page
const JOBS_PER_PAGE = 5;

const JobList = () => {
  // Main job list fetched from the backend
  const [jobs, setJobs] = useState([]);

  // Filtered jobs based on search and filters
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Search bar input
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle for job posting modal
  const [showAddForm, setShowAddForm] = useState(false);

  // Selected filter options
  const [filters, setFilters] = useState({
    jobType: "",
    category: "",
    location: "",
  });

  // Currently viewed pagination page
  const [currentPage, setCurrentPage] = useState(1);

  // Loading state while fetching jobs
  const [loading, setLoading] = useState(true);

  // ⬇️ Fetch jobs from the backend API on initial render
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3001/jobs");
        setJobs(res.data);           // Save full job list
        setFilteredJobs(res.data);   // Also initialize filtered list
        setLoading(false);           // Stop loading spinner
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ⬇️ Apply filters and search term whenever input or job list changes
  useEffect(() => {
    let result = [...jobs];

    // Search by title or description
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by job type
    if (filters.jobType) {
      result = result.filter((job) => job.job_type === filters.jobType);
    }

    // Filter by category
    if (filters.category) {
      result = result.filter((job) => job.job_category === filters.category);
    }

    // Filter by location
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }

    // Update filtered job list and reset to first page
    setFilteredJobs(result);
    setCurrentPage(1);
  }, [searchTerm, filters, jobs]);

  // ⬇️ Update filter state on dropdown change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ⬇️ Clear all filters and search input
  const clearFilters = () => {
    setFilters({
      jobType: "",
      category: "",
      location: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // ⬇️ Add a new job to the local job list
  // This is called after a recruiter submits a new job from AddJobForm
  const addJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  // ⬇️ Pagination logic
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);
  const startIdx = (currentPage - 1) * JOBS_PER_PAGE;
  const jobsToDisplay = filteredJobs.slice(startIdx, startIdx + JOBS_PER_PAGE);

  // ⬇️ Renders the pagination buttons based on total pages
  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
  };

  return (
    <main className="bg-light py-5 flex-grow-1">
      <Container>
        {/* Header and Post Job button */}
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

        {/* Search bar */}
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

        {/* Filter bar with dropdowns */}
        <JobFilter
          onFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          filters={filters}
        />

        {/* Job count */}
        <p className="text-muted mb-4">{filteredJobs.length} jobs found</p>

        {/* Job cards or loading or empty state */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
            <p className="mt-3">Loading jobs...</p>
          </div>
        ) : jobsToDisplay.length > 0 ? (
          jobsToDisplay.map((job) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <Alert variant="light" className="text-center py-4">
            <p className="mb-3">No jobs found matching your criteria.</p>
            <Button variant="outline-primary" onClick={clearFilters}>
              Clear filters and try again
            </Button>
          </Alert>
        )}

        {/* Page number buttons */}
        {totalPages > 1 && renderPagination()}

        {/* Modal form to post a new job */}
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
