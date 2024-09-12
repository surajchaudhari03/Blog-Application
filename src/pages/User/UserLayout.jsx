import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from '../../components/User/header/UserHeader';
import Footer from '../../components/Shared/Footer';

const UserLayout = () => {
  return (
    <div className="bg-gray-100 ">
      <UserHeader />
      <main className='mt-20'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
