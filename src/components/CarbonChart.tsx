
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CarbonFootprint } from "../types/carbon";

interface CarbonChartProps {
  footprint: CarbonFootprint;
}

const CarbonChart: React.FC<CarbonChartProps> = ({ footprint }) => {
  const data = [
    { name: "Transport", value: footprint.transportEmissions },
    { name: "Diet", value: footprint.dietEmissions },
    { name: "Home", value: footprint.homeEmissions },
    { name: "Shopping", value: footprint.shoppingEmissions }
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#9333ea"];

  // Format numbers for tooltip and legend
  const formatNumber = (value: number) => {
    return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value))} kg`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-white p-2 shadow rounded border">
          <p className="font-medium">{`${item.name}: ${formatNumber(item.value)}`}</p>
          <p className="text-sm text-muted-foreground">
            {`${Math.round((item.value / footprint.totalEmissions) * 100)}% of total`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.value}: {formatNumber(entry.payload.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-center mb-4">Your Carbon Footprint Breakdown</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CarbonChart;
