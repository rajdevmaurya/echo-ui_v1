import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobServiceForm from './components/collection/JobServiceForm';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/utils/PrivateRoute';
import JobAdminForm from './components/admin/JobForm';
import JobProvider from './components/context/JobContext';
import { CartProvider } from './components/context/CartContext'; // Import CartProvider
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import JobDetails from './components/pages/JobDetails';
import Cart from './components/pages/Cart'; // Import Cart component

import Collection from './components/pages/Collection';
import CommonLayout from './components/pages/Layouts';
import MyOrders from './components/pages/MyOrders';
import SearchResult from './components/pages/SearchResult';


function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <CartProvider> {/* Wrap with CartProvider */}
          <Routes>
            {/* Public Routes */}
            <Route element={<CommonLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="/my-orders" element={<PrivateRoute showForUseer={true}><MyOrders /></PrivateRoute>} />
              <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
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
        </CartProvider>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;