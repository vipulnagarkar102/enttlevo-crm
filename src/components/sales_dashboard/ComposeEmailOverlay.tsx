import React, { useState, useEffect } from 'react';

interface ComposeEmailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  initialMessage?: string;
}

const ComposeEmailOverlay: React.FC<ComposeEmailOverlayProps> = ({
  isOpen,
  onClose,
  initialSubject = '',
  initialMessage = ''
}) => {
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState(initialMessage);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubject(initialSubject);
      setMessage(initialMessage);
    }
  }, [isOpen, initialSubject, initialMessage]);

  const [recipients, setRecipients] = useState([
    { email: 'arjun.d@enterprise.com', name: 'Arjun Deshmukh', initials: 'AD', color: 'bg-[#FF8000]' }
  ]);
  const [newRecipient, setNewRecipient] = useState('');

  const handleAddRecipient = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newRecipient.trim() !== '') {
      setRecipients([...recipients, { email: newRecipient, name: newRecipient, initials: newRecipient.charAt(0).toUpperCase(), color: 'bg-slate-400' }]);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (emailToRemove: string) => {
    setRecipients(recipients.filter(r => r.email !== emailToRemove));
  };

  const handleDelete = () => {
    setToastMessage('Message draft deleted successfully');
    setTimeout(() => {
      setToastMessage(null);
      setSubject('');
      setMessage('');
      onClose(); // Auto close the drawer
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Side Overlay */}
      <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 animate-slide-in-right">

        {/* Header */}
        <div className="p-5 border-b border-outline/10 flex items-center justify-between shrink-0">
          <h2 className="text-[1.05rem] font-bold text-slate-900 border-none outline-none focus:outline-none focus:border-none focus:ring-0">
            New Message
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 p-1 hover:bg-slate-50 transition-colors rounded-full"
            title="Close"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
          {/* To Field */}
          <div className="px-5 py-3 border-b border-outline/5 flex items-start gap-4">
            <span className="text-[0.85rem] text-slate-400 mt-1 min-w-[24px]">To</span>
            <div className="flex-1 flex flex-wrap gap-2 items-center">
              {recipients.map(r => (
                <div key={r.email} className="flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className={`w-5 h-5 rounded-full ${r.color} text-white flex items-center justify-center text-[0.6rem] font-bold`}>
                    {r.initials}
                  </div>
                  <span className="text-[0.8rem] text-slate-800 font-medium">{r.name !== r.email ? `${r.name} <${r.email}>` : r.email}</span>
                  <span
                    onClick={() => handleRemoveRecipient(r.email)}
                    className="material-symbols-outlined !text-[14px] text-slate-400 cursor-pointer hover:text-slate-600"
                  >
                    close
                  </span>
                </div>
              ))}
              <input
                type="text"
                value={newRecipient}
                onChange={e => setNewRecipient(e.target.value)}
                onKeyDown={handleAddRecipient}
                placeholder={recipients.length === 0 ? "Add recipients (Press Enter)" : "Add more..."}
                className="flex-1 min-w-[120px] text-[0.85rem] text-slate-900 placeholder:text-slate-300 focus:outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-3 ml-auto text-[0.75rem] font-bold text-slate-400 tracking-wide mt-1.5">
              <button className="hover:text-[#FF8000] transition-colors">CC</button>
              <button className="hover:text-[#FF8000] transition-colors">BCC</button>
            </div>
          </div>

          {/* Cc Field */}
          <div className="px-5 py-3 border-b border-outline/5 flex items-start gap-4">
            <span className="text-[0.85rem] text-slate-400 mt-1 min-w-[24px]">Cc</span>
            <input
              type="text"
              placeholder="Add recipients"
              className="flex-1 text-[0.85rem] text-slate-900 placeholder:text-slate-300 focus:outline-none"
            />
          </div>

          {/* Subject Field */}
          <div className="px-5 py-4 border-b border-outline/5">
            <input
              type="text"
              placeholder="Subject line"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-[0.95rem] font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none"
            />
          </div>

          {/* Message Body */}
          <div className="px-5 py-4 flex-1 flex flex-col min-h-[300px]">
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full flex-1 text-[0.9rem] text-slate-800 placeholder:text-slate-300 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 flex flex-col gap-4 border-t border-outline/5 mt-auto shadow-[0_-4px_20px_rgba(0,0,0,0.02)] relative z-10 bg-white">
          <div className="flex items-center justify-between">
            {/* Formatting Tools */}
            <div className="flex items-center gap-1 text-slate-500">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 transition-colors">
                <span className="font-serif font-bold text-[15px]">B</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 transition-colors">
                <span className="font-serif italic text-[15px]">I</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined !text-[18px]">link</span>
              </button>
              <div className="w-[1px] h-4 bg-outline/20 mx-1"></div>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined !text-[18px]">image</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined !text-[18px]">attach_file</span>
              </button>
            </div>

            <button
              onClick={handleDelete}
              className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:bg-slate-50 hover:text-red-500 transition-colors"
            >
              <span className="material-symbols-outlined !text-[18px]">delete</span>
            </button>
          </div>

          <div className="flex items-stretch gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#FF8000]/90 transition-all shadow-sm active:scale-[0.98]"
            >
              Send Message
              <span className="material-symbols-outlined !text-[16px] -rotate-45 relative top-[1px]">send</span>
            </button>
            <button className="px-3 py-1.5 border border-outline/20 flex items-center justify-center rounded-sm hover:bg-slate-50 transition-colors group">
              <span className="material-symbols-outlined !text-[20px] text-slate-500 group-hover:text-slate-800">schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="text-[0.9rem] font-medium">{toastMessage}</span>
        </div>
      )}

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

export default ComposeEmailOverlay;
