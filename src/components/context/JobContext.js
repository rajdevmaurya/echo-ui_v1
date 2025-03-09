import React, { createContext } from 'react';
import useJobs from './useJobs';
import { useLocation } from 'react-router-dom';

const initialState = {
  jobs: [],
  pagination: {},
  searchText: '',
  currentPath: window.location.pathname,
  getAllJobs: () => { },
  getNewestJobs: () => { },
  getJobsWithText: () => { },
  getJobWithCategory: () => { },
  getMyOrders: () => { },
  searchJob: () => { },
  deleteJob: () => { },
};

export const JobContext = createContext(initialState);

const JobProvider = ({ children }) => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const category = pathParts.includes("collection") ? pathParts[pathParts.length - 1] : null;

  const jobData = useJobs(category);

  return (
    <JobContext.Provider value={jobData}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;
