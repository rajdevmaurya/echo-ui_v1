import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import DeleteDialog from './DeleteDialog';
import JobCard from './JobCard';
import Pagination from '../UI/Pagination';
import classes from './JobList.module.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OrderCard from './OrderCard';

function JobList({
  root,
  jobs,
  deleteJob,
  featured,
  searchJob,
  pagination = {},
  searchText
}) {
  const [selectedJob, setSelectedJob] = useState(null);
  const deleteModalRef = useRef(null);
  const location = useLocation();
  const { getUser, userIsAuthenticated } = useAuth();

  //const isAdmin = userIsAuthenticated && getUser()?.role === 'ADMIN';

  useEffect(() => {
    if (deleteModalRef.current) {
      M.Modal.init(deleteModalRef.current);
    }
  }, []);

  const showDialog = (job) => {
    setSelectedJob(job);
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = M.Modal.getInstance(modalElement) || M.Modal.init(modalElement);
      modalInstance.open();
    }
  };

  const path = root ? `/${root}/jobs/` : '/jobs/';
  const commonAttr = {
    jobUrl: path,
    deleteJob,
    showDialog
  };

  if (jobs.length === 0) {
    return (
      <div className="center card" style={{ padding: '2rem' }}>
        <h6 className="uppercase">No record(s) found</h6>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={`${classes['cards-wrapper']} ${featured ? classes['featured-cards'] : ''}`}>
        {jobs.map((job) => {
          return location.pathname === '/my-orders'
            ?
            <OrderCard job={job} key={job.id} />
            :
            <JobCard job={job} key={job.id} {...commonAttr} />;
        })}
      </div>

      {/* Updated Pagination */}
      <Pagination
        className="center"
        pagination={pagination}
        searchText={searchText}
        searchJob={searchJob}
      />

      {/* Delete Dialog */}
      {deleteJob && <DeleteDialog job={selectedJob} deleteJob={deleteJob} />}
    </React.Fragment>
  );
}

export default JobList;
