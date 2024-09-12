import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/Admin/AdminHeader';
import Footer from '../../components/Shared/Footer';

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <main className='my-6 py-16 px-4 md:p-20'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
