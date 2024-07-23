import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />
            {/* Dashboard actions */}
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Toatal students*/}
              <DashboardCard01 />
              {/* Active students */}
              <DashboardCard02 />
              {/* Cancelled students */}
              <DashboardCard03 />
              <DashboardCard04 />
              <DashboardCard05 />
              <DashboardCard06 />
              {/* Active Camps) */}
              {/* <DashboardCard07 /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;