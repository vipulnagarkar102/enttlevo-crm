import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LeadLabelsScatterChart: React.FC = () => {
  return (
    <div className="col-span-4 p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px] flex flex-col">
      <div className="flex justify-between items-start mb-4 text-left">
        <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest mb-6">
          Lead Labels
        </h3>
        <div className="flex flex-col gap-1">
          {[
            { name: 'Hot Leads', color: '#f87171' },
            { name: 'Warm Leads', color: '#fb923c' },
            { name: 'Cold Leads', color: '#60a5fa' },
          ].map((label) => (
            <div key={label.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: label.color }}></div>
              <span className="text-[0.8rem] text-on-surface-variant font-medium">{label.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              type="category"
              dataKey="x"
              name="Category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Value"
              domain={[0, 4]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              ticks={[0, 1, 2, 3, 4]}
            />
            <ZAxis type="number" range={[100, 100]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              name="Hot Leads"
              data={[
                { x: 'Leads', y: 3.5 },
                { x: 'Leads', y: 4 },
                { x: 'Leads', y: 3.2 },
              ]}
              fill="#f87171"
            />
            <Scatter
              name="Warm Leads"
              data={[
                { x: 'Leads', y: 1.5 },
                { x: 'Leads', y: 2.5 },
                { x: 'Leads', y: 2 },
              ]}
              fill="#fb923c"
            />
            <Scatter
              name="Cold Leads"
              data={[
                { x: 'Leads', y: 0 },
                { x: 'Leads', y: 0.5 },
                { x: 'Leads', y: 0.2 },
              ]}
              fill="#60a5fa"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-outline-variant/30 pt-4 mt-2 text-left">
        <div className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2 font-body">
          Average Closing Time (Warm Leads)
        </div>
        <div className="flex items-end gap-4">
          <div className="text-3xl font-bold text-[#FF8000]">
            18.5 <span className="text-on-surface-variant/40 text-lg font-medium">Days</span>
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[0.75rem] font-bold flex items-center gap-1 border border-green-100 mb-1">
            -12% IMPROVEMENT
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadLabelsScatterChart;
