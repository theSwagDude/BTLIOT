import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';


export function LineGraph1() {
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('all'); // default to 'all'

  useEffect(() => {
    fetch('http://localhost:8080/data/sensor')
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        // filter data based on timeRange
        const now = new Date();
        const filteredData = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          switch (timeRange) {
            case 'week':
              const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
              return itemDate >= oneWeekAgo;
            case 'month':
              const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
              return itemDate >= oneMonthAgo;
            case 'today':
              const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              return itemDate >= today;
            default:
              return true; // no filtering for 'all'
          }
        });

        const labels = filteredData.map(item => new Date(item.timestamp).toLocaleString());
        const temperatureData = filteredData.map(item => item.temperature);
        setData({
          labels,
          datasets: [
            {
              label: 'Temperature',
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              data: temperatureData,
            },
          ],
        });
      });
  }, [timeRange]); // re-run effect when timeRange changes

  return (
    <div>
      <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
        <option value="all">All</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="today">Today</option>
      </select>
      {data ? <Line data={data} /> : null}
    </div>
  );
}


export function LineGraph2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/data/sensor')
      .then(response => response.json())
      .then(data => {
        // assuming that the data is an array of objects
        const labels = data.map(item => new Date(item.timestamp).toLocaleString());
        const humidityData = data.map(item => item.humidity);
        setData({
          labels,
          datasets: [
            {
              label: 'Humidity',
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              data: humidityData,
            },
          ],
        });
      });
  }, []);

  return data ? <Line data={data} /> : null;
}

export function LineGraph3() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/data/sensor')
      .then(response => response.json())
      .then(data => {
        // assuming that the data is an array of objects
        const labels = data.map(item => new Date(item.timestamp).toLocaleString());
        const soilMoistureData = data.map(item => item.soil_moisture);
        setData({
          labels,
          datasets: [
            {
              label: 'Soil Moisture',
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              data: soilMoistureData,
            },
          ],
        });
      });
  }, []);

  return data ? <Line data={data} /> : null;
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data1 = {
//   labels,
//   datasets: [
//     {
//       label: 'Temparature',
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       data: [0, 10, 5, 2, 20, 30, 45],
//     },
//   ],
// };

// const data2 = {
//   labels,
//   datasets: [
//     {
//       label: 'Humidity',
//       borderColor: 'rgb(54, 162, 235)',
//       backgroundColor: 'rgba(54, 162, 235, 0.5)',
//       data: [10, 20, 30, 40, 50, 60, 70],
//     },
//   ],
// };

// const data3 = {
//   labels,
//   datasets: [
//     {
//       label: 'Soil Moisture',
//       borderColor: 'rgb(75, 192, 192)',
//       backgroundColor: 'rgba(75, 192, 192, 0.5)',
//       data: [70, 60, 50, 40, 30, 20, 10],
//     },
//   ],
// };