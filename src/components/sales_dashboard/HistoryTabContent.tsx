import { useState } from 'react';

type HistoryEventType = 'lead_created' | 'email_sent' | 'stage_changed' | 'document_uploaded' | 'task_completed';

interface HistoryEvent {
  id: string;
  type: HistoryEventType;
  title: string;
  description: string;
  date: string;
  time: string;
  details?: {
    subject?: string;
    body?: string;
  };
}

const HistoryTabContent = () => {
  const [events] = useState<HistoryEvent[]>([
    {
      id: '5',
      type: 'task_completed',
      title: 'Task Completed',
      description: 'Follow up with Procurement task has been marked as complete by Shrinath Rao.',
      date: 'OCT 26, 2023',
      time: '04:00 PM'
    },
    {
      id: '4',
      type: 'document_uploaded',
      title: 'Document Uploaded',
      description: 'Enterprise_Proposal_v2.pdf has been uploaded to the account documents.',
      date: 'OCT 25, 2023',
      time: '11:00 AM'
    },
    {
      id: '3',
      type: 'stage_changed',
      title: 'Stage Changed to Proposal',
      description: 'Opportunity moved from Discovery to Proposal stage following successful demo.',
      date: 'OCT 24, 2023',
      time: '10:30 AM'
    },
    {
      id: '2',
      type: 'email_sent',
      title: 'Email Sent',
      description: 'Sent email to Tenali Rama regarding the new proposal.',
      date: 'OCT 22, 2023',
      time: '02:30 PM',
      details: {
        subject: 'Introduction to Enterprise Platform',
        body: '"Hi Rama, I\'d like to follow up on your recent inquiry regarding our..." '
      }
    },
    {
      id: '1',
      type: 'lead_created',
      title: 'Lead Created',
      description: 'Account initialized via Inbound Marketing Lead form.',
      date: 'OCT 20, 2023',
      time: '09:15 AM'
    }
  ]);

  const getEventStyles = (type: HistoryEventType) => {
    switch (type) {
      case 'lead_created': return { icon: 'add', color: 'bg-slate-50 text-slate-500 border-slate-200' };
      case 'email_sent': return { icon: 'send', color: 'bg-orange-50 text-[#FF8000] border-orange-100' };
      case 'stage_changed': return { icon: 'trending_up', color: 'bg-blue-50 text-blue-500 border-blue-100' };
      case 'document_uploaded': return { icon: 'upload_file', color: 'bg-emerald-50 text-emerald-500 border-emerald-100' };
      case 'task_completed': return { icon: 'check_circle', color: 'bg-purple-50 text-purple-500 border-purple-100' };
      default: return { icon: 'history', color: 'bg-slate-50 text-slate-400' };
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-outline/10 flex flex-col gap-4 shrink-0">
        <div>
          <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
            <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">history</span>
            Activity History
          </h2>
          <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Timeline of all lead interactions and updates</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar relative">
        <div className="max-w-3xl mx-auto">
          {events.map((event, index) => {
            const styles = getEventStyles(event.type);
            const isLast = index === events.length - 1;

            return (
              <div key={event.id} className="flex gap-6 min-h-[100px] group hover:bg-[#FF8000]/[0.04] -mx-4 px-4 py-4 rounded-sm transition-colors cursor-default">
                {/* Timeline Column */}
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110 ${styles.color}`}>
                    <span className="material-symbols-outlined !text-[20px]">{styles.icon}</span>
                  </div>
                  {!isLast && (
                    <div className="w-0.5 grow bg-slate-100 mt-1 mb-[-16px] group-hover:bg-[#FF8000]/10 transition-colors"></div>
                  )}
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[1.05rem] font-bold text-slate-800 tracking-tight lowercase first-letter:uppercase">
                      {event.title}
                    </h4>
                    <div className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                      {event.date} <span className="mx-1">•</span> {event.time}
                    </div>
                  </div>

                  <p className="text-[0.95rem] font-medium text-slate-500 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {event.details && (
                    <div className="bg-white/80 border border-slate-100 rounded-sm p-4 space-y-2 animate-in fade-in slide-in-from-left-2 duration-300 shadow-sm group-hover:border-[#FF8000]/20 transition-colors">
                      {event.details.subject && (
                        <div className="flex gap-2 text-[0.85rem]">
                          <span className="font-bold text-slate-700 whitespace-nowrap">Subject:</span>
                          <span className="font-semibold text-slate-500 italic">{event.details.subject}</span>
                        </div>
                      )}
                      {event.details.body && (
                        <p className="text-[0.85rem] font-medium text-slate-400 italic">
                          {event.details.body}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-40">
              <span className="material-symbols-outlined !text-[64px] text-slate-300 mb-4">history_toggle_off</span>
              <p className="text-[1.1rem] font-bold text-slate-500">No history events yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryTabContent;
