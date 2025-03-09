import React, { useContext, useEffect } from 'react';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';

const MyOrders = () => {
  const { jobs, searchJob, pagination = {}, searchText, getMyOrders } = useContext(JobContext);

  useEffect(() => {
    let isMounted = true;

    const timeoutId = setTimeout(() => {
      if (!isMounted) return;
      getMyOrders();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [getMyOrders]);

  return (
    <div className="container">
      <JobList
        jobs={jobs}
        pagination={pagination}
        searchText={searchText}
        searchJob={searchJob}
      />
    </div>
  );
};

export default MyOrders;
