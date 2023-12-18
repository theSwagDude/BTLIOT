import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Gauge.css';

const chartStyle = {
  height: 250,

};

export function Gauge1({ timeRange }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/data/sensor')
      .then(response => response.json())
      .then(data => {
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

        const temperatureData = filteredData.map(item => item.temperature);
        const avgTemperature = temperatureData.reduce((a, b) => a + b, 0) / temperatureData.length;
        setPercent(avgTemperature / 100); // assuming the max soil moisture is 100
      });
  }, [timeRange]);

  return (
    <GaugeChart
      id="gauge-chart1"
      style={chartStyle}
      nrOfLevels={20}
      percent={percent}
      textColor="#000000"
    />
  );
}

export function Gauge2({ timeRange }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/data/sensor')
      .then(response => response.json())
      .then(data => {
        // assuming that the data is an array of objects
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

        const humidityData = filteredData.map(item => item.humidity);
        const avgHumidity = humidityData.reduce((a, b) => a + b, 0) / humidityData.length;
        setPercent(avgHumidity / 100); // assuming the max soil moisture is 100
      });
  }, [timeRange]);

  return (
    <GaugeChart
      id="gauge-chart2"
      style={chartStyle}
      nrOfLevels={20}
      percent={percent}
      textColor="#000000"
    />
  );
}


export function Gauge3({ timeRange }) {
  const [percent, setPercent] = useState(0);

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

        const soilMoistureData = filteredData.map(item => item.soil_moisture);
        const avgSoilMoisture = soilMoistureData.reduce((a, b) => a + b, 0) / soilMoistureData.length;
        setPercent(avgSoilMoisture / 100); // assuming the max soil moisture is 100
      });
  }, [timeRange]); // re-run effect when timeRange changes

  return (
    <GaugeChart
      id="gauge-chart3"
      style={chartStyle}
      nrOfLevels={20}
      percent={percent}
      textColor="#000000"
    />
  );
}

// export function Gauge3() {
//   const [percent, setPercent] = useState(0);

//   useEffect(() => {
//     fetch('http://localhost:8080/data/sensor')
//       .then(response => response.json())
//       .then(data => {
//         const soilMoistureData = data.map(item => item.soil_moisture);
//         const avgSoilMoisture = soilMoistureData.reduce((a, b) => a + b, 0) / soilMoistureData.length;
//         setPercent(avgSoilMoisture / 100); // assuming the max temperature is 100
//         // const soilData = data[data.length - 1].soil_moisture;
//         // setPercent(soilData / 100);
//       });
//   }, []);

//   return (
//     <GaugeChart
//       id="gauge-chart3"
//       style={chartStyle}
//       nrOfLevels={20}
//       percent={percent}
//       textColor="#000000"
//     />
//   );
// }

// export function Gauge1() {
//     return (
//             <GaugeChart
//                 id="gauge-chart1"
//                 style={chartStyle}
//                 nrOfLevels={20}
//                 percent={0.86}
//                 textColor= "#000000"
//             />
//     );
// }

// export function Gauge2() {
//     return (
//             <GaugeChart
//                 id="gauge-chart2"
//                 style={chartStyle}
//                 nrOfLevels={20}
//                 percent={0.86}
//                 textColor= "#000000"
//             />
//     );
// }

// export function Gauge3() {
//     return (
//             <GaugeChart
//                 id="gauge-chart3"
//                 style={chartStyle}
//                 nrOfLevels={20}
//                 percent={0.86}
//                 textColor= "#000000"
//             />
//     );
// }
