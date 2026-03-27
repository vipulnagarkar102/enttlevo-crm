import React, { useState } from 'react';

interface CustomCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, onSelect, onClose }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <>
      <div className="fixed inset-0 z-[1000]" onClick={onClose} />
      <div className="absolute top-full left-0 mt-2 z-[1001] bg-white border border-outline/10 shadow-2xl rounded-sm p-4 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
            className="material-symbols-outlined !text-lg text-on-surface-variant hover:text-primary"
          >
            chevron_left
          </button>
          <span className="text-[0.8rem] font-bold text-on-surface uppercase tracking-widest">
            {monthName} {viewDate.getFullYear()}
          </span>
          <button
            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
            className="material-symbols-outlined !text-lg text-on-surface-variant hover:text-primary"
          >
            chevron_right
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
            <span key={d} className="text-[0.6rem] font-bold text-on-surface-variant/40">
              {d}
            </span>
          ))}
          {blanks.map((i) => (
            <div key={`b-${i}`} />
          ))}
          {days.map((d) => {
            const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isSelected = dateStr === selectedDate;
            return (
              <button
                key={d}
                onClick={() => {
                  onSelect(dateStr);
                  onClose();
                }}
                className={`w-full aspect-square text-[0.75rem] rounded-sm transition-all ${
                  isSelected ? 'bg-[#FF8000] text-white font-bold' : 'hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CustomCalendar;
