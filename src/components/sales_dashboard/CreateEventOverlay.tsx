import React, { useState, useEffect } from 'react';
import CustomCalendar from './CustomCalendar';

interface CreateEventOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: any) => void;
  onDeleteEvent?: (id: string) => void;
  initialData?: any;
}

const CreateEventOverlay: React.FC<CreateEventOverlayProps> = ({ isOpen, onClose, onAddEvent, onDeleteEvent, initialData }) => {
  const [eventData, setEventData] = useState({
    title: '',
    category: 'Internal Meetings',
    startDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endDate: new Date().toISOString().split('T')[0],
    endTime: '10:00',
    location: '',
    description: '',
    attendees: [] as string[]
  });

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEventData(prev => ({
        ...prev,
        ...initialData,
        startDate: initialData.date || initialData.startDate || new Date().toISOString().split('T')[0],
        endDate: initialData.date || initialData.endDate || new Date().toISOString().split('T')[0]
      }));
    } else {
       setEventData({
        title: '',
        category: 'Internal Meetings',
        startDate: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endDate: new Date().toISOString().split('T')[0],
        endTime: '10:00',
        location: '',
        description: '',
        attendees: []
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!eventData.title.trim()) return;
    onAddEvent({ 
        ...eventData, 
        id: initialData?.id || Date.now().toString(),
        date: eventData.startDate // For compatibility with the grid
    });
    onClose();
  };

  const categories = ['Internal Meetings', 'Client Sales', 'Product Sync'];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[998] transition-opacity duration-300 animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Side Overlay */}
      <div className="fixed top-0 bottom-0 right-0 w-[500px] max-w-[90vw] bg-white shadow-2xl z-[999] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right border-l border-outline/5 overflow-hidden font-body">
        {/* Header */}
        <div className="p-6 border-b border-outline/5 relative bg-white flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-orange-400 p-1 hover:bg-orange-50 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="pr-8">
            <h2 className="text-[1.25rem] font-bold text-slate-800 tracking-tight leading-tight">{initialData?.id ? 'Edit Event' : 'New Event'}</h2>
            <p className="text-[0.8rem] text-slate-500 mt-1">Schedule a new meeting or collaborative session</p>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* Title - Dashboard Style */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">title</span>
              Event Title <span className="text-error font-medium">*</span>
            </label>
            <input 
              type="text" 
              placeholder="What's this event about?" 
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="w-full px-3 py-2 border border-outline/20 bg-white rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 placeholder:text-on-surface-variant/40 transition-all font-body h-[42px]" 
            />
          </div>

          {/* Time and Date Range */}
          <div className="grid grid-cols-2 gap-4">
             {/* Start Date & Time */}
             <div className="space-y-1.5 flex flex-col relative">
                <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                  <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">calendar_today</span>
                  Start Date <span className="text-error font-medium">*</span>
                </label>
                <div 
                    onClick={() => setShowStartCalendar(!showStartCalendar)}
                    className="flex items-center justify-between px-3 py-2 border border-outline/20 bg-white rounded-sm cursor-pointer hover:bg-slate-50 transition-all h-[42px]"
                >
                    <span className="text-[0.85rem] text-on-surface font-medium truncate">{new Date(eventData.startDate).toLocaleDateString()}</span>
                    <span className={`material-symbols-outlined !text-[18px] text-on-surface-variant transition-transform ${showStartCalendar ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {showStartCalendar && (
                    <div className="absolute top-full left-0 z-[1001] mt-1 shadow-xl border border-outline/10 rounded-sm bg-white overflow-hidden">
                        <CustomCalendar 
                            selectedDate={eventData.startDate} 
                            onSelect={(date) => { setEventData({ ...eventData, startDate: date }); setShowStartCalendar(false); }} 
                            onClose={() => setShowStartCalendar(false)} 
                        />
                    </div>
                )}
             </div>

             <div className="space-y-1.5 flex flex-col">
                <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                  <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">schedule</span>
                  Start Time <span className="text-error font-medium">*</span>
                </label>
                <input 
                    type="time" 
                    value={eventData.startTime}
                    onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                    className="w-full h-[42px] px-3 py-2 border border-outline/20 bg-white rounded-sm text-[0.85rem] font-medium text-on-surface focus:outline-none focus:border-[#FF8000]/50 [color-scheme:light] transition-all"
                />
             </div>

             {/* End Date & Time Row */}
             <div className="space-y-1.5 flex flex-col relative">
                <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                  <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">event</span>
                  End Date <span className="text-error font-medium">*</span>
                </label>
                <div 
                    onClick={() => setShowEndCalendar(!showEndCalendar)}
                    className="flex items-center justify-between px-3 py-2 border border-outline/20 bg-white rounded-sm cursor-pointer hover:bg-slate-50 transition-all h-[42px]"
                >
                    <span className="text-[0.85rem] text-on-surface font-medium truncate">{new Date(eventData.endDate).toLocaleDateString()}</span>
                    <span className={`material-symbols-outlined !text-[18px] text-on-surface-variant transition-transform ${showEndCalendar ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {showEndCalendar && (
                    <div className="absolute top-full left-0 z-[1001] mt-1 shadow-xl border border-outline/10 rounded-sm bg-white overflow-hidden">
                        <CustomCalendar 
                            selectedDate={eventData.endDate} 
                            onSelect={(date) => { setEventData({ ...eventData, endDate: date }); setShowEndCalendar(false); }} 
                            onClose={() => setShowEndCalendar(false)} 
                        />
                    </div>
                )}
             </div>

             <div className="space-y-1.5 flex flex-col">
                <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                  <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">alarm</span>
                  End Time <span className="text-error font-medium">*</span>
                </label>
                <input 
                    type="time" 
                    value={eventData.endTime}
                    onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                    className="w-full h-[42px] px-3 py-2 border border-outline/20 bg-white rounded-sm text-[0.85rem] font-medium text-on-surface focus:outline-none focus:border-[#FF8000]/50 [color-scheme:light] transition-all"
                />
             </div>
          </div>

          {/* Category/Event Type */}
          <div className="space-y-1.5 flex flex-col relative">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">category</span>
              Event Type <span className="text-error font-medium">*</span>
            </label>
            <div
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center justify-between px-3 py-2 border border-outline/20 bg-white rounded-sm cursor-pointer hover:bg-slate-50 transition-all h-[42px]"
            >
                <span className="text-[0.85rem] font-medium text-on-surface">{eventData.category}</span>
                <span className={`material-symbols-outlined !text-[18px] text-on-surface-variant transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`}>expand_more</span>
            </div>
            {showCategoryDropdown && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-outline/10 shadow-lg rounded-sm py-1 z-[1001]">
                    {categories.map(cat => (
                        <div 
                            key={cat}
                            onClick={() => { setEventData({ ...eventData, category: cat }); setShowCategoryDropdown(false); }}
                            className="px-3 py-2 text-[0.85rem] font-medium text-on-surface hover:bg-[#FF8000]/10 hover:text-[#FF8000] cursor-pointer transition-colors"
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">location_on</span>
                Location
              </label>
              <input 
                  type="text" 
                  placeholder="e.g. Zoom, Conference Room 4" 
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/20 bg-white rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 placeholder:text-on-surface-variant/40 transition-all font-body h-[42px]" 
              />
          </div>

          {/* Description */}
          <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">notes</span>
                Description
              </label>
              <textarea 
                  placeholder="Add meeting notes or agenda..." 
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-outline/20 bg-white rounded-sm text-[0.85rem] focus:outline-none focus:border-[#FF8000]/50 placeholder:text-on-surface-variant/40 transition-all font-body resize-none min-h-[100px]"
              />
          </div>

          {/* Attendees */}
          <div className="space-y-1.5 flex flex-col">
              <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
                <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">group</span>
                Attendees
              </label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border border-outline/10 rounded-sm px-3 py-2 bg-slate-50/50">
                    <span className="text-[0.75rem] text-on-surface-variant/50">Add team members or clients</span>
                    <button className="material-symbols-outlined !text-[20px] text-slate-400 hover:text-[#FF8000] cursor-pointer transition-all">add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 px-2 py-1 bg-[#FF8000]/5 rounded-full border border-[#FF8000]/10">
                        <img src="https://ui-avatars.com/api/?name=JD&background=FF8000&color=fff" className="w-4 h-4 rounded-full" alt="" />
                        <span className="text-[0.65rem] font-bold text-[#FF8000]">John Doe</span>
                        <span className="material-symbols-outlined !text-[12px] text-[#FF8000]/50 cursor-pointer hover:text-[#FF8000]">close</span>
                    </div>
                </div>
              </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-outline/5 flex justify-between items-center bg-white flex-shrink-0 z-[200]">
          {initialData?.id ? (
            <button 
                onClick={() => onDeleteEvent?.(initialData.id)}
                className="flex items-center gap-2 px-3 py-1.5 text-[0.75rem] font-bold text-red-500 hover:bg-red-50 rounded-sm transition-all uppercase tracking-wider"
            >
                <span className="material-symbols-outlined !text-[18px]">delete</span>
                Delete Event
            </button>
          ) : <div />}

          <div className="flex gap-3">
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
                {initialData?.id ? 'Save Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEventOverlay;
