import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Gauge.css';

const chartStyle = {
    height: 250,
    
};

export function Gauge1() {
    const [percent, setPercent] = useState(0);
  
    useEffect(() => {
      fetch('http://localhost:8080/data/sensor')
        .then(response => response.json())
        .then(data => {
          // assuming that the data is an array of objects
          const temperatureData = data.map(item => item.temperature);
          const avgTemperature = temperatureData.reduce((a, b) => a + b, 0) / temperatureData.length;
          setPercent(avgTemperature / 100); // assuming the max temperature is 100
        });
    }, []);
  
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

  export function Gauge2() {
    const [percent, setPercent] = useState(0);
  
    useEffect(() => {
      fetch('http://localhost:8080/data/sensor')
        .then(response => response.json())
        .then(data => {
          // assuming that the data is an array of objects
          const humidityData = data.map(item => item.humidity);
          const avgHumidity = humidityData.reduce((a, b) => a + b, 0) / humidityData.length;
          setPercent(avgHumidity / 100); // assuming the max temperature is 100
        });
    }, []);
  
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

  export function Gauge3() {
    const [percent, setPercent] = useState(0);
  
    useEffect(() => {
      fetch('http://localhost:8080/data/sensor')
        .then(response => response.json())
        .then(data => {
          // assuming that the data is an array of objects
          const soilMoistureData = data.map(item => item.soil_moisture);
          const avgSoilMoisture = soilMoistureData.reduce((a, b) => a + b, 0) / soilMoistureData.length;
          setPercent(avgSoilMoisture / 100); // assuming the max temperature is 100
        });
    }, []);
  
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
