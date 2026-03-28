import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SalesScheduler from '../components/sales_dashboard/SalesScheduler';

const SalesSchedularPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-white h-screen overflow-hidden">
        <Topbar />
        <div className="h-10 shrink-0" /> {/* Fixed Topbar Spacer */}
        <main className="flex-1 ml-16 relative overflow-hidden">
          <SalesScheduler />
        </main>
      </div>
    </div>
  );
};

export default SalesSchedularPage;
