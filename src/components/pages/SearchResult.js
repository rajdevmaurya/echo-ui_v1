import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';

const SearchResult = () => {
  const { jobs, searchJob, pagination = {}, searchText } = useContext(JobContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.trim() || '';

  const fetchData = useCallback(async () => {
    if (!searchQuery) return;

    setLoading(true);
    searchJob(searchQuery);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container">
      <h2>{`Search Results for "${searchQuery}"`}</h2>

      {loading ? (
        <p className="center-align">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <JobList
          jobs={jobs}
          pagination={pagination}
          searchText={searchText}
          searchJob={searchJob}
        />
      ) : (
        <p className="center-align">No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
