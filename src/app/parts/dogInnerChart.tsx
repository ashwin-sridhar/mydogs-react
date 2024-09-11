'use client';

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DogActivity {
  activityID: number;
  dogID: number;
  dataDay: string;
  dogActiveTime: number;
  dogSleepTime: number;
}

interface DogInnerChartProps {
  id: string;
}

export default function DogInnerChart({ id }: DogInnerChartProps) {
  const [dogData, setDogData] = useState<DogActivity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the new API route instead of directly accessing the external API
        const response = await fetch(`/api/dogs/${id}`);
        const data: DogActivity[] = await response.json();
        setDogData(data);
      } catch (error) {
        console.error('Error fetching dog data:', error);
      }
    };

    fetchData();
  }, [id]);
  
  if (dogData.length === 0) {
    console.log("data 0");
    return <div>Loading...</div>;
  }

  // Sort the data by date
  const sortedData = [...dogData].sort((a, b) => new Date(a.dataDay).getTime() - new Date(b.dataDay).getTime());

  const labels = sortedData.map(item => item.dataDay);
  const activeData = sortedData.map(item => item.dogActiveTime);
  const sleepData = sortedData.map(item => item.dogSleepTime);

  const chartData: ChartData<'bar'> = {
    labels: labels,
    datasets: [
      {
        label: 'Active Time',
        data: activeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Sleep Time',
        data: sleepData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dog Activity Chart',
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Time (minutes)',
        },
      },
      y: {
        stacked: true,
      },
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dog Activity Chart</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
}