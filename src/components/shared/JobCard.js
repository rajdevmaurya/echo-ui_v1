import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
import Button from '../UI/Button';
import classes from './JobCard.module.css';

function JobCard({ job, jobUrl, showDialog, isFeatured = false, deleteJob }) {
  const WrapperComponent = jobUrl ? Link : 'div';
  const wrapperProps = jobUrl ? { to: `${jobUrl}${job.id}` } : {};

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    showDialog(job);
  };

  return (
    <div
      className={`${classes['job-card']} ${deleteJob ? classes['admin-card'] : ''} ${isFeatured ? classes['featured-card'] : ''}`}
      style={WrapperComponent === 'div' ? { padding: '1rem' } : undefined}
    >
      <WrapperComponent {...wrapperProps} className={`black-text ${classes["job-card-content"]}`}>
        {/* Job Card image */}
        <div className={classes["job-card-img"]}>
          <Logo logoUrl={job?.logoUrl} />
        </div>
        {/* Job Card Body */}
        <div className={classes["job-card-body"]}>
          <div className={classes["job-card-header"]}>
            <div>
              <h2 className="black-text">{job?.title}</h2>
              <p>Brand: <strong>{job?.brand}  </strong> ,  Price: <strong>{job?.price}</strong> </p>
            </div>
            
            {/* Delete button */}
            {deleteJob && (
              <Button
                style={{ justifySelf: 'flex-end', backgroundColor: "var(--red-2)", borderRadius: '50%' }}
                variant="icon"
                handleClick={handleDeleteClick}
              >
                <i className="material-icons" style={{ fontSize: '1.5rem', color: '#fff' }}>delete</i>
              </Button>
            )}
          </div>
          <div className="divider" style={{ margin: '1rem 0' }} />
          <div className='pre-text two-lines-truncate'>{job?.featureDescription}</div>
          <div className="divider" style={{ margin: '1rem 0' }} />
          <div className={`two-lines-truncate`}>{job?.description}</div>
        </div>
      </WrapperComponent>
    </div>
  );
}

export default React.memo(JobCard);
