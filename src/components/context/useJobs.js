import { useState, useEffect, useCallback } from "react";
import { fetchJobs, searchJobs, deleteJob } from "./jobService";
import { useLocation } from "react-router-dom";
import { useAuth } from './AuthContext';
import navigationLinks from '../layout/helper/navigationLinks';

const pageDefaultNumber = 0;
const pageDefaultSize = 10;

const useJobs = (category) => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    first: true,
    last: false,
    number: pageDefaultNumber,
    size: pageDefaultSize,
    totalElements: 0,
    totalPages: 1,
  });
  const [searchText, setSearchText] = useState('');

  const { getUser, userIsAuthenticated } = useAuth();
  const location = useLocation();
  const extractedCategory = category || location.pathname.split("/").pop();
  const isAdmin = userIsAuthenticated && getUser()?.role === 'ADMIN';
  

  const collectionCategories = navigationLinks
    .flatMap((link) => (link.dropdown ? link.dropdown.map((item) => item.path) : []))
    .filter((path) => path.startsWith("/collection/"))
    .map((path) => path.split("/").pop());

  const isValidCategory = extractedCategory && collectionCategories.includes(extractedCategory);

  useEffect(() => {
    const currentPath = location.pathname;
    window.scrollTo(0, 0);

    if (currentPath === "/") {
      getNewestJobs();
    } else if (currentPath === "/my-orders") {
      getMyOrders();
    } else if (isValidCategory) {
      getJobWithCategory(extractedCategory);
    } else {
      getAllJobs();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const loadJobs = useCallback(async (url, page) => {
    const data = await fetchJobs(url);
    if (data) {
      const { content, first, last, number, size, totalElements, totalPages } = data;
      setJobs(content || data);
      setPagination({ first, last, number: page !== undefined ? page : number, size, totalElements, totalPages });
    }
  }, []);

  const getAllJobs = useCallback((page = pageDefaultNumber, size = pageDefaultSize) => {
    loadJobs(`jobs?page=${page}&size=${size}`, page);
  }, [loadJobs]);

  const getNewestJobs = useCallback((page = pageDefaultNumber) => {
    loadJobs("jobs/newest?number=8", page);
  }, [loadJobs]);

  const getJobsWithText = useCallback(async (text, page = pageDefaultNumber, size = pageDefaultSize) => {
    const data = await searchJobs(text, page, size);
    if (data) {
      const { content, first, last, number, size: responseSize, totalElements, totalPages } = data;
      setJobs(content);
      setPagination({ first, last, number, size: responseSize, totalElements, totalPages });
    }
  }, []);

  const getJobWithCategory = useCallback((category, page = pageDefaultNumber, size = pageDefaultSize) => {
    loadJobs(`jobs/collection/${category}?page=${page}&size=${size}`, page);
  }, [loadJobs]);

  const getMyOrders = useCallback((page = pageDefaultNumber, size = pageDefaultSize) => {
    //const url = isAdmin ? `orders?page=${page}&size=${size}` : "orders/myorder/1";
    if(isAdmin){
    loadJobs(`orders?page=${page}&size=${size}`, page);
  }else{
    const storedUser = localStorage.getItem('user');
    const userId = storedUser ? JSON.parse(storedUser).loginUserName : null;
    loadJobs(`orders/myorder/${userId}`);
  }
  }, [isAdmin, loadJobs]);

  const searchJob = useCallback((text, page = pageDefaultNumber, size = pageDefaultSize) => {
    setSearchText(text);

    if (isValidCategory) {
      text.trim() ? getJobsWithText(text, page, size) : getJobWithCategory(extractedCategory, page, size);
    } else if (location.pathname === "/my-orders") {
      text.trim() ? getJobsWithText(text, page, size) : getMyOrders(page, size);
    } else {
      text.trim() ? getJobsWithText(text, page, size) : getAllJobs(page, size);
    }
  }, [isValidCategory, extractedCategory, getJobsWithText, getJobWithCategory, getMyOrders, getAllJobs, location.pathname]);

  const handleDeleteJob = useCallback(async (id) => {
    const success = await deleteJob(id);
    if (success) {
      getAllJobs(pagination.number, pagination.size);
    }
  }, [pagination, getAllJobs]);

  return {
    jobs,
    pagination,
    searchText,
    getAllJobs,
    getNewestJobs,
    getJobsWithText,
    getJobWithCategory,
    getMyOrders,
    searchJob,
    handleDeleteJob,
  };
};

export default useJobs;
