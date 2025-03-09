import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobServiceForm from './components/collection/JobServiceForm';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';
import JobAdminForm from './components/admin/JobForm';
import JobProvider from './components/context/JobContext';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import JobDetails from './components/pages/JobDetails';

import Collection from './components/pages/Collection';
// import PublicLayout, { AdminLayout, CollectionLayout, JobsLayout } from './components/pages/Layouts';
import CommonLayout from './components/pages/Layouts';
import MyOrders from './components/pages/MyOrders';
import SearchResult from './components/pages/SearchResult';


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
        <Routes>
          {/* Public Routes */}
          <Route element={<CommonLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/my-orders" element={<PrivateRoute showForUseer={true}><MyOrders /></PrivateRoute>} />
          </Route>

          {/* Collection Routes */}
          <Route element={<CommonLayout />}>
            <Route path="/collection" element={<Collection />} />
            <Route path="/collection/:category" element={<Collection />} />
            <Route path="/collection/jobs/:job_id" element={<JobServiceForm />} />
          </Route>

          {/* Job Details Route (Separate Layout) */}
          <Route element={<CommonLayout />}>
            <Route path="/jobs/:job_id" element={<JobDetails />} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route element={<PrivateRoute><CommonLayout /></PrivateRoute>}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/jobs" element={<JobAdminForm />} />
            <Route path="/admin/jobs/:job_id" element={<JobAdminForm />} />
          </Route>
        </Routes>

        {/* <section>
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
              <Route path='/collection/pediatrics' element={<Collection />} />
              <Route path='/collection/orthopedics' element={<Collection />} />
              <Route path='/collection/tools' element={<Collection />} />
              <Route path='/collection/tms' element={<Collection />} />
              <Route path='/collection/medicines' element={<Collection />} />

              <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
              <Route path='/admin/jobs' element={<PrivateRoute><JobAdminForm /></PrivateRoute>} />
              <Route path='/admin/jobs/:job_id' element={<PrivateRoute><JobAdminForm /></PrivateRoute>} />
            </Routes>
          </main>
        </section>
        <Footer /> */}
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
