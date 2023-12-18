// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import GaugeChart from 'react-gauge-chart';
// import moment from 'moment';

// class SensorDataChart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     fetch('http://localhost:8080/data/sensor')
//       .then(response => response.json())
//       .then(data => this.setState({ data }));
//   }

//   render() {
//     const { data } = this.state;

//     // Prepare data for charts
//     const timestamps = data.map(d => new Date(d.timestamp).toLocaleTimeString());
//     const humidityData = data.map(d => d.humidity);
//     const temperatureData = data.map(d => d.temperature);
//     const soilMoistureData = data.map(d => d.soilMoisture);

//     // Prepare latest data for gauge charts
//     const latestHumidity = humidityData[humidityData.length - 1] / 100;
//     const latestTemperature = temperatureData[temperatureData.length - 1] / 100;
//     const latestSoilMoisture = soilMoistureData[soilMoistureData.length - 1] / 100;

//     return (
//       <div>
//         <Line 
//           data={{
//             labels: timestamps,
//             datasets: [
//               {
//                 label: 'Humidity',
//                 data: humidityData,
//                 borderColor: 'rgba(75,192,192,1)',
//               },
//               {
//                 label: 'Temperature',
//                 data: temperatureData,
//                 borderColor: 'rgba(192,75,75,1)',
//               },
//               {
//                 label: 'Soil Moisture',
//                 data: soilMoistureData,
//                 borderColor: 'rgba(75,75,192,1)',
//               },
//             ],
//           }}
//           options={{
//   scales: {
//     xAxes: [{
//       type: 'time',
//       time: {
//         unit: 'second'
//       },
//       distribution: 'series'
//     }]
//   }
// }}

//         />

//         <GaugeChart id="gauge-chart1" percent={latestHumidity} />
//         <GaugeChart id="gauge-chart2" percent={latestTemperature} />
//         <GaugeChart id="gauge-chart3" percent={latestSoilMoisture} />
//       </div>
//     );
//   }
// }

// export default SensorDataChart;
