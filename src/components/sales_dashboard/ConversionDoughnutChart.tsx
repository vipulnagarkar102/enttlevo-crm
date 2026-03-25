import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ConversionDoughnutChart: React.FC = () => {
  return (
    <div className="col-span-4 p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px]">
      <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest mb-6 text-left">
        Deal Conversion Rate
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: 'Not Qualified', value: 30, color: '#3b82f6' },
                { name: 'Won', value: 5, color: '#10b981' },
                { name: 'Dropped', value: 1, color: '#f59e0b' },
                { name: 'Open', value: 3, color: '#FF8000' },
              ]}
              cx="40%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {[
                { color: '#3b82f6' },
                { color: '#10b981' },
                { color: '#f59e0b' },
                { color: '#FF8000' },
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              formatter={(value, entry: any) => (
                <span className="text-[0.75rem] text-on-surface-variant font-medium">
                  {value} ({entry.payload.value})
                </span>
              )}
              wrapperStyle={{ paddingLeft: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionDoughnutChart;
