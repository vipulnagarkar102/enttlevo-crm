import React, { useState } from 'react';

interface AssignLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (memberName: string | 'me') => void;
}

const AssignLeadModal: React.FC<AssignLeadModalProps> = ({ isOpen, onClose, onAssign }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[500px] flex flex-col transform animate-in zoom-in-95 duration-200 border border-outline/10">
        
        {/* Header */}
        <div className="p-5 border-b border-outline/5 flex justify-between items-center relative">
          <h2 className="text-[1.1rem] font-bold text-slate-800 tracking-tight leading-tight">Assign Lead</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 p-1 hover:text-orange-400 hover:bg-orange-50 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4 flex flex-col items-center">
          <div className="relative w-full z-10 max-w-[400px]">
             <div 
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex items-center justify-between w-full px-4 py-2 border rounded-sm text-[0.85rem] cursor-pointer hover:bg-orange-50/50 transition-colors group ${openDropdown ? 'border-[#FF8000] ring-1 ring-[#FF8000]/20' : 'border-[#FF8000]/60'}`}
             >
               <span className={selectedMember ? "text-slate-800 font-medium" : "text-slate-400"}>
                 {selectedMember || 'Select team member'}
               </span>
               <span className="material-symbols-outlined !text-[20px] text-slate-400 group-hover:text-[#FF8000]">expand_more</span>
             </div>

             {openDropdown && (
                <>
                  <div className="fixed inset-0 z-[110]" onClick={() => setOpenDropdown(false)} />
                  <div className="absolute top-full mt-1 left-0 w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-[120] animate-in fade-in duration-100 max-h-[200px] overflow-y-auto custom-scrollbar">
                    {['Rishi', 'Prasadi', 'Richardson', 'Shanu', 'Ravish'].map(opt => (
                      <div 
                        key={opt} 
                        onClick={() => { setSelectedMember(opt); setOpenDropdown(false); }} 
                        className="px-4 py-2 text-[0.85rem] text-slate-700 font-medium hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </>
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 flex justify-center gap-3">
          <button 
            onClick={() => onAssign(selectedMember)}
            disabled={!selectedMember}
            className="flex items-center justify-center min-w-[100px] px-5 py-2 bg-[#FFD9B3]/70 text-[#FF8000] hover:bg-[#FFD9B3] rounded-sm text-[0.85rem] font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign
          </button>
          <button 
            onClick={() => onAssign('me')}
            className="flex items-center justify-center min-w-[100px] px-5 py-2 bg-[#FF8000] border border-[#FF8000] text-white rounded-sm text-[0.85rem] font-bold hover:bg-[#FF8000]/90 transition-all shadow-sm active:scale-95"
          >
            Assign to Me
          </button>
          <button 
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-5 py-2 border border-slate-200 bg-white rounded-sm text-[0.85rem] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignLeadModal;
