import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
import TimesAgo from '../utils/TimesAgo';
import Button from '../UI/Button';
import classes from './JobCard.module.css';

function JobCard({ job, jobUrl, hideDescription, isCollection = false, showDialog, isFeatured = false }) {
  const cssClasses = `${classes['job-card']} ${isCollection ? classes['collection-card'] : ''} ${isFeatured ? classes['featured-card'] : ''}`;

  // Conditional wrapper to make the entire card clickable
  const CardWrapper = ({ children }) => (
    jobUrl ? <Link to={`${jobUrl}${job.id}`} className={cssClasses} style={{ textDecoration: 'none', color: 'inherit' }}>{children}</Link> 
           : <div className={cssClasses}>{children}</div>
  );

  return (
    <CardWrapper>
      <div className={`${classes['job-card-header']} common-img-header`}>
        <div className={`${classes['job-card-img']}`}>
          <Logo logoUrl={job.logoUrl} />
        </div>
        <div className={`${classes['job-card-content']}`}>
          <div>
          <div className={`${classes['card-id']}`}  style={{ fontWeight: 'bold' }}>{job.title}</div>
            <div className={`${classes['card-identifier']}`}>
              <h2 className='black-text'>{job.brand}</h2>
            </div>
            {/*!isCollection && <div className={`${classes['card-time']}`}>
              <TimesAgo createDate={job.createDate} />
            </div>}
            <div className={`${classes['card-id']}`}>{job.id}</div> */}
          </div>
          {isCollection && (
            <Button className="red lighten-4" varient='icon' onClick={(e) => { 
              e.stopPropagation(); // Prevent navigation when clicking delete
              showDialog(job);
            }}>
              <i className="material-icons" style={{ color: 'var(--red)' }}>delete</i>
            </Button>
          )}
        </div>
      </div>
      {!isCollection && <div className='divider' style={{ margin: 0 }} />}
      <div className={`${classes['job-card-body']}`}>
      <div className={`truncate ${classes['card-description']}`}>{job.description}</div>
      </div>
    </CardWrapper>
  );
}

export default JobCard;
