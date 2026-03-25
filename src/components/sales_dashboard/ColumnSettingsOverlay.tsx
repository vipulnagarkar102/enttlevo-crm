import React, { useState } from 'react';

interface ColumnSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  columns: { id: string, label: string, key: string, visible: boolean }[];
  onToggle: (id: string) => void;
  onReset: () => void;
  onSave: () => void;
}

const ColumnSettingsOverlay: React.FC<ColumnSettingsProps> = ({ 
  isOpen, 
  onClose, 
  columns, 
  onToggle, 
  onReset,
  onSave
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColumns = columns.filter(col => 
    col.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    col.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCount = columns.filter(c => c.visible).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Side Overlay */}
      <div className="fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-outline/5 relative">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-orange-400 p-1 hover:bg-orange-50 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          
          <div className="flex items-center gap-3 mb-6 pr-8">
            <span className="material-symbols-outlined text-slate-700 !text-[22px]">settings_suggest</span>
            <h2 className="text-[0.95rem] font-bold text-slate-800 uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
              Unassigned Sales Table Column Settings
            </h2>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-[18px]">search</span>
              <input 
                type="text"
                placeholder="Search columns..."
                className="w-full border border-slate-200 rounded-sm py-2 pl-10 pr-4 text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 transition-all placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-sm text-[0.8rem] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <span className="material-symbols-outlined !text-[18px]">refresh</span>
              Reset
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <span className="text-[0.75rem] font-medium text-slate-500">{visibleCount} of {columns.length} columns visible</span>
            <span className="bg-slate-100 text-slate-600 text-[0.7rem] font-bold px-2 py-0.5 rounded-sm uppercase">{visibleCount}/{columns.length}</span>
          </div>
        </div>

        {/* Column List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/30 custom-scrollbar">
          {filteredColumns.map(column => (
            <div 
              key={column.id}
              className={`flex items-center justify-between p-3 rounded-sm border transition-all ${column.visible ? 'bg-orange-50 border-orange-100/50' : 'bg-white border-slate-100 opacity-60'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`material-symbols-outlined !text-[20px] ${column.visible ? 'text-orange-400' : 'text-slate-300'}`}>
                  {column.visible ? 'visibility' : 'visibility_off'}
                </span>
                <div className="flex flex-col">
                  <span className="text-[0.85rem] font-bold text-slate-800 leading-tight">{column.label}</span>
                  <span className="text-[0.7rem] font-medium text-slate-500/80">{column.key}</span>
                </div>
              </div>
              
              <button 
                onClick={() => onToggle(column.id)}
                className={`relative w-11 h-5 rounded-full transition-colors duration-200 focus:outline-none ${column.visible ? 'bg-[#FF8000]' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${column.visible ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/5 flex justify-end gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <button 
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-4 py-1.5 border border-slate-200 rounded-sm text-[0.8rem] font-bold text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            onClick={() => { onSave(); onClose(); }}
            className="flex items-center justify-center min-w-[100px] px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#FF8000]/90 transition-all uppercase tracking-wider shadow-sm active:scale-95"
          >
            Save
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default ColumnSettingsOverlay;
