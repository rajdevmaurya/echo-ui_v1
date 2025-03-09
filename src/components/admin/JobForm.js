import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api';
import JobCard from '../shared/JobCard';
import Button from '../UI/Button';
import Input from '../UI/Input';

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

  /* set scroll-height to textarea */
  useEffect(() => {
    M.updateTextFields();
    const textarea = document.getElementById('description');
    if (textarea) {
      M.textareaAutoResize(textarea);
    }
  }, [job]);

  /* Fetch Job Details */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const accessToken = storedUser ? JSON.parse(storedUser).accessToken : null;

    if (!accessToken) {
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    const fetchJobDetails = async () => {
      if (job_id) {
        try {
          const response = await API.get(`jobs/${job_id}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          const jobData = response.data;
          setJob({
            id: jobData.id,
            title: jobData.title,
            company: jobData.company,
            logoUrl: jobData.logoUrl,
            lookupType: jobData.lookupType,
            brand: jobData.brand,
            featureDescription: jobData.featureDescription,
            description: jobData.description,
            createDate: jobData.createDate
          });
        } catch (error) {
          console.error(error);
          M.toast({ html: error.message, classes: 'rounded' });
        }
      }
    };

    fetchJobDetails();

    M.Tabs.init(document.querySelectorAll('.tabs'));
  }, [job_id, navigate]);

  /* Handle Input Change */
  const handleChange = (e) => {
    const { id, value } = e.target;
    setJob((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  /* Validate Form Fields */
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

  /* Save or Update Job */
  const saveJob = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const method = job.id ? 'PUT' : 'POST';
    const url = job.id ? `${process.env.REACT_APP_BASE_URL}/api/jobs/${job.id}` : `${process.env.REACT_APP_BASE_URL}/api/jobs`;
    const storedUser = localStorage.getItem('user');
    const accessToken = storedUser ? JSON.parse(storedUser).accessToken : null;
    const msg = job.id ? 'Updated successful!' : 'Added successful!';

    if (!accessToken) {
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    try {
      await API.request({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        data: JSON.stringify(job)
      });

      M.toast({ html: msg, classes: 'green' });
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (error) {
      console.error(error);
      M.toast({ html: error.message, classes: 'rounded' });
    }
  };

  /* Cancel Handler */
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };


  const mockJobIdAndCreateDate = () => {
    return {
      ...job,
      id: 'XXXXXXXXXXXXXXXXXXXXXXXX',
      createDate: new Date()
    };
  };

  const form = (
    <form onSubmit={saveJob}>
      {job.id &&
        <Input type="hidden" disabled value={job.id} id="id" />
      }
      <Input
        required
        className="validate"
        value={job.title}
        id="title"
        onChange={handleChange}
        label='Title'
        fieldErrorMsg='Title cannot be empty'
      />
      <Input
        required
        className="validate"
        value={job.company}
        id="company"
        onChange={handleChange}
        label='Company'
        fieldErrorMsg='Company cannot be empty'
      />
      <Input
        className="validate"
        value={job.logoUrl}
        id="logoUrl"
        onChange={handleChange}
        label='Logo Url'
      />
      <Input
        required
        className="validate"
        value={job.lookupType}
        id="lookupType"
        onChange={handleChange}
        label='Lookup Type'
        fieldErrorMsg='Lookup Typecannot be empty'
      />
      <Input
        required
        className="validate"
        value={job.brand}
        id="brand"
        onChange={handleChange}
        label='Brand'
        fieldErrorMsg='Brand Typecannot be empty'
      />
     <Input
        required
        className="validate"
         type='textarea'
        value={job.featureDescription}
        id="featureDescription"
        onChange={handleChange}
        label='Feature Description'
        fieldErrorMsg='Feature Description Typecannot be empty'
      />
      <Input
        required
        type='textarea'
        className="validate"
        value={job.description}
        id="description"
        onChange={handleChange}
        label='Description'
        fieldErrorMsg='Description cannot be empty'
      />
      <div className="right-align">
        <Button variant='text' handleClick={cancelHandler}>Cancel</Button>
        <Button type='submit' handleClick={saveJob}>Save</Button>
      </div>
    </form>
  );

  const jobData = job.id ? job : mockJobIdAndCreateDate();

  return (
    <div className="container no-top-gap">
      <div className='card'>
        <div className="row">
          <ul className="tabs">
            <li className="tab col s4">
              <a className="active" href="#form">Form</a>
            </li>
            <li className="tab col s4">
              <a href="#home-card-preview">Home Card Preview</a>
            </li>
            <li className="tab col s4">
              <a href="#service-card-preview">Service Card Preview</a>
            </li>
          </ul>
          <div className="tab-content">
            <div id="form">
              {form}
            </div>
            <div id="home-card-preview">
              <JobCard job={jobData} isFeatured={true} />
            </div>
            <div id="service-card-preview">
              <JobCard job={jobData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobServiceForm;
