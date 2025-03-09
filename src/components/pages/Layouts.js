import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default function CommonLayout() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export function PublicLayout() {
  return (
    <div>
      <h2>Public Layout</h2>
      <Outlet />
    </div>
  );
};

export function AdminLayout() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <Outlet />
    </div>
  );
}

export const CollectionLayout = () => (
  <div>
    <h2>Collections</h2>
    <Outlet />
  </div>
);

export const JobsLayout = () => (
  <div>
    <h2>Jobs Section</h2>
    <Outlet />
  </div>
);
