import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';

class AdminForm extends Component {
  static contextType = JobContext;

  componentDidMount() {
    const floatingActionButton = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(floatingActionButton, {
      direction: 'button',
    });

    const { getAllJobs, pageDefaultNumber, pageDefaultSize } = this.context;
    getAllJobs(pageDefaultNumber, pageDefaultSize);
  }

  componentWillUnmount() {
    if (this.floatingActionBtn && this.floatingActionBtn.length) {
      this.floatingActionBtn.forEach(instance => instance.destroy());
    }
  }

  render() {
    const { jobs = [], pagination, searchJob, deleteJob, searchText } = this.context;

    return (
      <React.Fragment>
        <JobList
          jobs={jobs}
          root='admin'
          deleteJob={deleteJob}
          isCollection={true}
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
      </React.Fragment>
    );
  }
}

export default AdminForm;
