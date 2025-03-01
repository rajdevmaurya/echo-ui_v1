import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import Logo from '../shared/Logo';
import TimesAgo from '../utils/TimesAgo';
import API from '../utils/api';
import './JobDetails.css'; // New CSS file for styling

const JobDetails = () => {
  const { job_id } = useParams(); 
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`jobs/${job_id}`);
        setJob(response.data);
      } catch (error) {
        console.error(error);
        M.toast({ html: error.message || 'Failed to fetch job details', classes: 'rounded' });
      }
    };
    fetchJob();
  }, [job_id, navigate]);

  return (
    <div className="container no-top-gap job-container">
      {job && (
        <>
          {/* Responsive Two-Section Layout */}
          <div className="job-content">
            {/* Logo Section */}
            <div className="job-logo">
              <Logo logoUrl={job.logoUrl} className="logo-img" />
            </div>

            {/* Job Details Section */}
            <div className="job-details">
              <div className="job-header">
                <h2>{job.title}</h2>
                <Link to={`/collection`} className="go-back-link">Go Back</Link>
              </div>
              
              <div className="divider"></div>

              <div className="job-info">
                <div><strong>Company:</strong> {job.company}</div>
                <div><strong>Job ID:</strong> {job.id}</div>
                <div><strong>Created:</strong> <TimesAgo createDate={job.createDate} /></div>
                <div><strong>Feature Section:</strong> {job.featureDescription}</div>
              </div>

              <div className="divider"></div>

              {/* Buttons */}
              <div className="job-buttons">
                <Link to={`/collection/jobs/${job.id}`} className="btn custom-dark-green">Inquiry</Link>
                <Link to={`/collection/jobs/${job.id}`} className="btn custom-dark-green">Book Service</Link>
              </div>
            </div>
          </div>

          <div className="divider"></div>
          <div>{job.description}</div>
        </>
      )}
    </div>
  );
};

export default JobDetails;
