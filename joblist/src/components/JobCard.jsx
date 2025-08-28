import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import JobTypeBadge from "./JobTypeBadge";

const JobCard = ({ job }) => {
  const formattedDate = new Date(job.posted_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body className="p-4">
        <Row>
          <Col md={8}>
            <Card.Title className="fs-4 fw-bold mb-3">
              <Link
                to={`/jobs/${job.job_id}`}
                className="text-decoration-none text-dark"
              >
                {job.title}
              </Link>
            </Card.Title>
            <div className="d-flex flex-wrap align-items-center mb-3 gap-3">
              <div className="d-flex align-items-center text-muted">
                <i className="bi bi-geo-alt me-1"></i>
                <span>{job.location}</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-briefcase me-1"></i>
                <JobTypeBadge type={job.job_type} />
              </div>
            </div>
          </Col>
          <Col md={4} className="text-md-end">
            <div className="d-flex flex-column">
              <div className="text-muted mb-2">
                <i className="bi bi-currency-dollar me-1"></i>
                <span>{job.salary}</span>
              </div>
              <div className="text-muted">
                <i className="bi bi-calendar me-1"></i>
                <span>Posted {formattedDate}</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* <Card.Text className="my-3">
          {job.description}
        </Card.Text>
        
        <div className="mt-3">
          <h6 className="text-muted mb-2">Requirements:</h6>
          <Card.Text>{job.requirements}</Card.Text>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <span className="badge bg-light text-dark">{job.job_category}</span>
          </div>
          <Button 
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Apply Now
          </Button>
        </div> */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="badge bg-light text-dark">{job.job_category}</span>
          <Button as={Link} to={`/jobs/${job.job_id}`} variant="primary">
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
