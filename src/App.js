import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
//import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
//import { Security, SecureRoute, LoginCallback } from '@okta/okta-react'
//import { useHistory } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import JobForm from './components/staff/JobForm';
import JobServiceForm from './components/customer/JobServiceForm';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';

import JobAdminForm from './components/admin/JobForm';
import JobProvider from './components/context/JobContext';

import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Customer from './components/pages/Customer';
import Staff from './components/pages/Staff';
import Admin from './components/pages/Admin';
import JobDetails from './components/pages/JobDetails';


function App() {
  //const oktaAuth = new OktaAuth({
  //  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  //  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  //  redirectUri: `${window.location.origin}/implicit/callback`
  //})

  //const history = useHistory();
  // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  //  history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  //};

  return (
    <AuthProvider>
      <JobProvider>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/customer' element={<Customer />} />
            <Route path='/customer/jobs/:job_id' element={<JobServiceForm />} />
            <Route path='/jobs/:job_id' element={<JobDetails />} />

            <Route path='/staff' element={<PrivateRoute><Staff /></PrivateRoute>} />
            <Route path='/staff/jobs' element={<PrivateRoute><JobForm /></PrivateRoute>} />
            <Route path='/staff/jobs/:job_id' element={<PrivateRoute><JobForm /></PrivateRoute>} />

            <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path='/admin/jobs' element={<PrivateRoute><JobAdminForm /></PrivateRoute>} />
            <Route path='/admin/jobs/:job_id' element={<PrivateRoute><JobAdminForm /></PrivateRoute>} />

          </Routes>
        </main>
        <Footer />
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
