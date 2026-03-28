import React, { useState } from 'react';
import CreateEventOverlay from './CreateEventOverlay';

interface Event {
  id: string;
  title: string;
  category: 'Internal Meetings' | 'Client Sales' | 'Product Sync';
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  color: string;
}

const SalesScheduler: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Defaults to current date
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState<'Month' | 'Week' | 'Day'>('Month');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [prefillDate, setPrefillDate] = useState<string | null>(null);
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Quarterly Sales Review',
      category: 'Internal Meetings',
      date: new Date().toISOString().split('T')[0], // Set some events for today
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      location: 'Room 4',
      color: '#3B82F6' // Blue
    },
    {
      id: '2',
      title: 'Client Discovery Call',
      category: 'Client Sales',
      date: new Date().toISOString().split('T')[0],
      startTime: '01:30 PM',
      endTime: '02:00 PM',
      location: 'Zoom',
      color: '#FF8000' // Orange
    },
    {
      id: '3',
      title: 'Mobile Design Sync',
      category: 'Product Sync',
      date: new Date().toISOString().split('T')[0],
      startTime: '04:00 PM',
      endTime: '05:00 PM',
      location: 'Zoom',
      color: '#10B981' // Green
    },
    {
      id: '4',
      title: 'Staff Meeting',
      category: 'Internal Meetings',
      date: '2026-03-02',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      color: '#3B82F6'
    },
    {
      id: '5',
      title: 'Product Review',
      category: 'Internal Meetings',
      date: '2026-03-10',
      startTime: '02:00 PM',
      endTime: '03:00 PM',
      color: '#3B82F6'
    },
    {
      id: '6',
      title: 'Web Analytics Review',
      category: 'Product Sync',
      date: new Date().toISOString().split('T')[0],
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      color: '#10B981'
    }
  ]);

  const categories = [
    { name: 'Internal Meetings', color: 'bg-blue-500', checked: true },
    { name: 'Client Sales', color: 'bg-orange-500', checked: true },
    { name: 'Product Sync', color: 'bg-emerald-500', checked: false }
  ];

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handleCreateEvent = (eventData: any) => {
    const colorMap: Record<string, string> = {
      'Internal Meetings': '#3B82F6',
      'Client Sales': '#FF8000',
      'Product Sync': '#10B981'
    };
    
    const newEvent: Event = {
      ...eventData,
      color: colorMap[eventData.category as string] || '#3B82F6'
    };
    
    setEvents(prev => [...prev, newEvent]);
    setIsAddingEvent(false);
    setPrefillDate(null);
  };

  const days = Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);

  // Prepend previous month's trailing days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = daysInMonth(prevMonth, prevYear);
  const trailingDaysCount = firstDayOfMonth(month, year);
  const trailingDays = Array.from({ length: trailingDaysCount }, (_, i) => daysInPrevMonth - trailingDaysCount + i + 1);

  return (
    <div className="flex h-full w-full bg-white font-body selection:bg-primary-container/30 overflow-hidden">
      {/* Sidebar - Fixed Width */}
      <aside className="w-[280px] border-r border-outline/5 flex flex-col bg-white shrink-0 h-full">
        <div className="flex-1 p-5 space-y-8 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Action Button */}
          <button 
            onClick={() => { setPrefillDate(null); setIsAddingEvent(true); }}
            className="w-full flex items-center justify-center gap-3 px-4 py-1.5 bg-[#FF8000] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#FF8000]/90 transition-all shadow-md active:scale-95 uppercase tracking-widest group"
          >
            <span className="material-symbols-outlined !text-[18px] group-active:rotate-180 transition-transform">add</span>
            Create Event
          </button>

          {/* Mini Calendar */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[0.75rem] font-bold text-on-surface uppercase tracking-wider">{monthName} {year}</span>
              <div className="flex gap-1">
                <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 5))} className="material-symbols-outlined !text-[16px] text-on-surface-variant/40 hover:text-on-surface cursor-pointer p-0.5">chevron_left</button>
                <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 5))} className="material-symbols-outlined !text-[16px] text-on-surface-variant/40 hover:text-on-surface cursor-pointer p-0.5">chevron_right</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(d => (
                <span key={d} className="text-[0.55rem] font-bold text-on-surface-variant/30 uppercase tracking-widest">{d}</span>
              ))}
              {trailingDays.map(d => (
                <span key={`prev-${d}`} className="text-[0.7rem] text-on-surface-variant/10 py-0.5">{d}</span>
              ))}
              {days.map(d => (
                <span 
                  key={d} 
                  onClick={() => setCurrentDate(new Date(year, month, d))}
                  className={`text-[0.7rem] py-1 cursor-pointer hover:bg-surface-container rounded-sm transition-all flex items-center justify-center h-7 w-7 mx-auto font-medium ${d === currentDate.getDate() ? 'bg-[#FF8000] text-white !font-bold shadow-sm' : 'text-on-surface-variant/70'}`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-outline/5 flex-1 overflow-y-auto custom-scrollbar-mini pr-2">
            <h3 className="text-[0.65rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.15em] sticky top-0 bg-white z-10 py-2">Agenda for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h3>
            <div className="space-y-4 relative">
              {events.filter(e => e.date === selectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime)).map(event => (
                <div key={event.id} className="bg-white border border-outline/10 rounded-sm shadow-sm flex items-stretch relative group overflow-hidden transition-all hover:border-[#FF8000]/20 hover:bg-[#FF8000]/[0.02] cursor-pointer">
                  {/* Colored Side Bar */}
                  <div className="w-1 shrink-0" style={{ backgroundColor: event.color }}></div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm bg-slate-50 text-[0.6rem] font-bold uppercase tracking-wider border border-outline/5" style={{ color: event.color }}>
                        <span className="material-symbols-outlined !text-[12px]">{event.category === 'Client Sales' ? 'call' : 'groups'}</span>
                        {event.category}
                      </div>
                      <span className="text-[0.65rem] font-bold text-on-surface-variant/30 uppercase tracking-tight">{event.startTime}</span>
                    </div>

                    <h4 className="text-[0.8rem] font-bold text-slate-800 mb-2 group-hover:text-[#FF8000] transition-colors line-clamp-2">{event.title}</h4>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex -space-x-1.5">
                        {[1, 2, 3].map(i => (
                          <img 
                            key={i} 
                            src={`https://ui-avatars.com/api/?name=A${i}&background=random&color=fff`} 
                            className="w-5 h-5 rounded-full border border-white shadow-sm" 
                            alt="Attendee" 
                          />
                        ))}
                      </div>
                      <span className="material-symbols-outlined !text-[18px] text-slate-100 group-hover:text-slate-300 transition-colors">more_vert</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Fixed height from parent main container */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
        <header className="px-6 py-2 flex justify-between items-center bg-white border-b border-outline/5 shrink-0">
          <div>
            <h1 className="text-[1.3rem] font-bold text-on-surface tracking-tighter uppercase font-headline">
              {monthName} <span className="text-on-surface-variant/20 font-light">{year}</span>
            </h1>
          </div>
          <div className="flex gap-1.5 p-0.5 bg-surface-container-low border border-outline/5 rounded-sm">
            {(['Month', 'Week', 'Day'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-5 py-1 text-[0.65rem] font-bold rounded-sm uppercase tracking-widest transition-all ${
                  view === v 
                  ? 'bg-[#FF8000] text-white shadow-sm' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white transition-colors'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-7 border-b border-outline/5 bg-white shrink-0">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="py-1 text-[0.5rem] font-bold text-on-surface-variant/30 text-center tracking-[0.2em]">{day}</div>
          ))}
        </div>

        {/* 1fr Rows = Full View Fit */}
        <div className={`flex-1 grid grid-cols-7 ${view === 'Month' ? 'grid-rows-[repeat(6,1fr)]' : 'grid-rows-1'} bg-surface-container-low/10 border-t border-outline/5 border-l border-outline/5 overflow-hidden`}>
          {view === 'Month' && trailingDays.map(d => (
            <div key={`prev-grid-${d}`} className="bg-white/40 p-1.5 border-r border-b border-outline/10 min-h-0">
              <span className="text-[0.75rem] font-bold text-on-surface-variant/10">{d}</span>
            </div>
          ))}
          
          {(view === 'Month' ? days : days.slice(new Date().getDate() - 3, new Date().getDate() + 4)).map(d => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday = d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const isSelected = dateStr === selectedDate;

            return (
              <div 
                key={d} 
                onClick={() => setSelectedDate(dateStr)}
                className={`bg-white p-1.5 border-r border-b border-outline/10 relative group/cell transition-all flex flex-col min-h-0 cursor-pointer ${isSelected ? 'bg-[#FF8000]/[0.05]' : isToday ? 'bg-[#FF8000]/[0.02]' : 'hover:bg-[#FF8000]/[0.01]'}`}
              >
                <div className="flex justify-between items-start mb-0.5">
                  <span className={`text-[0.8rem] font-bold ${isToday ? 'text-[#FF8000] bg-orange-100/30 w-6 h-6 flex items-center justify-center rounded-full shadow-sm' : 'text-on-surface-variant/30 group-hover/cell:text-on-surface'}`}>{d}</span>
                </div>
                
                <div className="flex-1 space-y-1 pb-4 overflow-y-auto custom-scrollbar-mini pr-0.5">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className="px-1.5 py-0.5 rounded-[2px] text-[0.6rem] font-bold truncate transition-all cursor-pointer border-l-[2px] flex items-center gap-1.5 hover:brightness-95 hover:shadow-sm"
                      style={{ 
                        backgroundColor: `${event.color}15`,
                        color: event.color,
                        borderColor: event.color
                      }}
                      title={event.title}
                    >
                      <span className="text-on-surface text-[0.55rem] truncate font-bold uppercase tracking-tight">{event.title}</span>
                    </div>
                  ))}
                </div>

                <button 
                    onClick={() => { setPrefillDate(dateStr); setIsAddingEvent(true); }}
                    className="absolute bottom-1 right-1 w-5 h-5 rounded-sm bg-[#FF8000] text-white flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-all shadow-md active:scale-90 z-20"
                >
                  <span className="material-symbols-outlined !text-[12px]">add</span>
                </button>
              </div>
            );
          })}
        </div>
        
        <CreateEventOverlay 
            isOpen={isAddingEvent}
            onClose={() => { setIsAddingEvent(false); setPrefillDate(null); }}
            onAddEvent={handleCreateEvent}
            initialData={prefillDate ? { date: prefillDate } : { date: selectedDate }}
        />
      </main>
    </div>
  );
};

export default SalesScheduler;
