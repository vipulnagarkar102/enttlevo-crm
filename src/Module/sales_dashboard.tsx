import React, { useState } from 'react';
import SidebarItem from '../components/SidebarItem';
import CustomCalendar from '../components/sales_dashboard/CustomCalendar';
import SankeyChart from '../components/sales_dashboard/SankeyChart';
import PipelineBarChart from '../components/sales_dashboard/PipelineBarChart';
import ConversionDoughnutChart from '../components/sales_dashboard/ConversionDoughnutChart';
import LeadLabelsScatterChart from '../components/sales_dashboard/LeadLabelsScatterChart';
import SDRLeaderboard from '../components/sales_dashboard/SDRLeaderboard';
import UnassignedLeadsTable from '../components/sales_dashboard/UnassignedLeadsTable';
import ManagersTable from '../components/sales_dashboard/ManagersTable';
import TeamsTable from '../components/sales_dashboard/TeamsTable';

const SalesDashboard: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Graph');
  const [startDate, setStartDate] = useState('2025-12-24');
  const [endDate, setEndDate] = useState('2026-03-24');
  const [showCal1, setShowCal1] = useState(false);
  const [showCal2, setShowCal2] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Quarterly');
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30 overflow-x-hidden">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-[#1A171F] flex flex-col items-center py-4 z-40 transition-all duration-300 ease-in-out">
        <div className="mb-8">
          <span className="material-symbols-outlined text-[#FF8000]" style={{ fontSize: '24px' }}>architecture</span>
        </div>
        <nav className="flex flex-col items-center w-full gap-y-1">
          <SidebarItem
            icon="sell"
            label="Sales"
            to="/leads"
            active
            hasFlyout
            flyoutItems={[
              { name: 'Dashboard', to: '/', icon: 'insights' },
              { name: 'All Leads', to: '/leads', icon: 'table_rows' }
            ]}
          />
          <SidebarItem
            icon="analytics"
            label="Analytics"
            hasFlyout
            flyoutItems={[
              { name: 'Reports' },
              { name: 'Dashboards' },
              { name: 'Events' },
            ]}
          />
          <SidebarItem
            icon="architecture"
            label="Projects"
            hasFlyout
            flyoutItems={[
              { name: 'Active' },
              { name: 'Archived' },
            ]}
          />
          <SidebarItem
            icon="group"
            label="Team"
            hasFlyout
            flyoutItems={[
              { name: 'Users' },
              { name: 'Permissions' },
            ]}
          />
        </nav>
        <div className="mt-auto flex flex-col gap-y-4">
          <a className="sidebar-hover text-white/70 w-12 h-12 flex items-center justify-center" href="#">
            <span className="material-symbols-outlined">help</span>
          </a>
        </div>
      </aside>

      {/* TopNavBar */}
      <header className="fixed top-0 left-16 right-0 h-10 bg-[#1A171F] flex justify-between items-center px-4 z-50">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-[0.95rem] font-medium tracking-tighter text-white font-headline">ARCHITECT</span>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 !text-sm">search</span>
            <input className="w-full bg-white/5 border border-white/10 rounded-sm py-1 pl-8 pr-3 text-[0.8rem] text-white focus:outline-none focus:border-[#FF8000]/50 transition-all placeholder:text-white/30" placeholder="Global Search..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-[#FF8000] transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
          </button>
          <button className="text-slate-400 hover:text-[#FF8000] transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
          </button>

          {/* Profile Button with Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 h-7 rounded-full overflow-hidden border border-white/10 hover:border-[#FF8000]/50 transition-all pr-1"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img alt="User profile" className="w-7 h-7 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqN59oxtGeBdvgVWGhfxxkdMU9hPcHp7YbPRv2cLzOa4DvV2k6LSubWDWa_Ch9L96Uy7uuzkvZmNjRtWEa7Gip4lQNJq0mg2neS3lkSwDp_jS9TPWeYWxKxAMlSBg0cI0TDBtvvbbI-_UZN9LyYTUyBDxQ9byL5FQa6Wt-lNsWAawJDIQ-W4MDcw0uJAa6W1qw9uZhqaXuKTjrG6NwwDPjVo4aT6BxqXgd7_sCvLcxRqYqj0LWu9yAnps3W-CLK_LhM-jz9KlRDM" />
              <span className="material-symbols-outlined text-slate-400 !text-sm ml-0.5 mr-1 group-hover:text-[#FF8000] transition-colors">expand_more</span>
            </button>
            <div className={`absolute right-0 top-9 w-64 bg-white rounded-sm dropdown-shadow ${profileOpen ? 'block' : 'hidden'} group-hover:block overflow-hidden border border-slate-200 z-50`}>
              <div className="p-4 border-b border-slate-100 flex items-start gap-3 text-left">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqN59oxtGeBdvgVWGhfxxkdMU9hPcHp7YbPRv2cLzOa4DvV2k6LSubWDWa_Ch9L96Uy7uuzkvZmNjRtWEa7Gip4lQNJq0mg2neS3lkSwDp_jS9TPWeYWxKxAMlSBg0cI0TDBtvvbbI-_UZN9LyYTUyBDxQ9byL5FQa6Wt-lNsWAawJDIQ-W4MDcw0uJAa6W1qw9uZhqaXuKTjrG6NwwDPjVo4aT6BxqXgd7_sCvLcxRqYqj0LWu9yAnps3W-CLK_LhM-jz9KlRDM" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.95rem] font-semibold text-slate-900 truncate">Vipul Nagarkar</p>
                  <p className="text-[0.8rem] text-slate-500 truncate mb-2">vipulnagarkar101@gmail.com</p>
                  <a className="text-[0.85rem] font-semibold text-[#006495] hover:underline" href="#">Profile &amp; Preferences</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="ml-16 mt-10 p-8 min-h-screen">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Sales Header & Controls */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div className="text-left">
                <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">Sales</h1>
                <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Q3 Fiscal Year Performance Metrics</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    onClick={() => { setShowCal1(!showCal1); setShowCal2(false); }}
                    className="flex items-center gap-4 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors group"
                  >
                    <span className="material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-[#FF8000]">calendar_month</span>
                    <span className="text-[0.8rem] text-on-surface font-medium">{new Date(startDate).toLocaleDateString()}</span>
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant">expand_more</span>
                  </div>
                  {showCal1 && <CustomCalendar selectedDate={startDate} onSelect={setStartDate} onClose={() => setShowCal1(false)} />}
                </div>

                <div className="relative">
                  <div
                    onClick={() => { setShowCal2(!showCal2); setShowCal1(false); }}
                    className="flex items-center gap-4 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors group"
                  >
                    <span className="material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-[#FF8000]">calendar_month</span>
                    <span className="text-[0.8rem] text-on-surface font-medium">{new Date(endDate).toLocaleDateString()}</span>
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant">expand_more</span>
                  </div>
                  {showCal2 && <CustomCalendar selectedDate={endDate} onSelect={setEndDate} onClose={() => setShowCal2(false)} />}
                </div>
                <div className="h-6 w-[1px] bg-outline-variant/30 mx-1"></div>
                <div className="relative">
                  <div
                    onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                    className="flex items-center gap-3 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 min-w-[120px] cursor-pointer hover:bg-surface-container-high transition-colors justify-between group"
                  >
                    <span className="text-[0.8rem] text-on-surface font-medium">{selectedPeriod}</span>
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant group-hover:text-[#FF8000]">expand_more</span>
                  </div>
                  {showPeriodDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowPeriodDropdown(false)} />
                      <div className="absolute top-full mt-1 left-0 w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {['Quarterly', 'Half-Yearly', 'Yearly'].map((period) => (
                          <div
                            key={period}
                            onClick={() => {
                              setSelectedPeriod(period);
                              setShowPeriodDropdown(false);
                            }}
                            className="px-3 py-1.5 text-[0.8rem] font-medium text-on-surface hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors"
                          >
                            {period}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => {
                    setIsRefreshing(true);
                    setTimeout(() => setIsRefreshing(false), 1000); // Simulate refresh
                  }}
                  className={`flex items-center gap-2 px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-semibold hover:bg-[#FF8000]/90 transition-all group shadow-sm active:scale-95 ${isRefreshing ? 'opacity-80 pointer-events-none' : ''}`}
                >
                  <span className={`material-symbols-outlined !text-[18px] transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-active:rotate-180'}`}>refresh</span>
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* Tabs Row */}
            <div className="border-b border-outline-variant/30">
              <div className="flex gap-8">
                {[
                  { id: 'Graph', label: 'Graph', icon: 'insights' },
                  { id: 'Unassigned', label: 'Unassigned (105)', icon: 'person_add' },
                  { id: 'Manager', label: 'Manager (11)', icon: 'groups' },
                  { id: 'Team', label: 'Team (10)', icon: 'groups' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-3 text-[0.9rem] font-medium transition-all relative ${activeTab === tab.id ? 'text-[#FF8000]' : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                  >
                    <span className="material-symbols-outlined !text-[18px]">{tab.icon}</span>
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF8000]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeTab === 'Graph' ? (
            <div className="grid grid-cols-12 gap-5">
              <SankeyChart />
              <PipelineBarChart />
              <ConversionDoughnutChart />
              <LeadLabelsScatterChart />
              <SDRLeaderboard />
            </div>
          ) : activeTab === 'Unassigned' ? (
            <UnassignedLeadsTable />
          ) : activeTab === 'Manager' ? (
            <ManagersTable />
          ) : activeTab === 'Team' ? (
            <TeamsTable />
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] bg-white border border-outline/5 rounded-sm">
              <span className="material-symbols-outlined !text-6xl text-on-surface-variant/20 mb-4">analytics</span>
              <h2 className="text-xl font-medium text-on-surface-variant">No data available for {activeTab}</h2>
              <p className="text-on-surface-variant/60">Select the Graph tab to view active sales performance</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SalesDashboard;
