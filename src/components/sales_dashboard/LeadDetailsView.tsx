import React, { useState } from 'react';

interface LeadDetailsViewProps {
  leadId: number | string;
  leadName?: string;
  industry?: string;
  onBack: () => void;
}

const LeadDetailsView: React.FC<LeadDetailsViewProps> = ({ leadId, leadName = 'Reliance', industry, onBack }) => {
  const [activeTab, setActiveTab] = useState('Email');
  const [openSections, setOpenSections] = useState({
    company: true,
    contact: true,
    deal: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = ['Email', 'Notes', 'Tasks', 'Documents', 'History'];

  return (
    <div className="flex flex-col bg-surface animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center bg-white px-8 py-5 border-b border-outline/10 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center justify-center p-2 text-on-surface-variant hover:text-[#FF8000] hover:bg-orange-50 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3">
              {leadName}
              {industry && (
                <span className="px-2 py-0.5 bg-slate-100 text-[#1A171F] text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                  {industry}
                </span>
              )}
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">Account Details & Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-1.5 border border-outline/20 rounded-sm bg-white text-[0.8rem] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm tracking-wider uppercase">
            <span className="material-symbols-outlined !text-[16px]">edit</span>
            Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500 border border-emerald-600 text-white rounded-sm text-[0.8rem] font-bold hover:bg-emerald-600 transition-colors shadow-sm tracking-wider uppercase active:scale-95">
            <span className="material-symbols-outlined !text-[16px]">send</span>
            Send to Onboarding
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-red-500 border border-red-600 text-white rounded-sm text-[0.8rem] font-bold hover:bg-red-600 transition-colors shadow-sm tracking-wider uppercase active:scale-95">
            <span className="material-symbols-outlined !text-[16px]">delete</span>
            Delete
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex items-start gap-6 px-8 pt-8 pb-12">

        {/* Left Column - Accordions */}
        <div className="w-[320px] flex-shrink-0 flex flex-col gap-4">

          {/* Company Details Section */}
          <div className="bg-white border text-center border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div
              onClick={() => toggleSection('company')}
              className="bg-[#1A171F] text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer hover:bg-[#2A272F] transition-colors"
            >
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">domain</span>
                Company Details
              </h2>
              <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.company ? 'rotate-180' : ''}`}>expand_less</span>
              </button>
            </div>

            {openSections.company && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Company Name</label>
                  <input readOnly value={leadName} className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Account Owner</label>
                  <input readOnly value="Shrinath Rao" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Contact Name</label>
                  <input readOnly value="Tenali Rama" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Email</label>
                  <input readOnly value="Datta1@McAfee" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Address</label>
                  <textarea readOnly value="Main St 123, Tech Park" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none min-h-[60px] resize-none"></textarea>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[0.75rem] font-bold text-[#3E4E63]">City</label>
                    <input readOnly value="Pune" className="w-full px-2 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[0.75rem] font-bold text-[#3E4E63]">State</label>
                    <input readOnly value="MH" className="w-full px-2 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[0.75rem] font-bold text-[#3E4E63]">Country</label>
                    <input readOnly value="India" className="w-full px-2 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 bg-slate-50 focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">LinkedIn</label>
                  <input readOnly value="Tenali Rama" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-[#006495] bg-slate-50 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Website</label>
                  <input readOnly value="www.reliance.com" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-[#006495] bg-slate-50 focus:outline-none" />
                </div>
              </div>
            )}
          </div>

          {/* Contact Details Section */}
          <div className="bg-white border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div
              onClick={() => toggleSection('contact')}
              className="bg-[#1A171F] text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer hover:bg-[#2A272F] transition-colors"
            >
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">person_outline</span>
                Contact Details
              </h2>
              <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.contact ? 'rotate-180' : ''}`}>expand_less</span>
              </button>
            </div>

            {openSections.contact && (
              <div className="p-8 flex items-center justify-center animate-in slide-in-from-top-2 fade-in duration-200">
                <p className="text-[0.85rem] text-slate-500 font-medium tracking-wide">No contact details available</p>
              </div>
            )}
          </div>

          {/* Deal Information Section */}
          <div className="bg-white border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div
              onClick={() => toggleSection('deal')}
              className="bg-[#1A171F] text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer hover:bg-[#2A272F] transition-colors"
            >
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">attach_money</span>
                Deal Information
              </h2>
              <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.deal ? 'rotate-180' : ''}`}>expand_less</span>
              </button>
            </div>

            {openSections.deal && (
              <div className="p-5 grid grid-cols-2 gap-x-4 gap-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Contract Stage</label>
                  <input readOnly value="Proposal" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Status</label>
                  <input readOnly value="Not Qualified" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Label</label>
                  <input readOnly value="Cold" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Contract Type</label>
                  <input readOnly value="Monthly" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Proposed ARR</label>
                  <input readOnly value="" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Contract Value</label>
                  <input readOnly value="" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Money in Bank</label>
                  <input readOnly value="" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Duration (Years)</label>
                  <input readOnly value="" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>

                <div className="flex flex-col gap-1 text-left col-span-2">
                  <label className="text-[0.75rem] font-bold text-[#3E4E63]">Timezone</label>
                  <input readOnly value="IST" className="w-full px-3 py-1.5 border border-outline/20 rounded-sm text-[0.85rem] text-slate-400 bg-white focus:outline-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Account Overview & Tabs */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white border border-outline/10 rounded-sm shadow-sm flex flex-col min-h-[70vh]">
            {/* Right Panel Header */}
            <div className="p-6 pb-2 border-b border-outline/10 flex flex-col gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
                  <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">description</span>
                  Account Overview
                </h2>
                <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Manage and view account details</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-8 mt-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-[0.85rem] font-bold transition-all ${activeTab === tab
                      ? 'border-[#FF8000] text-[#FF8000]'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline/20'
                      }`}
                  >
                    {tab === 'Email' && <span className="material-symbols-outlined !text-[18px]">mail</span>}
                    {tab === 'Notes' && <span className="material-symbols-outlined !text-[18px]">note</span>}
                    {tab === 'Tasks' && <span className="material-symbols-outlined !text-[18px]">task_alt</span>}
                    {tab === 'Documents' && <span className="material-symbols-outlined !text-[18px]">folder</span>}
                    {tab === 'History' && <span className="material-symbols-outlined !text-[18px]">history</span>}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/30">

              {activeTab === 'Email' && (
                <div className="flex flex-col items-center justify-center text-center max-w-[400px]">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 border border-outline/10">
                    <span className="material-symbols-outlined !text-[32px] text-slate-400">error</span>
                  </div>
                  <h3 className="text-[1.1rem] font-bold text-on-surface mb-2">Email not configured</h3>
                  <p className="text-[0.9rem] text-on-surface-variant">
                    Please ask <span className="font-bold text-slate-700">Shrinath Rao</span> to connect their Google account.
                  </p>
                </div>
              )}

              {activeTab !== 'Email' && (
                <div className="flex flex-col items-center justify-center text-center opacity-50">
                  <span className="material-symbols-outlined !text-[48px] text-slate-400 mb-4">construction</span>
                  <h3 className="text-[1.1rem] font-bold text-on-surface mb-2">{activeTab} section under construction</h3>
                  <p className="text-[0.9rem] text-on-surface-variant">
                    Information for {activeTab.toLowerCase()} will appear here.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Rightmost Column - Insights & Champions */}
        <div className="w-[320px] flex-shrink-0 flex flex-col gap-4">

          {/* Champion Details */}
          <div className="bg-white border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div className="bg-[#1A171F] text-white p-3 px-4 flex justify-between items-center rounded-t-sm">
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px] text-[#FF8000]">verified</span>
                Champion Details
              </h2>
            </div>

            <div className="p-6 flex flex-col items-center border-b border-outline/10">
              <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center shadow-sm mb-4 border border-outline/10 bg-slate-100">
                <span className="text-slate-500 font-bold text-[1.5rem]">TR</span>
              </div>
              <div className="text-[1.15rem] font-bold text-slate-800 tracking-tight leading-tight">Tenali Rama</div>
              <div className="text-[0.85rem] font-medium text-slate-500 mb-3">Chief Technology Officer</div>

              <div className="flex items-center gap-3 mb-5 text-[#006495]">
                <a href="#" className="hover:text-[#FF8000] transition-colors"><i className="fa-brands fa-linkedin text-[18px]"></i></a>
                <a href="#" className="text-slate-400 hover:text-[#FF8000] transition-colors"><i className="fa-brands fa-twitter text-[18px]"></i></a>
              </div>

              <div className="bg-slate-50 px-3 py-1.5 rounded-sm text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2 border border-outline/10 shadow-sm w-full text-center">
                Last Contacted
              </div>
              <div className="text-[0.8rem] font-semibold text-slate-600">
                01 Jul, 2024 | 11:19 AM
              </div>
            </div>
          </div>

          {/* Previous Champions */}
          <div className="bg-white border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div className="bg-[#1A171F] text-white p-3 px-4 flex justify-between items-center rounded-t-sm">
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">history</span>
                Previous Champions
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-outline/10 shadow-sm bg-slate-100 flex-shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqN59oxtGeBdvgVWGhfxxkdMU9hPcHp7YbPRv2cLzOa4DvV2k6LSubWDWa_Ch9L96Uy7uuzkvZmNjRtWEa7Gip4lQNJq0mg2neS3lkSwDp_jS9TPWeYWxKxAMlSBg0cI0TDBtvvbbI-_UZN9LyYTUyBDxQ9byL5FQa6Wt-lNsWAawJDIQ-W4MDcw0uJAa6W1qw9uZhqaXuKTjrG6NwwDPjVo4aT6BxqXgd7_sCvLcxRqYqj0LWu9yAnps3W-CLK_LhM-jz9KlRDM" alt="Prev Champion" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.85rem] font-bold text-slate-800 truncate">Vipul Nagarkar</div>
                  <div className="text-[0.75rem] font-medium text-slate-500 truncate">Former VP of Engineering</div>
                </div>
                <a href="#" className="text-[#006495] hover:text-[#FF8000] p-1"><i className="fa-brands fa-linkedin text-[16px]"></i></a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-outline/10 shadow-sm bg-slate-100 flex-shrink-0 flex items-center justify-center">
                  <span className="text-slate-500 font-bold text-[0.8rem]">AK</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.85rem] font-bold text-slate-800 truncate">Arjun Krishnan</div>
                  <div className="text-[0.75rem] font-medium text-slate-500 truncate">Director of IT</div>
                </div>
                <a href="#" className="text-[#006495] hover:text-[#FF8000] p-1"><i className="fa-brands fa-linkedin text-[16px]"></i></a>
              </div>
            </div>
          </div>

          {/* Company Insights */}
          <div className="bg-white border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div className="bg-[#1A171F] text-white p-3 px-4 flex justify-between items-center rounded-t-sm">
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">lightbulb</span>
                Company Insights
              </h2>
            </div>

            <div className="p-4">
              <div className="border border-outline/10 rounded-sm p-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                  <span className="text-[0.7rem] font-bold text-slate-900 tracking-widest uppercase">Expansion</span>
                </div>
                <h4 className="text-[0.9rem] font-bold leading-snug text-slate-800 mb-2">
                  New infrastructure rollout plan announced for Q4.
                </h4>
                <p className="text-[0.75rem] font-medium text-slate-400">2 hours ago</p>
              </div>

              <button className="w-full bg-[#FF8000] text-white px-4 py-1.5 rounded-sm text-[0.8rem] font-bold uppercase tracking-wider transition-colors shadow-sm active:scale-[0.98] hover:bg-[#E67300]">
                View More Insights
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeadDetailsView;
