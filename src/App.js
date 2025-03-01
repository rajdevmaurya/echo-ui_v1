import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
//import JobForm from './components/staff/JobForm';
import JobServiceForm from './components/collection/JobServiceForm';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';
import JobAdminForm from './components/admin/JobForm';
import JobProvider from './components/context/JobContext';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
//import Staff from './components/pages/Staff';
import Admin from './components/pages/Admin';
import JobDetails from './components/pages/JobDetails';

import Collection from './components/pages/Collection';


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
        <section>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />

              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/collection' element={<Collection />} />
              <Route path='/collection/jobs/:job_id' element={<JobServiceForm />} />
              <Route path='/jobs/:job_id' element={<JobDetails />} />

              <Route path='/collection/:lookup' element={<Collection />} />
              {/**
              <Route path='/collection/de' element={<Collection />} />
              <Route path='/collection/xray' element={<Collection />} />
              <Route path='/collection/usm' element={<Collection />} />
              
              <Route path='/collection/orthopedics' element={<Collection />} />
              <Route path='/collection/tools' element={<Collection />} />
              <Route path='/collection/tms' element={<Collection />} />
              <Route path='/collection/medicines' element={<Collection />} />
              
              <Route path='/staff' element={<PrivateRoute><Staff /></PrivateRoute>} />
              <Route path='/staff/jobs' element={<PrivateRoute><JobForm /></PrivateRoute>} />
              <Route path='/staff/jobs/:job_id' element={<PrivateRoute><JobForm /></PrivateRoute>} />
            */}
              <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
              <Route path='/admin/jobs' element={<PrivateRoute><JobAdminForm /></PrivateRoute>} />
              <Route path='/admin/jobs/:job_id' element={<PrivateRoute><JobAdminForm /></PrivateRoute>} />

            </Routes>
          </main>
        </section>
        <Footer />
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
