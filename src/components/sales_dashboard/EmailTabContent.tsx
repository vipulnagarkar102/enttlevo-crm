import React, { useState } from 'react';
import ComposeEmailOverlay from './ComposeEmailOverlay';

const EmailTabContent = () => {
  const [activeSubTab, setActiveSubTab] = useState('Inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [viewingEmail, setViewingEmail] = useState<any>(null);
  const [composeData, setComposeData] = useState({ subject: '', message: '' });
  
  const [emails, setEmails] = useState([
    { id: 1, folder: 'Inbox', sender: 'Mukesh Kumar', initials: 'MK', subject: 'Q4 Partnership Expansion Proposal', snippet: 'Hi Team, attached is the revised pr', time: '10:42 AM', isStarred: false, isSelected: false, initialsBg: 'bg-[#F0F4F8] text-[#5C6B8A]' },
    { id: 2, folder: 'Inbox', sender: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?img=47', subject: 'Updates regarding site visit', snippet: "I've confirmed with the logistics te", time: 'YESTERDAY', isStarred: true, isSelected: false },
    { id: 3, folder: 'Inbox', sender: 'Rohan Ambani', initials: 'RA', subject: 'Signed contract copy', snippet: 'Please find the signed Master Serv', time: 'Oct 24', isStarred: false, isSelected: false, initialsBg: 'bg-[#F0F4F8] text-[#5C6B8A]' },
    { id: 4, folder: 'Inbox', sender: 'Priority Logistics', initials: 'PL', subject: 'Invoice #982193 - Ready for Payment', snippet: 'The invoice for the latest hardware', time: 'Oct 22', isStarred: false, isSelected: false, initialsBg: 'bg-[#F0F4F8] text-[#5C6B8A]' },
    { id: 5, folder: 'Sent', sender: 'You', initials: 'ME', subject: 'Re: Q4 Partnership Expansion Proposal', snippet: 'Thanks Mukesh, I will review the documents and get back to you...', time: '11:15 AM', isStarred: false, isSelected: false, initialsBg: 'bg-orange-100 text-orange-800' },
    { id: 6, folder: 'Sent', sender: 'You', initials: 'ME', subject: 'Contract Addendum setup', snippet: 'Please find the attached addendum for the new clauses discussed.', time: 'Oct 23', isStarred: true, isSelected: false, initialsBg: 'bg-orange-100 text-orange-800' },
    { id: 7, folder: 'Drafts', sender: 'Draft', initials: 'DR', subject: 'Follow-up on product demo', snippet: 'Hi Sarah, just following up on our demo last week. Let me know if...', time: '9:00 AM', isStarred: false, isSelected: false, initialsBg: 'bg-slate-100 text-slate-500' },
  ]);

  // Filter emails by subtab
  const displayedEmails = emails.filter(e => e.folder === activeSubTab);
  const selectedCount = displayedEmails.filter(e => e.isSelected).length;
  const isAllSelected = selectedCount === displayedEmails.length && displayedEmails.length > 0;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setEmails(emails.map(e => ({ ...e, isSelected: false })));
    } else {
      // only select current tab items
      const displayedIds = displayedEmails.map(e => e.id);
      setEmails(emails.map(e => displayedIds.includes(e.id) ? { ...e, isSelected: true } : e));
    }
  };

  const handleSelect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(eObj => eObj.id === id ? { ...eObj, isSelected: !eObj.isSelected } : eObj));
  };

  const handleToggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(eObj => eObj.id === id ? { ...eObj, isStarred: !eObj.isStarred } : eObj));
  };

  const handleViewEmail = (email: any) => {
    if (email.folder === 'Drafts') {
      setComposeData({ subject: email.subject, message: email.snippet });
      setIsComposeOpen(true);
    } else {
      setViewingEmail(email);
    }
  };

  if (viewingEmail) {
    return (
      <div className="flex flex-col h-full w-full bg-white animate-in fade-in duration-300">
        <div className="p-6 border-b border-outline/10 flex items-center justify-between shrink-0">
          <button 
            onClick={() => setViewingEmail(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-[0.85rem]"
          >
            <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
            Back to {viewingEmail.folder}
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-900">
              <span className="material-symbols-outlined !text-[18px]">archive</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors text-slate-500 hover:text-red-500">
              <span className="material-symbols-outlined !text-[18px]">delete</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-[1.3rem] font-bold text-slate-900 leading-tight pr-8">{viewingEmail.subject}</h1>
            <span className="text-[0.75rem] font-bold text-slate-400 whitespace-nowrap mt-1">{viewingEmail.time}</span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0 ${viewingEmail.avatar ? '' : viewingEmail.initialsBg}`}>
              {viewingEmail.avatar ? (
                <img src={viewingEmail.avatar} alt={viewingEmail.sender} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[1rem] font-bold">{viewingEmail.initials}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[0.95rem] font-bold text-slate-900">{viewingEmail.sender}</span>
                <span className="text-[0.8rem] text-slate-500">&lt;contact@enterprise.com&gt;</span>
              </div>
              <span className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-wide">To: Me</span>
            </div>
          </div>

          <div className="text-[0.95rem] text-slate-800 leading-relaxed whitespace-pre-wrap">
            {viewingEmail.snippet.length > 50 
              ? viewingEmail.snippet + "\n\nPlease let me know if you need anything else.\n\nBest regards,\n" + viewingEmail.sender 
              : "Hi,\n\n" + viewingEmail.snippet + "\n\nThanks,\n" + viewingEmail.sender}
          </div>
        </div>
        
        <div className="p-6 border-t border-outline/5 bg-slate-50 shrink-0 flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-outline/20 rounded-sm text-[0.85rem] font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm active:scale-[0.98]">
            <span className="material-symbols-outlined !text-[18px]">reply</span>
            Reply
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-outline/20 rounded-sm text-[0.85rem] font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm active:scale-[0.98]">
            <span className="material-symbols-outlined !text-[18px]">forward</span>
            Forward
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-white animate-in fade-in duration-300">
      {/* Email Heading & Sub Tabs grouped to look like right panel header */}
      <div className="p-6 pb-0 border-b border-outline/10 flex flex-col gap-4 shrink-0">
        <div>
          <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
            <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">mail</span>
            Email
          </h2>
          <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Manage communications and drafts</p>
        </div>

        {/* Sub Tabs */}
        <div className="flex items-center gap-8 mt-2">
          {['Inbox', 'Sent', 'Drafts'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-[0.85rem] font-bold transition-all ${
                activeSubTab === tab 
                  ? 'border-[#FF8000] text-[#FF8000]' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Compose */}
      <div className="px-6 py-4 flex gap-4 items-center shrink-0 border-b border-outline/5">
        <div className="relative flex-1 max-w-[400px]">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 !text-sm">search</span>
          <input 
            type="text" 
            placeholder="Search in emails..." 
            className="w-full bg-slate-50 border border-slate-200/60 rounded-sm py-1.5 pl-8 pr-3 text-[0.8rem] focus:outline-none focus:bg-white focus:border-[#FF8000]/50 transition-all placeholder:text-slate-400"
          />
        </div>
        <button 
          onClick={() => setIsComposeOpen(true)}
          className="flex items-center gap-2 px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#FF8000]/90 transition-colors shadow-sm tracking-wider uppercase active:scale-95 whitespace-nowrap ml-auto"
        >
          <span className="material-symbols-outlined !text-[16px]">edit_square</span>
          Compose
        </button>
      </div>

      {/* Toolbar */}
      {selectedCount > 0 && (
        <div className="px-6 py-2 flex items-center justify-between bg-slate-50/50 border-y border-outline/5 relative z-10 shrink-0 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-3">
            <div 
              onClick={handleSelectAll}
              className={`flex items-center justify-center w-[18px] h-[18px] rounded-[3px] cursor-pointer shadow-sm transition-colors ${isAllSelected ? 'bg-[#FF8000]' : 'bg-white border border-outline/20 hover:border-outline/40'}`}
            >
              {isAllSelected && <span className="material-symbols-outlined !text-[14px] text-white font-bold">check</span>}
            </div>
            <span className={`text-[0.75rem] font-bold tracking-wider uppercase mt-0.5 cursor-pointer select-none transition-colors ${isAllSelected ? 'text-[#FF8000]' : 'text-slate-500 hover:text-slate-700'}`} onClick={handleSelectAll}>
              Select All
            </span>
          </div>

          <div className="flex items-center bg-white border border-outline/10 shadow-sm rounded-sm p-1 gap-1">
            <div className="px-3 py-1 bg-[#FF8000]/10 rounded-sm mr-1">
              <span className="text-[0.75rem] font-bold text-[#FF8000]">{selectedCount} Selected</span>
            </div>
            <div className="w-[1px] h-4 bg-outline/20 mx-1"></div>
            <button className="w-7 h-7 text-slate-600 hover:bg-slate-50 flex items-center justify-center rounded-sm transition-colors group">
              <span className="material-symbols-outlined !text-[18px] group-hover:text-slate-900">archive</span>
            </button>
            <button className="w-7 h-7 text-slate-600 hover:bg-slate-50 flex items-center justify-center rounded-sm transition-colors group">
              <span className="material-symbols-outlined !text-[18px] group-hover:text-red-500">delete</span>
            </button>
            <button className="w-7 h-7 text-slate-600 hover:bg-slate-50 flex items-center justify-center rounded-sm transition-colors group">
              <span className="material-symbols-outlined !text-[18px] group-hover:text-slate-900">mark_email_unread</span>
            </button>
            <button className="w-7 h-7 text-slate-600 hover:bg-slate-50 flex items-center justify-center rounded-sm transition-colors group">
              <span className="material-symbols-outlined !text-[18px] group-hover:text-slate-900">label</span>
            </button>
            <button className="w-7 h-7 text-slate-600 hover:bg-slate-50 flex items-center justify-center rounded-sm transition-colors group">
              <span className="material-symbols-outlined !text-[18px] group-hover:text-slate-900">schedule</span>
            </button>
          </div>
        </div>
      )}

      {/* Email List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {displayedEmails.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full opacity-60">
             <span className="material-symbols-outlined !text-[48px] text-slate-300 mb-4">inbox</span>
             <p className="text-[0.95rem] font-bold text-slate-500">No emails in {activeSubTab}</p>
           </div>
        ) : (
          displayedEmails.map((email) => (
            <div 
              key={email.id} 
              onClick={() => handleViewEmail(email)}
              className={`flex items-start gap-4 px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer group ${email.isSelected ? 'bg-[#FCFAEF]/40' : ''}`}
            >
              {/* Checkbox */}
              <div 
                onClick={(e) => handleSelect(email.id, e)}
                className={`mt-1 flex items-center justify-center w-[18px] h-[18px] rounded-[3px] shrink-0 shadow-sm transition-colors ${email.isSelected ? 'bg-[#FF8000]' : 'border border-outline/20 bg-white group-hover:border-outline/40'}`}
              >
                {email.isSelected && <span className="material-symbols-outlined !text-[14px] text-white font-bold">check</span>}
              </div>

              {/* Avatar */}
              <div className={`mt-0.5 w-10 h-10 rounded-full shrink-0 flex items-center justify-center overflow-hidden ${email.avatar ? '' : email.initialsBg}`}>
                {email.avatar ? (
                  <img src={email.avatar} alt={email.sender} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[0.85rem] font-bold">{email.initials}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[0.95rem] font-bold text-slate-900">{email.sender}</span>
                  <span className={`text-[0.65rem] font-bold tracking-wider uppercase ${email.time === 'YESTERDAY' ? 'text-[#FF8000]' : 'text-slate-400'}`}>
                    {email.time}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[0.85rem] text-slate-800 tracking-wide">{email.subject}</span>
                  <div className="flex items-center gap-1 -mr-2">
                    <button 
                      onClick={(e) => handleToggleStar(email.id, e)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-200/50 rounded-full transition-colors"
                    >
                      <span className={`material-symbols-outlined !text-[18px] transition-colors ${email.isStarred ? 'text-[#FF8000]' : 'text-slate-300'}`} style={email.isStarred ? {fontVariationSettings: "'FILL' 1"} : {}}>star</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-200/50 rounded-full transition-colors">
                      <span className="material-symbols-outlined !text-[18px] text-slate-300">more_vert</span>
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-[0.85rem] text-slate-500 tracking-wide line-clamp-1">{email.snippet}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Compose Overlay */}
      <ComposeEmailOverlay 
        isOpen={isComposeOpen} 
        onClose={() => {
          setIsComposeOpen(false);
          setComposeData({ subject: '', message: '' });
        }} 
        initialSubject={composeData.subject}
        initialMessage={composeData.message}
      />
    </div>
  );
};

export default EmailTabContent;
