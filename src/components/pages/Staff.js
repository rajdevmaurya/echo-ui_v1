import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';

class Staff extends Component {
  static contextType = JobContext;

  componentDidMount() {
    const floatingActionButton = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(floatingActionButton, { direction: 'button' });
  }

  render() {
    const { jobs, searchJob, deleteJob, pagination, searchText } = this.context;

    return (
      <>
        <div className="container no-top-gap">
          <JobList
            jobs={jobs}
            root='staff'
            deleteJob={deleteJob}
            isCollection={true}
            pagination={pagination}
            searchText={searchText}
            searchJob={searchJob}
          />
        </div>

        <div className="fixed-action-btn">
          <Link className="btn-floating btn-large" style={{ backgroundColor: 'var(--secondary-color)' }} to={'/staff/jobs'}>
            <i className="material-icons">add</i>
          </Link>
        </div>
      </>
    );
  }
}

export default Staff;
