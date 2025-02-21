import React, { useEffect, useContext } from 'react';
import M from 'materialize-css';
import { useNavigate, useParams } from 'react-router-dom';
import Customer from './Customer';
import { JobContext } from '../context/JobContext';
import AdminForm from '../admin/AdminForm';

const Admin = () => {
  const { getAllJobs } = useContext(JobContext);
  const navigate = useNavigate();
  const { job_id } = useParams();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/login');
        return;
      }

      try {
        const accessToken = JSON.parse(storedUser).accessToken;
        if (accessToken) {
          await getAllJobs();
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    };

    checkUserAuthentication();

    // Initialize Materialize Tabs
    const tabs = document.querySelectorAll('.tabs');
    const tabsInstance = M.Tabs.init(tabs);

    return () => {
      if (tabsInstance && tabsInstance.length) {
        tabsInstance.forEach((instance) => instance.destroy());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, job_id]);

  return (
    <div className="container no-top-gap">
      <div className="card">
              <AdminForm />
      </div>
    </div>
  );
};

export default Admin;
