import React from 'react';

interface CreateLeadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateLeadOverlay: React.FC<CreateLeadOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Side Overlay */}
      <div className="fixed top-0 right-0 h-full w-[800px] max-w-[90vw] bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right">
        {/* Header */}
        <div className="p-6 border-b border-outline/5 relative">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-orange-400 p-1 hover:bg-orange-50 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="pr-8">
            <h2 className="text-[1.25rem] font-bold text-slate-800 tracking-tight leading-tight">Create New Lead</h2>
            <p className="text-[0.8rem] text-slate-500 mt-1">Fields marked with <span className="text-error">*</span> are required</p>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Organization Name */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">domain</span>
                Organization Name <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="Enter organization name" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40" />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">call</span>
                Phone Number <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="Enter phone number" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40" />
            </div>

            {/* Contact Person */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">person</span>
                Contact Person <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="Enter contact person name" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40" />
            </div>

            {/* Website */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">language</span>
                Website
              </label>
              <input type="text" placeholder="Enter website URL" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40" />
            </div>

            {/* Industry */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">factory</span>
                Industry <span className="text-error">*</span>
              </label>
              <div className="relative w-full">
                <select defaultValue="" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] text-on-surface-variant/70 focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_10px_center]">
                  <option value="" disabled>Select Industry</option>
                  <option value="IT">IT & Software</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <div className="w-[18px] flex justify-center"><i className="fa-brands fa-linkedin text-on-surface-variant/70 text-[16px]"></i></div>
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">link</span>
                LinkedIn Profile
              </label>
              <input type="text" placeholder="Enter LinkedIn profile URL" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40" />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">mail</span>
                Email Address <span className="text-error">*</span>
              </label>
              <input type="email" placeholder="Enter email address" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40" />
            </div>

            {/* Product Interest */}
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">inventory_2</span>
                Product Interest <span className="text-error">*</span>
              </label>
              <input type="text" placeholder="Enter product interest" className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-outline/5 flex justify-end gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] bg-white">
          <button 
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-4 py-1.5 border border-slate-200 rounded-sm text-[0.8rem] font-bold text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button className="flex items-center justify-center min-w-[100px] px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#FF8000]/90 transition-all uppercase tracking-wider shadow-sm active:scale-95">
            Create Lead
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateLeadOverlay;
