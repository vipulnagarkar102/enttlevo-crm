import React from 'react';

interface KanbanCardProps {
  id: number;
  company: string;
  contactName: string;
  date: string;
  status: string;
  arr?: string;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onSelectLead?: (id: number) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ id, company, contactName, date, status, arr, onDragStart, onSelectLead }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onClick={() => onSelectLead?.(id)}
      className="bg-white p-4 rounded-sm border border-outline/10 shadow-sm hover:shadow-md hover:border-[#FF8000]/30 hover:bg-[#FF8000]/[0.02] transition-all duration-300 cursor-pointer space-y-3 group/card"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-sm bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold text-[0.8rem] uppercase group-hover/card:bg-blue-500/20 transition-colors">
          {company.charAt(0)}
        </div>
        <div>
          <h4 className="text-[0.85rem] font-bold text-on-surface leading-tight group-hover/card:text-[#FF8000] transition-colors">{company}</h4>
          <p className="text-[0.75rem] text-on-surface-variant/70 font-medium">{contactName}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-on-surface-variant/60">
          <span className="material-symbols-outlined !text-[14px] text-[#FF8000]/60">payments</span>
          <span className="text-[0.7rem] font-bold text-[#FF8000]/80">ARR: {arr || '$0'}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant/40">
          <span className="material-symbols-outlined !text-[14px]">calendar_month</span>
          <span className="text-[0.7rem] font-medium">{date}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-outline/5">
        <div className={`px-2.5 py-1 rounded-sm text-[0.65rem] font-bold uppercase tracking-wider border transition-all duration-300 ${
          status === 'Won' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50' 
            : 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100/50'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'Won' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            {status}
          </div>
        </div>
        <button className="opacity-0 group-hover/card:opacity-100 transition-opacity text-on-surface-variant/40 hover:text-[#FF8000] p-1">
           <span className="material-symbols-outlined !text-[18px]">more_vert</span>
        </button>
      </div>
    </div>
  );
};

interface KanbanStageProps {
  title: string;
  leads: any[];
  bgColor: string;
  headerColor: string;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, stage: string) => void;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onSelectLead?: (id: number) => void;
}

const KanbanStage: React.FC<KanbanStageProps> = ({ title, leads, bgColor, headerColor, onDragOver, onDrop, onDragStart, onSelectLead }) => {
  const totalARR = leads.reduce((sum, lead) => {
    const val = parseInt(lead.proposedARR?.replace(/[^0-9]/g, '') || '0');
    return sum + val;
  }, 0);

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, title)}
      className={`flex-1 min-w-[320px] ${bgColor} rounded-sm p-3 flex flex-col gap-3 min-h-[600px] border border-outline/5 transition-colors duration-300`}
    >
      <div className={`flex items-center justify-between px-3 py-2 rounded-sm ${headerColor} border-b border-outline/5 mb-1`}>
        <div className="flex items-center gap-3">
          <h3 className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-widest">{title}</h3>
          <span className="bg-white/80 px-2 py-0.5 rounded-sm text-[0.65rem] font-bold text-on-surface-variant font-headline shadow-sm border border-outline/5">
            {leads.length}
          </span>
        </div>
        <div className="text-[0.7rem] font-bold text-on-surface-variant/50">
           Sum: <span className="text-emerald-600 font-headline">${totalARR.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[750px] custom-scrollbar pr-1 pb-4">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <KanbanCard
              key={lead.id}
              id={lead.id}
              company={lead.company}
              contactName={lead.contactName}
              date={lead.addedOn}
              status={lead.status === 'Qualified' ? 'Won' : 'Not Qualified'}
              arr={lead.proposedARR}
              onDragStart={onDragStart}
              onSelectLead={onSelectLead}
            />
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-outline/10 rounded-sm p-8 text-on-surface-variant/30 text-[0.8rem] font-bold mt-4 bg-white/30 italic">
             <span className="material-symbols-outlined !text-[32px] opacity-20 mb-2">move_item</span>
             DRAG DEALS HERE
          </div>
        )}
      </div>
    </div>
  );
};

interface KanbanViewProps {
  leadsData: any[];
  onMoveLead: (leadId: number, targetStage: string) => void;
  onSelectLead?: (id: number) => void;
}

const KanbanView: React.FC<KanbanViewProps> = ({ leadsData, onMoveLead, onSelectLead }) => {
  const stages = [
    { title: 'Quote', bgColor: 'bg-[#F2F4F7]', headerColor: 'bg-[#EAECF0]' },
    { title: 'Alignment', bgColor: 'bg-blue-50/50', headerColor: 'bg-blue-100/50' },
    { title: 'Proposal', bgColor: 'bg-indigo-50/50', headerColor: 'bg-indigo-100/50' },
    { title: 'Negotiation', bgColor: 'bg-orange-50/30', headerColor: 'bg-orange-100/30' },
  ];

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData('leadId', id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    const leadId = parseInt(e.dataTransfer.getData('leadId'));
    onMoveLead(leadId, targetStage);
  };

  // Helper to map contractStage to kanban stages if needed.
  // For now, I'll use the ones from the image as the target.
  const getLeadsForStage = (stageTitle: string) => {
    // If the contractStage in data doesn't match the image stages, 
    // we might need a mapping or just show what matches.
    return leadsData.filter(lead => lead.contractStage === stageTitle);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar scroll-smooth">
      {stages.map((stage) => (
        <KanbanStage
          key={stage.title}
          title={stage.title}
          leads={getLeadsForStage(stage.title)}
          bgColor={stage.bgColor}
          headerColor={stage.headerColor}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onSelectLead={onSelectLead}
        />
      ))}
    </div>
  );
};

export default KanbanView;
