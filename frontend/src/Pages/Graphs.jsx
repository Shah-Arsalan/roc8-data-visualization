import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BarChart from "../Components/BarChart";
import LineChart from "../Components/LineChart";
import { useAuth } from "../Context/AuthContext";
import { useFilter } from "../CustomHooks/useFilter";
import { useData } from "../Context/DataContext";

const Graphs = () => {
  const location = useLocation();
  const { token, setToken } = useAuth();
  const { state, dispatch } = useData();
  const { filteredData } = useFilter();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [loader, setLoader] = useState(true);

  const generateURL = () => {
    const queryParams = new URLSearchParams();
    if (state.gender) queryParams.set("gender", state.gender);
    if (state.age) queryParams.set("age", state.age);
    if (state.dateFrom) queryParams.set("dateFrom", state.dateFrom);
    if (state.dateTo) queryParams.set("dateTo", state.dateTo);
    return `${window.location.pathname}${queryParams.toString() ? "?" + queryParams.toString() : ""}`;
  };


  const handleFilterChange = (type, value) => {
    dispatch({
      type: type,
      payload: { [type.toLowerCase()]: value },
    });
    setCookie(type.toLowerCase(), value, 30);
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
    clearCookies();
  };

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const clearCookies = () => {
    document.cookie = "gender=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "age=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "datefrom=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "dateto=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  
  useEffect(() => {
    axios.get("http://localhost:3000/api/data").then((response) => {
      console.log("the response from api", response.data);
      dispatch({
        type: "INITIAL_DATA_FETCH",
        payload: { data: response.data },
      });
      setLoader(false);
    });
    console.log("after response");

    const queryParams = new URLSearchParams(location.search);
    const savedGender = queryParams.get("gender");
    const savedAge = queryParams.get("age");
    const savedDateFrom = queryParams.get("dateFrom");
    const savedDateTo = queryParams.get("dateTo");

    if (savedGender) {
      dispatch({ type: "GENDER", payload: { gender: savedGender } });
    }
    if (savedAge) {
      dispatch({ type: "AGE", payload: { age: savedAge } });
    }
    if (savedDateFrom) {
      dispatch({ type: "DATEFROM", payload: { datefrom: savedDateFrom } });
    }
    if (savedDateTo) {
      dispatch({ type: "DATETO", payload: { dateto: savedDateTo } });
    }
  }, [location.search]);

  useEffect(() => {
    const chartURL = generateURL();
    window.history.replaceState(null, null, chartURL); // Update URL on component mount
  }, [state]);

  return (
    <div>
      <div className="filter-container" style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "start", marginBottom: 10 }}>
        <div>Filter by gender and age :</div>
        <div style={{ cursor: "pointer" }}>
          <label onClick={() => handleFilterChange("GENDER", "Male")}>
            <input type="radio" name="gender" value="male" checked={state.gender === "Male"} />
            Male
          </label>
          <label onClick={() => handleFilterChange("GENDER", "Female")}>
            <input type="radio" name="gender" value="female" checked={state.gender === "Female"} />
            Female
          </label>
        </div>
        <div>
          <label onClick={() => handleFilterChange("AGE", "15-25")}>
            <input type="radio" name="age" value="15-25" checked={state.age === "15-25"} />
            Age 15-25
          </label>
          <label onClick={() => handleFilterChange("AGE", ">25")}>
            <input type="radio" name="age" value=">25" checked={state.age === ">25"} />
            Age {`>25`}
          </label>
        </div>
        <div>
          <label>
            <input type="date" value={state.dateFrom} onChange={(e) => handleFilterChange("DATEFROM", e.target.value)} />
            From Date :
          </label>
          <label>
            <input type="date" value={state.dateTo} onChange={(e) => handleFilterChange("DATETO", e.target.value)} />
            To Date :
          </label>
          <div>(only from 01-10-2022 to 31-10-2022 )</div>
        </div>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <button onClick={logoutHandler}>Logout</button>

      {loader && <div>Loading... the site where backend is hosted is slow to respond</div>}

      {filteredData?.length > 0 && <BarChart onSelectFeature={setSelectedFeature} completeData={filteredData} />}

      {selectedFeature && <LineChart feature={selectedFeature} onSelectFeature={setSelectedFeature} completeData={filteredData} />}
    </div>
  );
};

export default Graphs;
