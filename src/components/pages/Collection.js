import React, { Component } from 'react';
import M from 'materialize-css';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';

class MyCollection extends Component {
  static contextType = JobContext;

  componentDidMount() {
    const floatingActionButton = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(floatingActionButton, { direction: 'button' });
  }

  render() {
    const { jobs, searchJob, pagination = {}, searchText } = this.context;

    return (
      <div className="container no-top-gap">
        <JobList jobs={jobs}
          hideDescription={false}
          pagination={pagination}
          searchText={searchText}
          searchJob={searchJob} />
      </div>
    );
  }
}

export default MyCollection
