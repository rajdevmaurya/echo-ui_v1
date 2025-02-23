import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import Logo from '../shared/Logo';
import TimesAgo from '../utils/TimesAgo';
import API from '../utils/api';
import Button from '../UI/Button';

const JobDetails = () => {
  const { job_id } = useParams(); // Access job_id from the URL
  const [job, setJob] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchJob = async () => {
      // Retrieve user from localStorage and parse the stored JSON to access the access token
     // const storedUser = localStorage.getItem('user');
      //if (!storedUser) {
      //  M.toast({ html: 'Please Login!', classes: 'green' });
      //  navigate('/login'); // Navigate to login if no user is found
      //  return;
      //}

     // const user = JSON.parse(storedUser);
      //const accessToken = user.accessToken; // Assuming accessToken is stored in the user object

    //  if (!accessToken) {
    //    M.toast({ html: 'Access token not found in user data', classes: 'rounded' });
     //   navigate('/login'); // Navigate to login if no access token is found
     //   return;
     // }

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
            <div>
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
          <h1 style={{ marginTop: '0' }}>{job.title}</h1>
          <div>{job.description}</div>
          <div className="right-align" style={{ marginTop: '2rem' }}>
            <Button href={`/collection/jobs/${job.id}`} varient='link'>Service Request</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;
