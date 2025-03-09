import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import JobList from '../shared/JobList';
import navigationLinks from '../layout/helper/navigationLinks';

const Collection = () => {
  const { category } = useParams();
  const { jobs, searchJob, pagination = {}, searchText, getJobWithCategory } = useContext(JobContext);

  useEffect(() => {
    let isMounted = true;

    const timeoutId = setTimeout(() => {
      if (!isMounted) return;

      const collectionCategories = navigationLinks
        .flatMap(link =>
          link.path.startsWith("/collection/")
            ? [link.path]
            : (link.dropdown ? link.dropdown.map(item => item.path) : [])
        )
        .map(path => path.split("/").pop());

      if (category && collectionCategories.includes(category)) {
        getJobWithCategory(category);
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [category, getJobWithCategory]);

  return (
    <div className="container collection-wrapper">
      <h2>
        {category ? category.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())
          : "All Collections"}
      </h2>

      <JobList
        jobs={jobs}
        pagination={pagination}
        searchText={searchText}
        searchJob={searchJob}
      />
    </div>
  );
};

export default Collection;
