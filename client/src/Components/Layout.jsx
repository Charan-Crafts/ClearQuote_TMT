import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
const Layout = () => {
  return (
    <div className="min-h-[90vh] flex flex-row gap-4 p-4 bg-[#32B9B9]">
      <div className=" text-xl w-3/12 min-h-[60vh]">
        <Sidebar/>
      </div>
      <div className=" text-xl w-full min-h-[60vh]">
        
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
