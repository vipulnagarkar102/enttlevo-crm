import React, { useState, useEffect } from 'react';

interface CreateTaskOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { id?: string; title: string; category: string; description: string; date: string; time: string }) => void;
  initialData?: { id: string; title: string; category: string; description: string; date: string; time: string } | null;
}

const CreateTaskOverlay: React.FC<CreateTaskOverlayProps> = ({ isOpen, onClose, onAddTask, initialData }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    category: 'Task',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  });

  useEffect(() => {
    if (initialData) {
      setTaskData({
        title: initialData.title,
        category: initialData.category,
        description: initialData.description || '',
        date: initialData.date,
        time: initialData.time
      });
    } else {
      setTaskData({
        title: '',
        category: 'Task',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!taskData.title.trim()) return;
    onAddTask({ ...taskData, id: initialData?.id });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[998] transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Side Overlay */}
      <div className="fixed top-0 bottom-0 right-0 w-[500px] max-w-[90vw] bg-white shadow-2xl z-[999] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right border-l border-outline/5 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-outline/5 relative bg-white flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-orange-400 p-1 hover:bg-orange-50 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="pr-8">
            <h2 className="text-[1.25rem] font-bold text-slate-800 tracking-tight leading-tight">{initialData ? 'Edit Task' : 'New Task'}</h2>
            <p className="text-[0.8rem] text-slate-500 mt-1">Fields marked with <span className="text-error font-medium">*</span> are required</p>
          </div>
        </div>

        {/* Scrollable Form Content - Hide Scrollbar */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Task Type */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">assignment</span>
              Task Type <span className="text-error font-medium">*</span>
            </label>
            <div className="relative group w-full">
              <select 
                value={taskData.category}
                onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
                className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] text-on-surface-variant/70 focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_10px_center] cursor-pointer"
              >
                <option value="Task">Task</option>
                <option value="Call">Call</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">title</span>
              Title <span className="text-error font-medium">*</span>
            </label>
            <input 
              type="text" 
              placeholder="What's this task about?" 
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40 transition-all font-body" 
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">description</span>
              Description
            </label>
            <textarea 
              placeholder="Add more details about this task..." 
              rows={5}
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 placeholder:text-on-surface-variant/40 transition-all font-body resize-none" 
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">calendar_month</span>
                Date <span className="text-error font-medium">*</span>
              </label>
              <input 
                type="date" 
                value={taskData.date}
                onChange={(e) => setTaskData({ ...taskData, date: e.target.value })}
                className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 transition-all cursor-pointer [color-scheme:light] font-body" 
              />
            </div>

            <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">schedule</span>
                Time <span className="text-error font-medium">*</span>
              </label>
              <input 
                type="time" 
                value={taskData.time}
                onChange={(e) => setTaskData({ ...taskData, time: e.target.value })}
                className="w-full px-3 py-2 border border-outline/20 rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 focus:ring-1 focus:ring-[#FF8000]/20 transition-all cursor-pointer [color-scheme:light] font-body" 
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-outline/5 flex justify-end gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] bg-white flex-shrink-0 z-20">
          <button 
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-4 py-1.5 border border-slate-200 rounded-sm text-[0.8rem] font-bold text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center justify-center min-w-[124px] px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#FF8000]/90 transition-all uppercase tracking-wider shadow-sm active:scale-95"
          >
            {initialData ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTaskOverlay;
