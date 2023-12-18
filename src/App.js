import logo from './logo.svg';
import './App.css';
import { LineGraph1, LineGraph2, LineGraph3 } from './components/LineGraph';
import { Gauge1, Gauge2, Gauge3 } from './components/Gauge';
// import Button from './components/Button';
import Pins from './components/Pins';
// import SensorDataChart from './components/SensorDataChart';
import { useState } from 'react';

function App() {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div>
      {/* <SensorDataChart/> */}
      <h1> Smart Garden</h1>
      <div>
        <button onClick={() => setTimeRange('week')}>Week</button>
        <button onClick={() => setTimeRange('month')}>Month</button>
        <button onClick={() => setTimeRange('today')}>Today</button>
        <button onClick={() => setTimeRange('all')}>All</button>

      </div>
      <div className="graph-container">
        <div className="graph">
          <LineGraph1 timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
        <div className="graph">
          <LineGraph2 timeRange={timeRange} setTimeRange={setTimeRange}></LineGraph2>
        </div>
        <div className="graph">
          <LineGraph3 timeRange={timeRange} setTimeRange={setTimeRange}></LineGraph3>
        </div>
      </div>
      <div className="gauge-container">
        <div className="gauge">
          <Gauge1 timeRange={timeRange} setTimeRange={setTimeRange}></Gauge1>
        </div>
        <div className="gauge">
          <Gauge2 timeRange={timeRange} setTimeRange={setTimeRange}></Gauge2>
        </div>
        <div className="gauge">
          <Gauge3 timeRange={timeRange} setTimeRange={setTimeRange}></Gauge3>
        </div>

      </div>
      <div><Pins></Pins></div>
    </div>
  );
}

export default App;
