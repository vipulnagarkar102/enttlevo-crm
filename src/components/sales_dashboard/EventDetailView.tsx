import React from 'react';

interface EventDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (event: any) => void;
  onDelete: (id: string) => void;
  event: any;
}

const EventDetailView: React.FC<EventDetailViewProps> = ({ isOpen, onClose, onEdit, onDelete, event }) => {
  if (!isOpen || !event) return null;

  return (
    <>
      {/* Full-Screen Detail View Wrapper */}
      <div className="fixed inset-0 bg-surface z-[1000] flex flex-col animate-in fade-in duration-300 font-body overflow-hidden">
        
        {/* Navigation / Header Bar */}
        <div className="bg-white px-8 py-5 border-b border-outline/10 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={onClose}
              className="flex items-center justify-center p-2 text-on-surface-variant hover:text-[#FF8000] hover:bg-orange-50 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
            </button>
            
            <div>
              <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3">
                {event.title}
                <span className="px-2 py-0.5 bg-slate-100 text-[#1A171F] text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                   Upcoming
                </span>
              </h1>
              <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">
                Event Detail & Meeting Coordination • <span className="font-bold">EV-{event.id || '94000'}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onEdit(event)}
              className="flex items-center gap-2 px-4 py-1.5 border border-outline/20 rounded-sm bg-white text-[0.8rem] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm tracking-wider uppercase active:scale-95"
            >
              <span className="material-symbols-outlined !text-[16px]">edit</span>
              Edit Meeting
            </button>
            <button 
              onClick={() => onDelete(event.id)}
              className="flex items-center gap-2 px-4 py-1.5 bg-red-500 border border-red-600 text-white rounded-sm text-[0.8rem] font-bold hover:bg-red-600 transition-colors shadow-sm tracking-wider uppercase active:scale-95"
            >
              <span className="material-symbols-outlined !text-[16px]">delete</span>
              Delete
            </button>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar-mini">
          
          {/* Main Container - Centered */}
          <div className="max-w-[1400px] mx-auto w-full p-8 pb-20 mt-4">
            
            {/* Quick Info Logic Section - Updated styling */}
            <div className="bg-white p-7 border border-outline/10 rounded-sm shadow-sm mb-8 relative overflow-hidden">
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Meeting Date</label>
                        <div className="flex items-center gap-3 text-slate-700 px-3 py-2 bg-slate-50 border border-outline/10 rounded-sm">
                            <span className="material-symbols-outlined !text-[18px] text-[#FF8000]">calendar_today</span>
                            <span className="text-[0.9rem] font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Time Slot</label>
                        <div className="flex items-center gap-3 text-slate-700 px-3 py-2 bg-slate-50 border border-outline/10 rounded-sm">
                            <span className="material-symbols-outlined !text-[18px] text-blue-500">schedule</span>
                            <span className="text-[0.9rem] font-bold">{event.startTime} - {event.endTime}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest">Meeting Link</label>
                        <div className="flex items-center gap-3 text-emerald-600 px-3 py-2 bg-slate-50 border border-outline/10 rounded-sm hover:bg-emerald-50 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined !text-[18px]">videocam</span>
                            <span className="text-[0.9rem] font-bold truncate">meet.google.com/q4-strat...</span>
                            <span className="material-symbols-outlined !text-[14px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Two-Column Layout */}
            <div className="grid grid-cols-12 gap-8">
              
              {/* Left Column - Core Content */}
              <div className="col-span-8 space-y-8">
                
                {/* Description & Agenda */}
                <div className="bg-white p-8 border border-outline/10 rounded-sm shadow-sm">
                  <h2 className="text-[1.25rem] font-black text-slate-800 mb-6 flex items-center gap-3">
                    <span className="w-2 h-6 bg-slate-800 rounded-full" />
                    Description & Meeting Agenda
                  </h2>
                  <p className="text-[1rem] text-slate-500 leading-relaxed mb-10">
                    {event.description || 'This strategic session aims to finalize the roadmap for the final quarter. We will review performance metrics, finalize team allocations, and align on key growth initiatives for the upcoming cycle.'}
                  </p>

                  {/* Discussion Points List */}
                  <div className="bg-slate-50 p-8 rounded-sm border border-slate-100 relative">
                    <h3 className="text-[0.9rem] font-black text-slate-700 mb-8 uppercase tracking-widest">Key Discussion Items</h3>
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        'Comprehensive Review of Q3 Performance vs Revenue Targets',
                        'Market Expansion Strategy for Western Europe & APAC Regions',
                        'Human Resource Allocation for New Product Launch Cycle',
                        'Risk Mitigation Planning for Supply Chain Volatility'
                      ].map((point, idx) => (
                        <div key={idx} className="flex gap-4 group">
                          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center shrink-0 font-bold text-[0.8rem] group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                            {idx + 1}
                          </div>
                          <p className="text-[0.9rem] text-slate-600 font-medium pt-1.5">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Attachments Area */}
                <div className="bg-white p-8 border border-outline/10 rounded-sm shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[1.25rem] font-black text-slate-800">Shared Resources</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-sm text-[0.75rem] font-bold uppercase tracking-widest hover:bg-orange-100 transition-all">
                      <span className="material-symbols-outlined !text-[18px]">cloud_upload</span>
                      Add File
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Strategy_Deck_Q4.pdf', size: '4.2 MB', ext: 'PDF', icon: 'picture_as_pdf', color: 'text-rose-500 bg-rose-50' },
                      { name: 'Resource_Planner.xlsx', size: '1.8 MB', ext: 'XLSX', icon: 'table_chart', color: 'text-emerald-500 bg-emerald-50' }
                    ].map((file, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-5 border border-slate-100 rounded-sm hover:border-orange-200 hover:bg-orange-50/20 transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-sm flex items-center justify-center ${file.color}`}>
                          <span className="material-symbols-outlined !text-[32px]">{file.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[0.9rem] font-black text-slate-700 truncate group-hover:text-orange-600 transition-colors">{file.name}</div>
                          <div className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-tighter">{file.size} • {file.ext}</div>
                        </div>
                        <span className="material-symbols-outlined text-slate-200 group-hover:text-orange-400 transition-colors">download</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebars */}
              <div className="col-span-4 space-y-8">
                
                {/* Attendees List Card */}
                <div className="bg-white border border-outline/10 rounded-sm shadow-sm">
                  <div className="p-5 border-b border-outline/5 flex justify-between items-center bg-white">
                    <h2 className="text-[1rem] font-black text-slate-800 flex items-center gap-2">
                       Attendees (4)
                    </h2>
                    <button className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                      <span className="material-symbols-outlined !text-[20px]">add</span>
                    </button>
                  </div>
                  
                  <div className="divide-y divide-outline/5">
                    {[
                      { name: 'Alex Johnson', role: 'Team Lead', status: 'Accepted' },
                      { name: 'Sarah Miller', role: 'Developer', status: 'Accepted' },
                      { name: 'David Chen', role: 'Architect', status: 'Pending' },
                      { name: 'Elena Rodriguez', role: 'Manager', status: 'Accepted' }
                    ].map((user, idx) => (
                      <div key={idx} className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                        <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} className="w-10 h-10 rounded-full border border-white shadow-sm" alt="" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[0.9rem] font-black text-slate-700 truncate">{user.name}</div>
                          <div className="text-[0.7rem] font-bold text-slate-300 uppercase italic">{user.role}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-[4px] text-[0.6rem] font-black uppercase tracking-widest ${user.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-500'}`}>
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join Call Action Card */}
                <div className="bg-white border border-outline/10 rounded-sm shadow-xl overflow-hidden group">
                  <div className="h-32 bg-slate-900 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 opacity-50" />
                    <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl scale-110 group-hover:scale-125 transition-transform duration-500">
                      <span className="material-symbols-outlined !text-[32px]">videocam</span>
                    </div>
                  </div>
                    <div className="p-8 text-center bg-white">
                        <h3 className="text-[1.2rem] font-black text-slate-800 mb-2">Google Meet Call</h3>
                        <p className="text-[0.8rem] text-slate-400 mb-8 italic">The session is ready to begin. Please join using the official team link.</p>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold uppercase tracking-widest shadow-md hover:shadow-lg active:scale-[0.98] transition-all">
                            <span className="material-symbols-outlined !text-[18px]">send_to_mobile</span>
                            Join Meeting Now
                        </button>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailView;
