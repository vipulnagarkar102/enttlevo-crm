import React, { useState } from 'react';
import SidebarItem from '../components/SidebarItem';

const SalesAllLeads: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use dummy data for leads
  const leadsData = [
    { id: 1, name: 'Alice Johnson', company: 'TechNova Solutions', status: 'Qualified', label: 'Hot', owner: 'Shrinath Rao', value: '$45,000', activity: '2 hours ago', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Michael Chen', company: 'Nexus Global', status: 'Proposal', label: 'Warm', owner: 'Jessica Chen', value: '$120,000', activity: '5 hours ago', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Elena Rodriguez', company: 'Skyline Architects', status: 'Discovery', label: 'Hot', owner: 'Marcus Smith', value: '$85,000', activity: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'David Kim', company: 'Starlight Corp', status: 'Negotiation', label: 'Cold', owner: 'Elena Rodriguez', value: '$62,000', activity: '3 days ago', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Sophia Garcia', company: 'Horizon Media', status: 'Won', label: 'Hot', owner: 'David Kim', value: '$210,000', activity: '1 week ago', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: 'Liam Wilson', company: 'Innova Systems', status: 'Lost', label: 'Cold', owner: 'Sofia Garcia', value: '$15,000', activity: '2 weeks ago', avatar: 'https://i.pravatar.cc/150?u=6' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Qualified': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Proposal': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Discovery': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Negotiation': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      case 'Won': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Lost': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'Hot': return 'bg-red-500';
      case 'Warm': return 'bg-orange-400';
      case 'Cold': return 'bg-blue-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30 overflow-x-hidden min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-[#1A171F] flex flex-col items-center py-4 z-40">
        <div className="mb-8">
          <span className="material-symbols-outlined text-[#FF8000]" style={{ fontSize: '24px' }}>architecture</span>
        </div>
        <nav className="flex flex-col items-center w-full gap-y-1">
          <SidebarItem icon="dashboard" label="Dashboard" to="/" />
          <SidebarItem icon="analytics" label="Leads" to="/leads" active />
          <SidebarItem icon="architecture" label="Projects" />
          <SidebarItem icon="group" label="Team" />
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
                  <a className="text-[0.85rem] font-semibold text-[#FF8000] hover:underline" href="#">Profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-16 mt-10 p-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-end">
            <div className="text-left">
              <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">All Leads</h1>
              <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Manage and track your entire sales pipeline in one place</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline/10 text-on-surface rounded-sm text-[0.85rem] font-semibold hover:bg-slate-50 transition-all shadow-sm">
                <span className="material-symbols-outlined !text-[18px]">filter_list</span>
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-sm text-[0.85rem] font-semibold hover:bg-[#FF8000]/90 transition-all shadow-md active:scale-95">
                <span className="material-symbols-outlined !text-[18px]">add</span>
                Create New Lead
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-outline/5 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline/5">
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">Name & Company</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">Label</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">Owner</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">Expected Value</th>
                  <th className="px-6 py-4 text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">Last Activity</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/5">
                {leadsData.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                          <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[0.9rem] font-semibold text-on-surface">{lead.name}</p>
                          <p className="text-[0.75rem] text-on-surface-variant/70">{lead.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[0.7rem] font-bold border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${getLabelColor(lead.label)}`}></div>
                        <span className="text-[0.8rem] text-on-surface-variant font-medium">{lead.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.85rem] text-on-surface font-medium">{lead.owner}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[0.9rem] font-bold text-on-surface">{lead.value}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[0.8rem] text-on-surface-variant/60 font-medium">{lead.activity}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-on-surface-variant/40 hover:text-[#FF8000] opacity-0 group-hover:opacity-100 transition-all">
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Dummy */}
          <div className="flex justify-between items-center bg-surface-container-low p-4 border border-outline/5 rounded-sm">
            <p className="text-[0.8rem] text-on-surface-variant/70 font-medium">Showing 1 to 6 of 105 leads</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-outline/10 rounded-sm text-[0.8rem] font-medium text-on-surface-variant bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold shadow-sm">1</button>
              <button className="px-3 py-1 border border-outline/10 rounded-sm text-[0.8rem] font-medium text-on-surface bg-white hover:bg-slate-50">2</button>
              <button className="px-3 py-1 border border-outline/10 rounded-sm text-[0.8rem] font-medium text-on-surface bg-white hover:bg-slate-50">3</button>
              <button className="px-3 py-1 border border-outline/10 rounded-sm text-[0.8rem] font-medium text-on-surface bg-white hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesAllLeads;
