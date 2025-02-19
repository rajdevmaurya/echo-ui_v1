import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import DeleteDialog from './DeleteDialog';
import JobCard from './JobCard';
import Pagination from '../UI/Pagination';
import classes from './JobList.module.css';

function JobList({ isCollection, root, jobs, hideDescription = true, deleteJob, featured, searchJob, pagination = {}, searchText }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const deleteModalRef = useRef(null);

  useEffect(() => {
    if (deleteModalRef.current) {
      M.Modal.init(deleteModalRef.current);
    }
  }, []);

  const showDialog = (job) => {
    setSelectedJob(job);

    // Reinitialize modal before opening
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = M.Modal.getInstance(modalElement) || M.Modal.init(modalElement);
      modalInstance.open();
    }
  };

  const path = root ? `/${root}/jobs/` : '/jobs/';
  const commonAttr = {
    jobUrl: path,
    hideDescription,
    deleteJob,
    showDialog
  };

  const collectionList = jobs.map(job => {
    return (
      <div className="collection-item" key={job.id}>
        <JobCard job={job} isCollection='true' {...commonAttr} />
      </div>
    );
  });

  return (
    <React.Fragment>
      {
        isCollection
          ?
          <div className='collection'>{collectionList}</div>
          :
          <div className={`${classes['cards-wrapper']} ${featured ? classes['featured-cards'] : ''}`}>
            {jobs.map((job) => <JobCard job={job} key={job.id} {...commonAttr} />)}
          </div>
      }


      {pagination.totalPages > 1 && (
        <Pagination
          className="center"
          pagination={pagination}
          searchText={searchText}
          searchJob={searchJob}
        />
      )}

      {/* Delete Dialog */}
      {deleteJob && <DeleteDialog job={selectedJob} deleteJob={deleteJob} />}
    </React.Fragment>
  );
}

export default JobList;;
