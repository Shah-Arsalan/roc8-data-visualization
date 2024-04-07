import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import BarChart from './Components/BarChart';
import LineChart from './Components/LineChart';

function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [completeData, setCompleteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  const applyFilters = (gender, age) => {
    let filteredData = completeData;

    if (gender) {
      filteredData = filteredData.filter(ele => ele.Gender === gender);
    }

    if (age) {
      if (age === '15-25') {
        filteredData = filteredData.filter(ele => ele.Age === '>25');
      } else if (age === '>25') {
        filteredData = filteredData.filter(ele => ele.Age === '15-25');
      }
    }

    setFilteredData(filteredData);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/data")
      .then(response => {
        console.log("the response of data api is", response.data);
        setCompleteData(response.data);
        setFilteredData(response.data); 
      });
  }, []);



  return (
    <div className="App">
      <div className='filter-container'>
      <div>
        <label onClick={() => applyFilters("Male")}>
          <input type="radio" name="gender" value="male" />
          Male
        </label>
        <label onClick={() => applyFilters("Female")}>
          <input type="radio" name="gender" value="female" />
          Female
        </label>
        </div>
        <div>
        <label onClick={() => applyFilters(null, "15-25")}>
          <input type="radio" name="age" value="15-25" />
          15-25
        </label>
        <label onClick={() => applyFilters(null, ">25")}>
          <input type="radio" name="age" value=">25" />
          {`>25`}
        </label>
        </div>
      </div>

      {completeData.length > 0 &&
        <BarChart onSelectFeature={setSelectedFeature} completeData={filteredData} />
      }

      {selectedFeature && <LineChart feature={selectedFeature} onSelectFeature={setSelectedFeature} completeData={filteredData}/>}
    </div>
  );
}

export default App;
