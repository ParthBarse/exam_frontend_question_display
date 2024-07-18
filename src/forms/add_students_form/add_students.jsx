import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import FirstDetails from './First_details';



function AddStudent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full max-w-l mx-auto p-4">
            <FirstDetails  />
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddStudent;
