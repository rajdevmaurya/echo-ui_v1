import React, { Component } from 'react';
//import { withOktaAuth } from '@okta/okta-react'
import M from 'materialize-css';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';

class Customer extends Component {
  static contextType = JobContext;

  componentDidMount() {
    const floatingActionButton = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(floatingActionButton, { direction: 'button' });
  }

  render() {
    const { jobs, searchJob, pagination = {}, searchText } = this.context;

    return (
      <div className="container">
        <JobList jobs={jobs}
          hideDescription={false}
          pagination={pagination}
          searchText={searchText}
          searchJob={searchJob} />
      </div>
    );
  }
}

export default Customer;//withOktaAuth(Customer)
