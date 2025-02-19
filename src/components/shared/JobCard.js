import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
import TimesAgo from '../utils/TimesAgo';
import Button from '../UI/Button';
import classes from './JobCard.module.css';

function JobCard({ job, jobUrl, hideDescription, isCollection = false, showDialog, isFeatured = false }) {
  const cssClasses = `${classes['job-card']} ${isCollection ? classes['collection-card'] : ''} ${isFeatured ? classes['featured-card'] : ''}`;
  return (
    <div className={cssClasses}>
      <div className={`${classes['job-card-header']} common-img-header`}>
        <div className={`${classes['job-card-img']}`}>
          {jobUrl ?
            <Link to={`${jobUrl}${job.id}`}><Logo logoUrl={job.logoUrl} /></Link>
            :
            <Logo logoUrl={job.logoUrl} />
          }
        </div>
        <div className={`${classes['job-card-content']}`}>
          <div>
            <div className={`${classes['card-identifier']}`}>
              {jobUrl ?
                <h2><Link to={`${jobUrl}${job.id}`} className='black-text'>{job.company}</Link></h2>
                :
                <h2 className='black-text'>{job.company}</h2>
              }
            </div>
            {!isCollection && <div className={`${classes['card-time']}`}>
              <TimesAgo createDate={job.createDate} />
            </div>}
            <div className={`${classes['card-id']}`}>{job.id}</div>
          </div>
          {isCollection &&
            <Button className="red lighten-4" varient='icon' onClick={() => showDialog(job)}>
              <i className="material-icons" style={{ color: 'var(--red)' }}>delete</i>
            </Button>}
        </div>
      </div>
      {!isCollection && <div className='divider' style={{ margin: 0 }} />}
      <div className={`${classes['job-card-body']}`}>
        {jobUrl ?
          <h3 className="truncate flow-text"><Link className='black-text' to={`${jobUrl}${job.id}`}>{job.title}</Link></h3>
          :
          <h3 className="truncate flow-text black-text">{job.title}</h3>
        }
        {!hideDescription && <div className={`truncate ${classes['card-description']}`}>{job.description}</div>}
      </div>
    </div>
  );
}

export default JobCard;
