import logo from './logo.svg';
import {useState} from 'react';
import './App.css';
import BarChart from './Components/BarChart';
import LineChart from './Components/LineChart';

function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  console.log("the selected feture becomes" , selectedFeature);
  return (
    <div className="App">
    <BarChart onSelectFeature={setSelectedFeature}/>
    {selectedFeature && <LineChart feature={selectedFeature} onSelectFeature={setSelectedFeature}/>}

    </div>
  );
}

export default App;
