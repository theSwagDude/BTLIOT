import logo from './logo.svg';
import './App.css';
import { LineGraph1, LineGraph2, LineGraph3 } from './components/LineGraph';
import { Gauge1, Gauge2, Gauge3 } from './components/Gauge';
import Button from './components/Button';
// import SensorDataChart from './components/SensorDataChart';

function App() {
  return (
    <div>
      {/* <SensorDataChart/> */}
      <h1> Smart Garden</h1>
      <div className="graph-container">
        <div className="graph">
          <LineGraph1></LineGraph1>
        </div>
        <div className="graph">
          <LineGraph2></LineGraph2>
        </div>
        <div className="graph">
          <LineGraph3></LineGraph3>
        </div>
      </div>
      <div className="gauge-container">
        <div className="gauge">
          <Gauge1></Gauge1>
        </div>
        <div className="gauge">
          <Gauge2></Gauge2>
        </div>
        <div className="gauge">
          <Gauge3></Gauge3>
        </div>
      </div>
      <div><Button></Button></div>
    </div>
  );
}

export default App;
