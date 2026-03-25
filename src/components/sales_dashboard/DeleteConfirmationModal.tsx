import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadName?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  leadName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[450px] flex flex-col transform animate-in zoom-in-95 duration-200 border border-outline/10 overflow-hidden">


        {/* Content */}
        <div className="p-8 pb-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 border-8 border-red-50/50">
            <span className="material-symbols-outlined !text-[32px] text-red-500">warning</span>
          </div>
          <h2 className="text-[1.25rem] font-bold text-slate-800 tracking-tight leading-tight mb-2">Delete Lead?</h2>
          <p className="text-[0.9rem] text-slate-500 leading-relaxed max-w-[300px]">
            Are you sure you want to delete <span className="font-semibold text-slate-700">{leadName ? `"${leadName}"` : 'this lead'}</span>? This action cannot be undone and the record will be permanently removed.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-0 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-5 py-2 border border-slate-200 bg-white rounded-sm text-[0.85rem] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center min-w-[100px] gap-2 px-5 py-2 bg-red-500 border border-red-600 text-white rounded-sm text-[0.85rem] font-bold hover:bg-red-600 transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined !text-[18px]">delete</span>
            Delete Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
