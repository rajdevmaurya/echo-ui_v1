import React from 'react';
import Logo from '../shared/Logo';
import classes from './JobCard.module.css';

function OrderCard({ job }) {
  return (
    <div className={`${classes['job-card']}`} style={{ padding: '1rem' }}>
      <div className={`black-text ${classes["job-card-content"]}`}>
        {/* Job Card image */}
        <div className={classes["job-card-img"]}>
          <Logo logoUrl={job?.logoUrl} />
        </div>
        {/* Job Card Body */}
        <div className={classes["job-card-body"]}>
          <h2 className="black-text">{job?.title}</h2>
          <p>Brand: <strong>{job?.company}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(OrderCard);
