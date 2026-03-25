import React, { useState } from 'react';
import SidebarItem from '../components/SidebarItem';
import ColumnSettingsOverlay from '../components/sales_dashboard/ColumnSettingsOverlay';
import ImportLeadsOverlay from '../components/sales_dashboard/ImportLeadsOverlay';
import CreateLeadOverlay from '../components/sales_dashboard/CreateLeadOverlay';
import AdvancedFiltersOverlay from '../components/sales_dashboard/AdvancedFiltersOverlay';

const SalesAllLeads: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showImportOpen, setShowImportOpen] = useState(false);
  const [showAddLeadOpen, setShowAddLeadOpen] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [columns, setColumns] = useState([
    { id: '1', label: 'Company', key: 'company', visible: true },
    { id: '2', label: 'Contact Name', key: 'contactName', visible: true },
    { id: '3', label: 'Email', key: 'email', visible: true },
    { id: '4', label: 'LinkedIn', key: 'linkedin', visible: true },
    { id: '5', label: 'Website', key: 'website', visible: true },
    { id: '6', label: 'Country', key: 'country', visible: true },
    { id: '7', label: 'State', key: 'state', visible: true },
    { id: '8', label: 'City', key: 'city', visible: true },
    { id: '9', label: 'Industry', key: 'industry', visible: true },
    { id: '10', label: 'Lead Owner', key: 'leadOwner', visible: true },
    { id: '11', label: 'Product Name', key: 'productName', visible: true },
    { id: '12', label: 'Contract Stage', key: 'contractStage', visible: true },
    { id: '13', label: 'Proposed ARR', key: 'proposedARR', visible: true },
    { id: '14', label: 'Contract ARR', key: 'contractARR', visible: true },
    { id: '15', label: 'Lead Source', key: 'source', visible: true },
    { id: '16', label: 'ICP', key: 'icp', visible: true },
    { id: '17', label: 'Status', key: 'status', visible: true },
    { id: '18', label: 'Label', key: 'label', visible: true },
    { id: '19', label: 'Created By', key: 'createdBy', visible: true },
    { id: '20', label: 'Updated By', key: 'updatedBy', visible: true },
    { id: '21', label: 'Created At', key: 'addedOn', visible: true },
    { id: '22', label: 'Updated At', key: 'updatedAt', visible: true },
  ]);

  const handleToggle = (id: string) => setColumns(prev => prev.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
  const handleReset = () => setColumns(prev => prev.map(col => ({ ...col, visible: true })));
  const handleSave = () => setIsOverlayOpen(false);
  const isVisible = (key: string) => columns.find(c => c.key === key)?.visible;

  const [leadsData, setLeadsData] = useState([
    { 
      id: 1, company: 'Mirrat', contactName: 'Meghna', email: 'meghna@mirrat.com', linkedin: 'in/meghna', website: 'mirrat.com', 
      country: 'India', state: 'MH', city: 'Pune', industry: 'IT', leadOwner: 'Vipul', productName: 'enttevo', 
      contractStage: 'Discovery', proposedARR: '$12,000', contractARR: '-', source: 'Website', icp: true, 
      status: 'New', label: 'Hot', createdBy: 'System', updatedBy: 'Vipul', addedOn: '24 Mar 2026', updatedAt: '24 Mar 2026' 
    },
    { 
      id: 2, company: 'Zapp.Org', contactName: 'Ritesh', email: 'ritesh@zapp.org', linkedin: 'in/ritesh', website: 'zapp.org', 
      country: 'India', state: 'MH', city: 'Mumbai', industry: 'Software', leadOwner: 'Rahul', productName: 'enttevo', 
      contractStage: 'Proposal', proposedARR: '$25,000', contractARR: '-', source: 'Referral', icp: false, 
      status: 'Contacted', label: 'Warm', createdBy: 'Rahul', updatedBy: 'Rahul', addedOn: '20 Mar 2026', updatedAt: '22 Mar 2026' 
    },
    { 
      id: 3, company: 'Smartlearn', contactName: 'Amar', email: 'amar@smartlearn.com', linkedin: 'in/amar', website: 'smartlearn.com', 
      country: 'USA', state: 'CA', city: 'San Jose', industry: 'Tech', leadOwner: 'Vipul', productName: 'i-managem', 
      contractStage: 'Closed Won', proposedARR: '$50,000', contractARR: '$48,000', source: 'Event', icp: true, 
      status: 'Qualified', label: 'Hot', createdBy: 'Marketing', updatedBy: 'Vipul', addedOn: '15 Mar 2026', updatedAt: '23 Mar 2026' 
    },
    { 
      id: 4, company: 'Google Cloud', contactName: 'Ravish', email: 'ravish@google.com', linkedin: 'in/ravish', website: 'cloud.google.com', 
      country: 'USA', state: 'CA', city: 'Mountain View', industry: 'Enterprise', leadOwner: 'Vipul', productName: 'enttevo', 
      contractStage: 'Negotiation', proposedARR: '$120,000', contractARR: '-', source: 'Direct', icp: true, 
      status: 'Contacted', label: 'Hot', createdBy: 'Vipul', updatedBy: 'Vipul', addedOn: '10 Mar 2026', updatedAt: '25 Mar 2026' 
    },
  ]);

  const filteredData = leadsData.filter(lead =>
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30 overflow-x-hidden min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-[#1A171F] flex flex-col items-center py-4 z-40">
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
      </aside>

      {/* TopNavBar */}
      <header className="fixed top-0 left-16 right-0 h-10 bg-[#1A171F] flex justify-between items-center px-4 z-50">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-[0.95rem] font-medium tracking-tighter text-white font-headline">ARCHITECT</span>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 !text-sm">search</span>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-sm py-1 pl-8 pr-3 text-[0.8rem] text-white focus:outline-none focus:border-[#FF8000]/50 transition-all placeholder:text-white/30"
              placeholder="Filter leads..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 focus:outline-none">
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
                <div className="flex-1 min-w-0 font-headline">
                  <p className="text-[0.95rem] font-semibold text-slate-900 truncate uppercase">Vipul Nagarkar</p>
                  <p className="text-[0.8rem] text-slate-500 truncate mb-2">vipul@architect.io</p>
                  <a className="text-[0.85rem] font-semibold text-[#FF8000] hover:underline" href="#">Profile &amp; Preferences</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-16 mt-10 p-8 min-h-screen">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-end mb-2">
            <div className="text-left">
              <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">All Leads</h1>
              <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Manage and track your entire sales pipeline in one place</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowImportOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 border border-outline/10 bg-surface-container-low text-[0.75rem] font-bold text-on-surface-variant hover:bg-white hover:text-[#FF8000] transition-colors rounded-sm uppercase tracking-wider group shadow-sm"
              >
                <span className="material-symbols-outlined !text-[16px]">download</span>
                Import Leads
              </button>
              <button 
                onClick={() => setShowAddLeadOpen(true)}
                className="flex items-center gap-2 px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-semibold hover:bg-[#FF8000]/90 transition-all group shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined !text-[18px]">add</span>
                Lead
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-1 p-5 bg-surface-container-low rounded-sm transition-colors hover:bg-surface-container-high group border border-outline/5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[0.7rem] font-medium text-on-surface-variant uppercase tracking-widest">Total Leads</span>
                <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
              </div>
              <div className="text-2xl font-medium tracking-tight text-on-surface">10</div>
              {/* <div className="mt-2 text-[0.75rem] text-primary font-medium flex items-center gap-1">
                +12.4% <span className="text-on-surface-variant/60">vs last month</span>
              </div> */}
            </div>

            <div className="col-span-1 p-5 bg-surface-container-low rounded-sm transition-colors hover:bg-surface-container-high group border border-outline/5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[0.7rem] font-medium text-on-surface-variant uppercase tracking-widest">Total Proposed ARR</span>
                <span className="material-symbols-outlined text-tertiary text-sm">handshake</span>
              </div>
              <div className="text-2xl font-medium tracking-tight text-on-surface">$42</div>
              {/* <div className="mt-2 text-[0.75rem] text-tertiary font-medium flex items-center gap-1">
                8 <span className="text-on-surface-variant/60">closing this week</span>
              </div> */}
            </div>

            <div className="col-span-1 p-5 bg-surface-container-low rounded-sm transition-colors hover:bg-surface-container-high group border border-outline/5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[0.7rem] font-medium text-on-surface-variant uppercase tracking-widest">ICP Leads</span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">schedule</span>
              </div>
              <div className="text-2xl font-medium tracking-tight text-on-surface">2</div>
              {/* <div className="mt-2 text-[0.75rem] text-error font-medium flex items-center gap-1">
                +2 days <span className="text-on-surface-variant/60">latency detected</span>
              </div> */}
            </div>

            <div className="col-span-1 p-5 bg-surface-container-low rounded-sm transition-colors hover:bg-surface-container-high group border border-outline/5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[0.7rem] font-medium text-on-surface-variant uppercase tracking-widest">Total Win</span>
                <span className="material-symbols-outlined text-primary text-sm">workspace_premium</span>
              </div>
              <div className="text-2xl font-medium tracking-tight text-on-surface">1</div>
              {/* <div className="mt-2 text-[0.75rem] text-primary font-medium flex items-center gap-1">
                Benchmark <span className="text-on-surface-variant/60">exceeded</span>
              </div> */}
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative mt-2">

            <div className="flex justify-between items-center bg-surface-container-low px-6 py-4 border-b border-outline/5">
              <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                All Leads Pipeline
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-[#FF8000] transition-colors">search</span>
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-1.5 bg-white border border-outline/10 rounded-sm text-[0.75rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 w-[240px] transition-all placeholder:text-on-surface-variant/30"
                  />
                </div>
                <button 
                  onClick={() => setShowAdvancedFilter(true)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-outline/10 text-[0.75rem] font-bold text-on-surface-variant hover:bg-white hover:text-[#FF8000] transition-colors rounded-sm uppercase tracking-wider group"
                >
                  <span className="material-symbols-outlined !text-[16px]">filter_list</span>
                  Advanced Filters
                </button>
                <button 
                  onClick={() => setIsOverlayOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-outline/10 text-[0.75rem] font-bold text-on-surface-variant hover:bg-white hover:text-[#FF8000] transition-colors rounded-sm uppercase tracking-wider group"
                >
                  <span className="material-symbols-outlined !text-[16px] group-hover:rotate-180 transition-transform duration-500">settings</span>
                  Manage Columns
                </button>
              </div>
            </div>

            <div className="overflow-x-auto relative min-h-[200px] custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1500px]">
                <thead>
                  <tr className="bg-white border-b border-outline/5">
                    {isVisible('company') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap sticky left-0 bg-white z-20 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Company</th>}
                    {isVisible('contactName') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contact Name</th>}
                    {isVisible('email') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Email</th>}
                    {isVisible('linkedin') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">LinkedIn</th>}
                    {isVisible('website') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Website</th>}
                    {isVisible('country') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Country</th>}
                    {isVisible('state') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">State</th>}
                    {isVisible('city') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">City</th>}
                    {isVisible('industry') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Industry</th>}
                    {isVisible('leadOwner') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Lead Owner</th>}
                    {isVisible('productName') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Product Name</th>}
                    {isVisible('contractStage') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contract Stage</th>}
                    {isVisible('proposedARR') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Proposed ARR</th>}
                    {isVisible('contractARR') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contract ARR</th>}
                    {isVisible('source') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Lead Source</th>}
                    {isVisible('icp') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">ICP</th>}
                    {isVisible('status') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Status</th>}
                    {isVisible('label') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Label</th>}
                    {isVisible('createdBy') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Created By</th>}
                    {isVisible('updatedBy') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Updated By</th>}
                    {isVisible('addedOn') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Created At</th>}
                    {isVisible('updatedAt') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Updated At</th>}
                    <th className="sticky right-0 w-0 p-0 z-20"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/5 whitespace-nowrap overflow-hidden">
                  {filteredData.length > 0 ? (
                    filteredData.map((lead) => (
                      <tr key={lead.id} className="transition-all cursor-pointer group hover:bg-[#FF8000]/[0.04] h-[52px]">
                        {isVisible('company') && <td className="px-6 py-0 sticky left-0 bg-white group-hover:bg-[#FFF7F0] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-sm bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold text-[0.65rem] uppercase">
                              {lead.company.charAt(0)}
                            </div>
                            <span className="text-[0.85rem] font-semibold text-on-surface">{lead.company}</span>
                          </div>
                        </td>}
                        {isVisible('contactName') && <td className="px-6 py-0">
                          <span className="text-[0.85rem] font-medium text-on-surface-variant">{lead.contactName}</span>
                        </td>}
                        {isVisible('email') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-[#006495] hover:underline font-medium">{lead.email}</span>
                        </td>}
                        {isVisible('linkedin') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-on-surface-variant/80 font-medium tracking-tight">{lead.linkedin}</span>
                        </td>}
                        {isVisible('website') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-[#006495] hover:underline">{lead.website}</span>
                        </td>}
                        {isVisible('country') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-on-surface-variant/70">{lead.country}</span>
                        </td>}
                        {isVisible('state') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-on-surface-variant/70">{lead.state}</span>
                        </td>}
                        {isVisible('city') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-on-surface-variant/70">{lead.city}</span>
                        </td>}
                        {isVisible('industry') && <td className="px-6 py-0">
                          <div className="relative">
                            <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === `ind_${lead.id}` ? null : `ind_${lead.id}`); }} className="flex items-center justify-between gap-1 w-full px-2 py-1 text-[0.75rem] font-medium border border-outline/10 rounded-sm hover:border-[#FF8000]/50 transition-colors bg-white cursor-pointer group min-w-[100px]">
                              {lead.industry}
                              <span className="material-symbols-outlined !text-[14px] text-on-surface-variant/50 group-hover:text-[#FF8000]">expand_more</span>
                            </div>
                            {openDropdown === `ind_${lead.id}` && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} />
                                <div className="absolute top-full mt-1 left-0 min-w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-50 animate-in fade-in duration-100">
                                  {['IT', 'Software', 'Enterprise', 'Finance', 'Healthcare'].map(opt => (
                                    <div key={opt} onClick={(e) => { e.stopPropagation(); setLeadsData(leadsData.map(l => l.id === lead.id ? { ...l, industry: opt } : l)); setOpenDropdown(null); }} className="px-3 py-1.5 text-[0.75rem] font-medium text-on-surface hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors">
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </td>}
                        {isVisible('leadOwner') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-on-surface font-medium">{lead.leadOwner}</span>
                        </td>}
                        {isVisible('productName') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] font-semibold text-on-surface">{lead.productName}</span>
                        </td>}
                        {isVisible('contractStage') && <td className="px-6 py-0">
                          <div className="relative">
                            <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === `stage_${lead.id}` ? null : `stage_${lead.id}`); }} className="flex items-center justify-between gap-1 w-full px-2 py-1 text-[0.75rem] font-medium border border-outline/10 rounded-sm hover:border-[#FF8000]/50 transition-colors bg-white cursor-pointer group min-w-[120px]">
                              {lead.contractStage}
                              <span className="material-symbols-outlined !text-[14px] text-on-surface-variant/50 group-hover:text-[#FF8000]">expand_more</span>
                            </div>
                            {openDropdown === `stage_${lead.id}` && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} />
                                <div className="absolute top-full mt-1 left-0 min-w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-50 animate-in fade-in duration-100">
                                  {['Discovery', 'Demo', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map(opt => (
                                    <div key={opt} onClick={(e) => { e.stopPropagation(); setLeadsData(leadsData.map(l => l.id === lead.id ? { ...l, contractStage: opt } : l)); setOpenDropdown(null); }} className="px-3 py-1.5 text-[0.75rem] font-medium text-on-surface hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors">
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </td>}
                        {isVisible('proposedARR') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-emerald-600 font-bold">{lead.proposedARR}</span>
                        </td>}
                        {isVisible('contractARR') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-emerald-600 font-bold">{lead.contractARR}</span>
                        </td>}
                        {isVisible('source') && <td className="px-6 py-0">
                          <span className="text-[0.75rem] text-on-surface-variant font-medium">{lead.source}</span>
                        </td>}
                        {isVisible('icp') && <td className="px-6 py-0">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setLeadsData(leadsData.map(l => l.id === lead.id ? { ...l, icp: !l.icp } : l));
                            }}
                            className={`w-8 h-4 rounded-full relative transition-colors ${lead.icp ? 'bg-[#FF8000]' : 'bg-outline-variant/30'}`}
                          >
                            <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${lead.icp ? 'left-[18px]' : 'left-0.5'}`}></div>
                          </button>
                        </td>}
                        {isVisible('status') && <td className="px-6 py-0">
                          <div className="relative inline-block w-[110px]">
                            <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === `status_${lead.id}` ? null : `status_${lead.id}`); }} className={`flex items-center justify-between text-center px-2 py-1 rounded-sm text-[0.65rem] font-bold border cursor-pointer group transition-colors ${
                              lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100/50' :
                              lead.status === 'Contacted' ? 'bg-amber-50 text-amber-500 border-amber-100 hover:bg-amber-100/50' :
                              'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50'
                            }`}>
                              <span className="flex-1 text-center">{lead.status}</span>
                              <span className="material-symbols-outlined !text-[14px] opacity-60 group-hover:text-[#FF8000]">expand_more</span>
                            </div>
                            {openDropdown === `status_${lead.id}` && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} />
                                <div className="absolute top-full mt-1 left-0 min-w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-50 animate-in fade-in duration-100 text-left">
                                  {['New', 'Contacted', 'Qualified', 'Disqualified'].map(opt => (
                                    <div key={opt} onClick={(e) => { e.stopPropagation(); setLeadsData(leadsData.map(l => l.id === lead.id ? { ...l, status: opt } : l)); setOpenDropdown(null); }} className="px-3 py-1.5 text-[0.75rem] font-medium text-on-surface hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors">
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </td>}
                        {isVisible('label') && <td className="px-6 py-0">
                          <div className="relative inline-block min-w-[80px]">
                            <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === `label_${lead.id}` ? null : `label_${lead.id}`); }} className="flex items-center justify-between gap-1.5 w-full cursor-pointer group hover:bg-slate-50 px-1 py-0.5 rounded-sm transition-colors border border-transparent hover:border-outline/10">
                              <div className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${lead.label === 'Hot' ? 'bg-red-500' : lead.label === 'Warm' ? 'bg-orange-400' : 'bg-slate-300'}`}></div>
                                <span className="text-[0.75rem] font-medium text-on-surface">{lead.label}</span>
                              </div>
                              <span className="material-symbols-outlined !text-[14px] text-on-surface-variant/50 group-hover:text-[#FF8000]">expand_more</span>
                            </div>
                            {openDropdown === `label_${lead.id}` && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} />
                                <div className="absolute top-full mt-1 left-0 min-w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-50 animate-in fade-in duration-100 text-left">
                                  {['Hot', 'Warm', 'Cold'].map(opt => (
                                    <div key={opt} onClick={(e) => { e.stopPropagation(); setLeadsData(leadsData.map(l => l.id === lead.id ? { ...l, label: opt } : l)); setOpenDropdown(null); }} className="px-3 py-1.5 flex items-center gap-2 hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors">
                                      <div className={`w-2 h-2 rounded-full ${opt === 'Hot' ? 'bg-red-500' : opt === 'Warm' ? 'bg-orange-400' : 'bg-slate-300'}`}></div>
                                      <span className="text-[0.75rem] font-medium text-on-surface">{opt}</span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </td>}
                        {isVisible('createdBy') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-on-surface-variant/70">{lead.createdBy}</span>
                        </td>}
                        {isVisible('updatedBy') && <td className="px-6 py-0">
                          <span className="text-[0.8rem] text-on-surface-variant/70">{lead.updatedBy}</span>
                        </td>}
                        {isVisible('addedOn') && <td className="px-6 py-0">
                          <span className="text-[0.75rem] text-on-surface-variant/60 font-medium">{lead.addedOn}</span>
                        </td>}
                        {isVisible('updatedAt') && <td className="px-6 py-0">
                          <span className="text-[0.75rem] text-on-surface-variant/60 font-medium">{lead.updatedAt}</span>
                        </td>}

                        {/* Clean Sticky Right Action Button */}
                        <td className="sticky right-0 w-0 p-0 overflow-visible z-30 pointer-events-none">
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-error text-white rounded-sm text-[0.8rem] font-semibold hover:bg-error/90 transition-all group shadow-sm active:scale-95 whitespace-nowrap">
                              <span className="material-symbols-outlined !text-[18px]">delete</span>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="h-[200px]">
                      <td colSpan={10} className="px-6 py-0 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                          <span className="material-symbols-outlined !text-[48px]">search_off</span>
                          <span className="text-[0.85rem] font-medium tracking-wide">No results found for "{searchQuery}"</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline/5 flex justify-between items-center">
              <span className="text-[0.75rem] text-on-surface-variant font-medium">
                Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {leadsData.length} leads
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-white rounded-sm font-semibold opacity-50 cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1 text-[0.75rem] rounded-sm font-bold shadow-sm bg-[#FF8000] text-white">
                  1
                </button>
                <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-white rounded-sm font-semibold opacity-50 cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings overlay component call */}
      <ColumnSettingsOverlay 
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        columns={columns}
        onToggle={handleToggle}
        onReset={handleReset}
        onSave={handleSave}
      />

      {/* Slide-in Overlay component calls */}
      <ImportLeadsOverlay isOpen={showImportOpen} onClose={() => setShowImportOpen(false)} />
      <CreateLeadOverlay isOpen={showAddLeadOpen} onClose={() => setShowAddLeadOpen(false)} />
      <AdvancedFiltersOverlay isOpen={showAdvancedFilter} onClose={() => setShowAdvancedFilter(false)} />
    </div>
  );
};

export default SalesAllLeads;

