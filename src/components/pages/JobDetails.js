import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import Logo from '../shared/Logo';
import TimesAgo from '../utils/TimesAgo';
import API from '../utils/api';
import Button from '../UI/Button';
import { Link } from "react-router-dom";

const JobDetails = () => {
  const { job_id } = useParams(); // Access job_id from the URL
  const [job, setJob] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`jobs/${job_id}`, {
         // headers: {
         //   Authorization: `Bearer ${accessToken}`,
         // },
        });
        setJob(response.data);
      } catch (error) {
        console.error(error);
        M.toast({ html: error.message || 'Failed to fetch job details', classes: 'rounded' });
      }
    };

    fetchJob();
  }, [job_id, navigate]); // Add `navigate` as dependency

  return (
    <div className="container">
      {job && (
        <>
          <div className="common-img-header">
            <div >
              <Logo logoUrl={job.logoUrl} />
            </div>
            <div className="right-align">
              <ul>
                <li>{job.company}</li>
                <li>{job.id}</li>
                <li><TimesAgo createDate={job.createDate} /></li>
              </ul>
            </div>
          </div>
          <div className="divider" style={{ margin: '2rem 0' }}></div>
          <div  style={{ fontSize: '16px', fontWeight: 'bold', marginTop: 0 }}>{job.title}</div >
          <div>{job.description}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <Link to={`/collection`} varient="link">Go Back</Link> 
            <Button href={`/collection/jobs/${job.id}`} varient="link">Book/Inquiry Service Request</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;
