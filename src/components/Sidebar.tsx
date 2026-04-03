import React from 'react';
import SidebarItem from './SidebarItem';

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-16 bg-[#1A171F] flex flex-col items-center py-4 z-40 transition-all duration-300 ease-in-out">
      <div className="mb-8">
        <span className="material-symbols-outlined text-[#FF8000]" style={{ fontSize: '24px' }}>architecture</span>
      </div>
      <nav className="flex flex-col items-center w-full gap-y-1">
        <SidebarItem
          icon="sell"
          label="Sales"
          to="/leads"
          hasFlyout
          flyoutItems={[
            { name: 'Dashboard', to: '/', icon: 'insights' },
            { name: 'All Leads', to: '/leads', icon: 'table_rows' },
            { name: 'All Deals', to: '/deals', icon: 'Handshake' },
            { name: 'Tasks', to: '/tasks', icon: 'task_alt' },
            { name: 'Scheduler', to: '/scheduler', icon: 'event' }
          ]}
          active={window.location.pathname === '/' || window.location.pathname === '/leads' || window.location.pathname === '/deals' || window.location.pathname === '/tasks' || window.location.pathname === '/scheduler'}
        />
        {/* <SidebarItem
          icon="analytics"
          label="Analytics"
          hasFlyout
          flyoutItems={[
            { name: 'Reports', icon: 'bar_chart' },
            { name: 'Dashboards', icon: 'dashboard' },
            { name: 'Events', icon: 'event' },
          ]}
        /> */}
      </nav>
      <div className="mt-auto flex flex-col gap-y-4">
        <a className="sidebar-hover text-white/70 w-12 h-12 flex items-center justify-center" href="#">
          <span className="material-symbols-outlined">help</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
