import React, { useState } from 'react';

interface AdvancedFiltersOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedFiltersOverlay: React.FC<AdvancedFiltersOverlayProps> = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState([{ id: 1, column: '', operator: '', value: '' }]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Side Overlay */}
      <div className="fixed top-0 right-0 h-full w-[650px] max-w-[90vw] bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right">
        {/* Header */}
        <div className="p-6 border-b border-outline/5 relative text-slate-800">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-orange-400 p-1 hover:bg-orange-50 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="flex items-center gap-3 pr-8">
            <span className="material-symbols-outlined text-slate-700 !text-[22px]">filter_list</span>
            <h2 className="text-[1.25rem] font-bold tracking-tight leading-tight">Advanced Filters</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-slate-50/30">
          
          {filters.map((filter) => (
            <div key={filter.id} className="bg-white border border-outline/10 rounded-sm p-4 flex gap-4 items-end shadow-sm relative group">
              {filters.length > 1 && (
                <button 
                  onClick={() => setFilters(filters.filter(f => f.id !== filter.id))}
                  className="absolute -right-2 -top-2 bg-white border border-outline/10 text-slate-400 hover:text-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-50"
                >
                  <span className="material-symbols-outlined !text-[16px]">close</span>
                </button>
              )}
              
              <div className="flex flex-col gap-1.5 flex-1 relative">
                <label className="text-[0.8rem] font-bold text-slate-700">Column</label>
                <div 
                  onClick={() => setOpenDropdown(openDropdown === `col_${filter.id}` ? null : `col_${filter.id}`)}
                  className="flex items-center justify-between w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 cursor-pointer hover:border-[#FF8000]/50 transition-colors group"
                >
                  <span className={filter.column ? "text-slate-800" : "text-slate-400"}>
                    {filter.column || 'Select Column'}
                  </span>
                  <span className="material-symbols-outlined !text-[18px] text-slate-400 group-hover:text-[#FF8000]">expand_more</span>
                </div>
                {openDropdown === `col_${filter.id}` && (
                  <>
                    <div className="fixed inset-0 z-[110]" onClick={() => setOpenDropdown(null)} />
                    <div className="absolute top-full mt-1 left-0 w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-[120] animate-in fade-in duration-100">
                      {['Company', 'Contact Name', 'Email', 'Industry', 'Lead Owner', 'Contract Stage', 'Status', 'Label'].map(opt => (
                        <div 
                          key={opt} 
                          onClick={() => { 
                            setFilters(filters.map(f => f.id === filter.id ? { ...f, column: opt } : f)); 
                            setOpenDropdown(null); 
                          }} 
                          className="px-3 py-2 text-[0.85rem] text-slate-700 font-medium hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-1 relative">
                <label className="text-[0.8rem] font-bold text-slate-700">Operator</label>
                <div 
                  onClick={() => setOpenDropdown(openDropdown === `op_${filter.id}` ? null : `op_${filter.id}`)}
                  className="flex items-center justify-between w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] text-slate-600 cursor-pointer hover:border-[#FF8000]/50 transition-colors group"
                >
                  <span className={filter.operator ? "text-slate-800" : "text-slate-400"}>
                    {filter.operator || 'Operator'}
                  </span>
                  <span className="material-symbols-outlined !text-[18px] text-slate-400 group-hover:text-[#FF8000]">expand_more</span>
                </div>
                {openDropdown === `op_${filter.id}` && (
                  <>
                    <div className="fixed inset-0 z-[110]" onClick={() => setOpenDropdown(null)} />
                    <div className="absolute top-full mt-1 left-0 w-full bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-[120] animate-in fade-in duration-100">
                      {['Equals', 'Contains', 'Starts with', 'Ends with', 'Is empty', 'Is not empty'].map(opt => (
                        <div 
                          key={opt} 
                          onClick={() => { 
                            setFilters(filters.map(f => f.id === filter.id ? { ...f, operator: opt } : f)); 
                            setOpenDropdown(null); 
                          }} 
                          className="px-3 py-2 text-[0.85rem] text-slate-700 font-medium hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[0.8rem] font-bold text-slate-700">Value</label>
                <input 
                  type="text" 
                  value={filter.value}
                  onChange={(e) => setFilters(filters.map(f => f.id === filter.id ? { ...f, value: e.target.value } : f))}
                  placeholder="Enter Value" 
                  className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-slate-400" 
                />
              </div>
            </div>
          ))}

          <button 
            onClick={() => setFilters([...filters, { id: Date.now(), column: '', operator: '', value: '' }])}
            className="w-full py-3 border border-dashed border-outline/30 rounded-sm flex items-center justify-center gap-2 text-[0.85rem] font-bold text-slate-600 hover:text-[#FF8000] hover:border-[#FF8000]/50 hover:bg-orange-50/30 transition-all bg-white shadow-sm mt-2"
          >
            <span className="material-symbols-outlined !text-[18px]">add</span>
            Add Another Filter
          </button>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-outline/5 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.03)] bg-white">
          <button 
            onClick={() => setFilters([{ id: 1, column: '', operator: '', value: '' }])}
            className="flex items-center gap-2 px-4 py-1.5 bg-red-400 text-white border border-red-500 hover:bg-red-500 rounded-sm text-[0.8rem] font-bold transition-colors uppercase tracking-wider shadow-sm"
          >
            <span className="material-symbols-outlined !text-[18px]">close</span>
            Reset All
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex items-center justify-center min-w-[100px] px-4 py-1.5 border border-slate-200 rounded-sm text-[0.8rem] font-bold text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-wider"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="flex items-center justify-center min-w-[100px] px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#FF8000]/90 transition-all uppercase tracking-wider shadow-sm active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFiltersOverlay;
