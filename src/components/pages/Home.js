import React, { Component } from 'react';
import M from 'materialize-css';
import { JobContext } from '../context/JobContext';
import ImageScroller from '../utils/ImageScroller/ImageScroller';
import JobList from '../shared/JobList';

const scrollerImages = [
  `${process.env.PUBLIC_URL}/images/slide1.jpg`,
  `${process.env.PUBLIC_URL}/images/slide2.jpg`,
  `${process.env.PUBLIC_URL}/images/slide3.jpg`,
];

class Home extends Component {
  static contextType = JobContext;

  componentDidMount() {
    // Initialize Materialize Parallax
    setTimeout(() => {
      const elems = document.querySelectorAll('.parallax');
      if (elems.length) {
        M.Parallax.init(elems);
      }
    }, 100);
  }

  render() {
    const { jobs, searchJob, searchText } = this.context;

    return (
      <React.Fragment>
        <ImageScroller images={scrollerImages} />
        <section className="section">
        <div className="container no-top-gap">
            <JobList
              jobs={jobs}
              featured={true}
              searchText={searchText}
              searchJob={searchJob}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
