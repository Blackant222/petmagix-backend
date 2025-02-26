import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MetricsChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Weight',
        data: data.map(d => d.weight),
        borderColor: '#ff9800',
        tension: 0.1
      },
      {
        label: 'Hydration',
        data: data.map(d => d.hydration),
        borderColor: '#2196f3',
        tension: 0.1
      }
    ]
  };

  return (
    <Line 
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Pet Health Metrics Over Time'
          }
        }
      }}
    />
  );
};

export default MetricsChart;