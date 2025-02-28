import React, { Component, createContext } from 'react';
import API from '../utils/api';
import M from 'materialize-css';

export const JobContext = createContext();

export default class JobProvider extends Component {
  state = {
    jobs: [],
    pagination: {
      first: null,
      last: null,
      number: null,
      size: null,
      totalElements: null,
      totalPages: null
    },
    searchText: '',
    isHomePage: false,
    currentPath: window.location.pathname
  };

  pageDefaultNumber = 0;
  pageDefaultSize = 10;

  componentDidMount() {
    this.handleJobFetching();
    window.addEventListener('popstate', this.handleJobFetching);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.currentPath !== window.location.pathname) {
      this.handleRouteChange();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleRouteChange);
  }

  handleRouteChange = () => {
    window.scrollTo(0, 0); // Scroll to top on route change
    this.setState({ currentPath: window.location.pathname }, this.handleJobFetching);
  };

  handleJobFetching = () => {
    this.isHomePage = window.location.pathname === '/';
    if (this.isHomePage) {
      this.getNewestJobs();
    } else {
      this.getAllJobs(this.pageDefaultNumber, this.pageDefaultSize);
    }
  };

  getAllJobs = async (page, size) => {
    let lookup = window.location.pathname;
    let spath='jobs';
    if(lookup.startsWith("/collection/")){
       spath = 'jobs'+lookup;
    }

    API.get(`${spath}?page=${page}&size=${size}`)
      .then(response => {
        const { content, first, last, number, size, totalElements, totalPages } = response.data;
        this.setState({
          jobs: content,
          pagination: { first, last, number, size, totalElements, totalPages }
        });
      })
      .catch(error => {
        console.log(error);
        //M.toast({ html: error.message, classes: 'rounded' });
      });
  };

  getNewestJobs = async () => {
    try {
      const response = await API.get(`jobs/newest?number=8`);
      this.setState({ jobs: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
      M.toast({ html: error, classes: 'rounded' });
      return [];
    }
  };

  getJobsWithText = async (text, page, size) => {
    API.put(`jobs/search?page=${page}&size=${size}`, { text }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        const { content, first, last, number, size, totalElements, totalPages } = response.data;
        this.setState({
          jobs: content,
          pagination: { first, last, number, size, totalElements, totalPages }
        });
      })
      .catch(error => {
        console.log(error);
        M.toast({ html: error.message, classes: 'rounded' });
      });
  };

  getAllOrders = async () => {
    try {
      const response = await API.get(`orders`);
      console.log(response);
    } catch (error) {
      console.error(error);
      M.toast({ html: error, classes: 'rounded' });
      return [];
    }
  };

  searchJob = async (searchText, pageNumber, pageSize) => {
    this.setState({ searchText });
    if (searchText.trim() !== '') {
      this.getJobsWithText(searchText, pageNumber, pageSize);
    } else if (this.isHomePage) {
      this.getNewestJobs();
    } else {
      this.getAllJobs(pageNumber, pageSize);
    }
  };

  deleteJob = async (id) => {
    API.delete(`jobs/${id}`)
      .then(() => {
        M.toast({ html: 'Job deleted successfully', classes: 'rounded' });
        const { number, size } = this.state.pagination;
        this.getAllJobs(number, size);
      })
      .catch(error => {
        console.error(error);
        M.toast({ html: error, classes: 'rounded' });
      });
  };

  render() {
    return (
      <JobContext.Provider value={{
        ...this.state,
        getAllJobs: this.getAllJobs,
        getAllOrders: this.getAllOrders,
        getNewestJobs: this.getNewestJobs,
        getJobsWithText: this.getJobsWithText,
        searchJob: this.searchJob,
        deleteJob: this.deleteJob
      }}>
        {this.props.children}
      </JobContext.Provider>
    );
  }
}
