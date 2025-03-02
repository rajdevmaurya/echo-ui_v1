import React from 'react';
import { Link } from 'react-router-dom';
import CustomLogo from '../shared/CustomLogo';
import Button from '../UI/Button';

function NewJobCard({ job, jobUrl, isCollection = false, showDialog }) {
  const jobLink = jobUrl ? `${jobUrl}${job.id}` : '#';

  return (
    <div className="col s12 m6">
      <div className="card-panel">
        <Link to={jobLink} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="row valign-wrapper" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
            
            {/* Logo Section (Reduced width in desktop) */}
            <div className="col s12 m3 center-align" style={{ marginBottom: '10px' }}>
              <CustomLogo logoUrl={job.logoUrl} />
            </div>

            {/* Details Section (Expanded width in desktop) */}
            <div className="col s12 m9" style={{ textAlign: 'left' }}>
              <div className="job-details">
                <div className="truncate job-title" style={{ fontWeight: 'bold' }}>{job.title}</div>
                <div className="truncate job-title">Brand: {job.brand}</div>
                <div className="divider"></div>
                <div className="truncate job-title">{job.company}</div>
                <div className="truncate job-title">{job.featureDescription}</div>
                <div className="divider"></div>
                <div className="truncate job-title">{job.description}</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Delete Button (Outside of Link) */}
        {isCollection && (
          <div className="right-align">
            <Button 
              className="red lighten-4" 
              variant="icon" 
              onClick={(e) => { 
                e.stopPropagation();
                showDialog(job);
              }}
            >
              <i className="material-icons" style={{ color: 'var(--red)' }}>delete</i>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewJobCard;
