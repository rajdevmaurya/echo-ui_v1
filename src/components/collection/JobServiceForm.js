import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import API from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../UI/Input';
import Button from '../UI/Button';

const JobServiceForm = () => {
  const [job, setJob] = useState({
    id: '',
    title: '',
    company: '',
    logoUrl: '',
    lookupType: '',
    brand: '',
    featureDescription: '',
    description: '',
    createDate: ''
  });

  const navigate = useNavigate();
  const { job_id } = useParams();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    M.updateTextFields();
    const textarea = document.getElementById('description');
    M.textareaAutoResize(textarea);
  }, [job]);

  useEffect(() => {
    // Check for the accessToken in localStorage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const accessToken = JSON.parse(storedUser).accessToken;
      if (accessToken) {
        fetchJobDetails(accessToken);
      } else {
        navigate('/login');
      }
    }

    M.Tabs.init(document.querySelectorAll('.tabs'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchJobDetails = async (accessToken) => {
    if (job_id) {
      try {
        const response = await API.get(`jobs/${job_id}`, {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        });
        const jobData = response.data;
        setJob({
          id: jobData.id,
          title: jobData.title,
          company: '',
          logoUrl: '',
          lookupType: '',
          brand: '',
          featureDescription: '',
          description: '',
          createDate: jobData.createDate
        });
      } catch (error) {
        console.log(error);
        M.toast({ html: error.message, classes: 'rounded' });
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setJob({
      ...job,
      [id]: value
    });
  };

  const redirectJobList = () => {
    navigate('/collection');
     M.toast({ html: 'Service request has been created successful!', classes: 'green' });
  };

  const cancleRequest = () => {
    M.toast({ html: 'Request has been Cancel!', classes: 'green' });
    navigate('/collection');
  };

  const saveJob = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = 'POST';
    const url = `${API_BASE_URL}/api/orders/jobRequest`;

    const storedUser = localStorage.getItem('user');
    const accessToken = JSON.parse(storedUser).accessToken;

    try {
      await API.request({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
        data: JSON.stringify(job)
      });
      redirectJobList();
    } catch (error) {
      console.log(error);
      M.toast({ html: error.message, classes: 'rounded' });
    }
  };

  const validateForm = () => {
    const fields = document.querySelectorAll('.validate');
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].value.trim() === '') {
        document.getElementById(fields[i].id).focus();
        return false;
      }
    }
    return true;
  };

  const mockJobIdAndCreateDate = () => {
    let mockJob = { ...job };
    mockJob.id = '1';
    mockJob.createDate = new Date();
    return mockJob;
  };

  const jobData = job.id ? job : mockJobIdAndCreateDate();
  const hasJobId = job.id;

  return (
    <div className="container no-top-gap">
      <div className="card">
        <div className="row">
          <ul className="tabs">
            <li className="tab col s6"><a className="active" href="#form">Request Form</a></li>
            <li className="tab col s6"><a href="#home-card-preview">Order Form</a></li>
          </ul>

          <div className="tab-content">
            <form onSubmit={saveJob} id="form">
              {hasJobId &&
                <Input disabled value={jobData.id} id="id" label='Id' />
              }

              <Input
                required
                label='Title'
                className="validate"
                value={job.title}
                id="title"
                onChange={handleChange}
                fieldErrorMsg='Title cannot be empty'
              />
              <Input
                required
                className="validate"
                value={jobData.company}
                id="company"
                onChange={handleChange}
                label='Company/Hospital Name'
                fieldErrorMsg='Company cannot be empty'
              />
              <Input
                value={jobData.logoUrl}
                id="logoUrl"
                type="text"
                onChange={handleChange}
                label='Address/Location'
              />
              <Input
                required
                className="validate"
                value={jobData.lookupType}
                id="lookupType"
                onChange={handleChange}
                label='Lookup Type'
                fieldErrorMsg='Lookup Typecannot be empty'
              />
             <Input
                required
                className="validate"
                value={jobData.brand}
                id="brand"
                onChange={handleChange}
                label='Brand'
                fieldErrorMsg='Brand cannot be empty'
              />

            <Input
              required
              className="materialize-textarea validate"
              value={jobData.featureDescription}
              id="featureDescription"
              onChange={handleChange} 
              type="textarea"
              label='Feature Description'
              fieldErrorMsg='Feature Description Typecannot be empty'
            />
              <Input
                required
                className="materialize-textarea validate"
                id="description"
                onChange={handleChange}
                value={jobData.description}
                type="textarea"
                label='Enter Service Request Summary'
                fieldErrorMsg='Enter Service Request Summary'
              />

              <div className="right-align">
                <Button varient='text' onClick={cancleRequest}>Cancel</Button>
                <Button type='submit' onClick={saveJob}>Submit</Button>
              </div>
            </form>

            <div id="home-card-preview">
              {/* Similar Order Form */}
            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default JobServiceForm;
