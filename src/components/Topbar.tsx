import React, { useState } from 'react';

interface TopbarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  searchPlaceholder?: string;
}

const Topbar: React.FC<TopbarProps> = ({ searchQuery = '', setSearchQuery, searchPlaceholder = 'Global Search...' }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-16 right-0 h-10 bg-[#1A171F] flex justify-between items-center px-4 z-50">
      <div className="flex items-center gap-4 flex-1">
        <span className="text-[0.95rem] font-medium tracking-tighter text-white font-headline">ARCHITECT</span>
        <div className="relative w-64 uppercase tracking-tight">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 !text-sm">search</span>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-sm py-1 pl-8 pr-3 text-[0.8rem] text-white focus:outline-none focus:border-[#FF8000]/50 transition-all placeholder:text-white/30"
            placeholder={searchPlaceholder}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
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
              <div className="flex-1 min-w-0 font-headline">
                <p className="text-[0.95rem] font-semibold text-slate-900 truncate uppercase">Vipul Nagarkar</p>
                <p className="text-[0.8rem] text-slate-500 truncate mb-2 whitespace-nowrap">vipul@architect.io</p>
                <a className="text-[0.85rem] font-semibold text-[#FF8000] hover:underline whitespace-nowrap" href="#">Profile &amp; Preferences</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
