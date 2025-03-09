import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';

const Admin = () => {
  const { jobs = [], pagination, searchJob, handleDeleteJob, searchText } = useContext(JobContext);

  return (
    <div className="container">
      <h2>Admin</h2>
      <JobList
        jobs={jobs}
        root='admin'
        deleteJob={handleDeleteJob}
        pagination={pagination}
        searchText={searchText}
        searchJob={searchJob}
      />

      <div className='fixed-action-btn'>
        <Link
          className='btn-floating btn-large'
          style={{ backgroundColor: 'var(--secondary-color)' }}
          to={'/admin/jobs'}>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
