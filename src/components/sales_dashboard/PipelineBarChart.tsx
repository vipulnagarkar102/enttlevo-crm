import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PipelineBarChart: React.FC = () => {
  return (
    <div className="col-span-4 p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest text-left">
          Pipeline Overview
        </h3>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { date: '2025-04', open: 0, closed: 1 },
              { date: '2025-06', open: 3, closed: 4 },
              { date: '2025-08', open: 1, closed: 2 },
            ]}
            margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: 10, paddingBottom: 20 }}
            />
            <Bar dataKey="open" name="Open Leads" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={40} />
            <Bar dataKey="closed" name="Closed Leads" fill="#10b981" radius={[2, 2, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineBarChart;
