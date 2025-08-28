import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button, Spinner } from "react-bootstrap";
import JobTypeBadge from "../components/JobTypeBadge";

export default function JobDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error loading job:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id, token]);

  if (loading) return <p className="text-light">Loading…</p>;
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border"></Spinner>
        <span className="ms-3 text-light">Loadin job...</span>
      </div>
    );
  }
  if (!job) return <p className="text-danger">Job not found.</p>;

  return (
    <div className="container py-5">
      <Card className="shadow-lg">
        <Card.Body className="p-4">
          <Card.Title className="fs-2 fw-bold mb-3">{job.title}</Card.Title>

          <div className="d-flex flex-wrap text-muted mb-3 gap-4">
            <div>
              <i className="bi bi-geo-alt me-1"></i>
              {job.location}
            </div>
            <div>
              <i className="bi bi-briefcase me-1"></i>
              <JobTypeBadge type={job.job_type} />
            </div>
            <div>
              <i className="bi bi-currency-dollar me-1"></i>
              {job.salary}
            </div>
          </div>

          <hr />

          <h5 className="mb-2">Description</h5>
          <p>{job.description}</p>

          <h5 className="mt-4 mb-2">Requirements</h5>
          <p>{job.requirements}</p>

          <div className="d-flex justify-content-end mt-4">
            <Button
            //   href={job.job_url || "#"}
              target={job.job_url ? "_blank" : undefined}
              rel="noopener noreferrer"
              variant="primary"
            >
              Apply Now
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
