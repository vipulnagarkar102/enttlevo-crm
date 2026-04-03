import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  user: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: string;
}

interface TaskManagerProps {
  setIsAdding: (val: boolean) => void;
  setEditingTask: (task: any) => void;
  refreshTrigger?: number;
}

const TaskManager: React.FC<TaskManagerProps> = ({ setIsAdding, setEditingTask, refreshTrigger }) => {
  const formatDateForInput = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
      return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  };
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'test', category: 'Call', date: 'Feb 12, 2026', time: '23:04', user: 'rushib', isCompleted: false },
    { id: '2', title: 'Dev', category: 'Call', description: 'Dev Call', date: 'Jan 09, 2026', time: '20:05', user: 'rushib', isCompleted: false },
    { id: '3', title: 'test call', category: 'Call', description: 'test', date: 'Jan 01, 2026', time: '12:00', user: 'rushib', isCompleted: false },
    { id: '4', title: 'Meeting With Dev Team', category: 'Meeting', date: 'Jan 30, 2025', time: '10:00', user: 'rushib', isCompleted: true, completedAt: 'Jan 30, 2025' },
    { id: '5', title: 'Completed on Feb 18, 2026', category: 'Task', date: 'Feb 18, 2026', time: '09:00', user: 'system', isCompleted: true, completedAt: 'Feb 18, 2026' },
  ]);

  // Handle addition from parent overlay (mock for now)
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: 'New Task from Overlay',
        category: 'Task',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        user: 'rushib',
        isCompleted: false
      };
      setTasks(prev => [newTask, ...prev]);
    }
  }, [refreshTrigger]);

  const handleToggleStatus = (id: string) => {
    setTasks(tasks.map((t: Task) => {
      if (t.id === id) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
          completedAt: !t.isCompleted ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : undefined
        };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t: Task) => t.id !== id));
  };

  const activeTasks = tasks.filter((t: Task) => !t.isCompleted);
  const completedTasks = tasks.filter((t: Task) => t.isCompleted);

  const stats = [
    { label: 'Active Tasks', value: activeTasks.length, icon: 'trending_up', color: 'text-primary' },
    { label: 'Completed Today', value: tasks.filter((t: Task) => t.isCompleted && t.completedAt === new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })).length, icon: 'check_circle', color: 'text-emerald-500' },
    { label: 'Today\'s Tasks', value: tasks.filter((t: Task) => t.date === new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })).length, icon: 'schedule', color: 'text-purple-600' },
    { label: 'Total Completed', value: completedTasks.length, icon: 'workspace_premium', color: 'text-amber-500' },
  ];

  return (
    <div className="flex-1 p-8 space-y-6 bg-surface selection:bg-primary-container/30 relative">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-2">
        <div className="text-left">
          <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">Task Manager</h1>
          <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Track and organize your daily tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-semibold hover:bg-[#FF8000]/90 transition-all group shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined !text-[18px]">add</span>
            Task
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-span-1 p-5 bg-surface-container-low rounded-sm transition-colors hover:bg-surface-container-high group border border-outline/5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[0.7rem] font-medium text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
              <span className={`material-symbols-outlined ${stat.color} !text-[18px] opacity-70`}>{stat.icon}</span>
            </div>
            <div className="text-2xl font-medium tracking-tight text-on-surface font-headline">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Content Columns */}
      <div className="flex gap-8 items-start pt-2">
        {/* Active Column (Pending) */}
        <div className="flex-[0.65] space-y-4">
          <h2 className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Active Tasks
          </h2>

          <div className="space-y-4">
            {activeTasks.map(task => (
              <div key={task.id} className="bg-white border border-outline/10 rounded-sm shadow-sm flex items-stretch relative group overflow-hidden transition-all hover:border-[#FF8000]/20 hover:bg-[#FF8000]/[0.02]">
                <div className="w-1 bg-[#FF8000] shrink-0"></div>
                <div className="flex-1 p-5 pr-12">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-slate-50 text-indigo-600 text-[0.65rem] font-bold uppercase tracking-wider border border-outline/5`}>
                        <span className="material-symbols-outlined !text-[14px]">{task.category === 'Meeting' ? 'groups' : task.category === 'Call' ? 'call' : 'task'}</span>
                        {task.category}
                      </div>
                    </div>
                    
                    {/* Floating Hover Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-[2px] rounded-full px-1">
                      <button 
                        onClick={() => setEditingTask({ ...task, date: formatDateForInput(task.date) })} 
                        className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined !text-[18px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task.id)} 
                        className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined !text-[18px]">delete</span>
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(task.id)} 
                        className="p-1.5 hover:bg-emerald-50 rounded-full text-slate-400 hover:text-emerald-600 transition-colors"
                        title="Complete"
                      >
                        <span className="material-symbols-outlined !text-[20px]">check_circle</span>
                      </button>
                    </div>

                    {/* Static Check Circle (Hides on Hover) */}
                    <button onClick={() => handleToggleStatus(task.id)} className="material-symbols-outlined !text-[20px] text-slate-100 hover:text-emerald-500 transition-colors group-hover:hidden absolute top-4 right-4 animate-in fade-in duration-300">check_circle</button>
                  </div>

                  <h4 className="text-[0.95rem] font-bold text-slate-800 mb-1 group-hover:text-[#FF8000] transition-colors">{task.title}</h4>
                  {task.description && <p className="text-[0.8rem] text-slate-500 font-medium mb-3">{task.description}</p>}

                  <div className="flex items-center gap-6 text-[0.75rem] font-medium text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined !text-[14px] opacity-40">calendar_month</span>
                      {task.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined !text-[14px] opacity-40">schedule</span>
                      {task.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined !text-[14px] opacity-40">person</span>
                      {task.user}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {activeTasks.length === 0 && <div className="py-12 text-center text-slate-300 font-medium italic border border-dashed border-slate-200 rounded-sm">No active tasks found</div>}
          </div>
        </div>

        {/* Completed Column */}
        <div className="flex-[0.35] space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              Completed ({completedTasks.length})
            </h3>
          </div>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <div key={task.id} className="bg-white/60 border border-outline/5 rounded-sm flex items-stretch relative group overflow-hidden transition-all hover:bg-slate-50">
                <div className="w-0.5 bg-slate-200 shrink-0"></div>
                <div className="flex-1 p-4 pr-12">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-slate-100 text-slate-400 text-[0.6rem] font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined !text-[12px] opacity-60">task_alt</span>
                      {task.category}
                    </div>
                    <button onClick={() => handleToggleStatus(task.id)} className="material-symbols-outlined !text-[18px] text-emerald-500 cursor-pointer hover:scale-110 transition-transform">check_circle</button>
                  </div>
                  <h4 className="text-[0.85rem] font-medium text-slate-400 line-through mb-1">{task.title}</h4>
                  <div className="text-[0.65rem] font-bold text-slate-300 uppercase tracking-widest mt-1">
                    Completed on {task.completedAt}
                  </div>
                </div>
              </div>
            ))}
            {completedTasks.length === 0 && <div className="py-8 text-center text-slate-200 font-medium italic border border-dashed border-slate-100 rounded-sm">Zero completed tasks</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
