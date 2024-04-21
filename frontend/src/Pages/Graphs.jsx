import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BarChart from "../Components/BarChart";
import LineChart from "../Components/LineChart";
import { useAuth } from "../Context/AuthContext";
import { useFilter } from "../CustomHooks/useFilter";
import { useData } from "../Context/DataContext";
import { Box } from "@mui/material";
import { Loader } from "../Components/Loader/Loader";

const Graphs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {locstate} = location;
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
    return `${window.location.pathname}${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
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
    navigate('/login', { state : locstate})
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
    axios.get("https://roc8-data-visualization.onrender.com/api/data").then((response) => {
      dispatch({
        type: "INITIAL_DATA_FETCH",
        payload: { data: response.data },
      });
      setLoader(false);
    });


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
    window.history.replaceState(null, null, chartURL); 
  }, [state]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" , padding:"2rem" , background:"#1E1E1E" , color:"white" , height:"100vw"}}>
      {loader && (
        <div>Loading...the site where backend is hosted is slow to respond</div>
      )}
      {filteredData.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
            marginBottom: 3,
            border: "1px solid #FF69B4",
            padding:".5rem",
            borderRadius:"1rem",
            width:{ xs: "80%", sm: "70%", md: "50%", lg: "40%", xl: "40%" },
            gap:2,

          }}

        >
          <div>Filter by gender, age and date range :</div>
          <div style={{ cursor: "pointer" }}>
            <label onClick={() => handleFilterChange("GENDER", "Male")}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={state.gender === "Male"}
              />
              Male
            </label>
            <label onClick={() => handleFilterChange("GENDER", "Female")}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={state.gender === "Female"}
              />
              Female
            </label>
          </div>
          <div>
            <label onClick={() => handleFilterChange("AGE", "15-25")}>
              <input
                type="radio"
                name="age"
                value="15-25"
                checked={state.age === "15-25"}
              />
              Age 15-25
            </label>
            <label onClick={() => handleFilterChange("AGE", ">25")}>
              <input
                type="radio"
                name="age"
                value=">25"
                checked={state.age === ">25"}
              />
              Age {`>25`}
            </label>
          </div>
          <div>
            <label>
            From Date :
              <input
                type="date"
                value={state.dateFrom}
                onChange={(e) => handleFilterChange("DATEFROM", e.target.value)}
              />
              
            </label>
            <label>
            To Date :
              <input
                type="date"
                value={state.dateTo}
                onChange={(e) => handleFilterChange("DATETO", e.target.value)}
              />
             
            </label>
            <div style={{textAlign:"center"}}>(only from 01-10-2022 to 31-10-2022 )</div>
          </div>
          <button onClick={clearFilters} style={{padding:".5rem" , background:"#FF69B4" , color:"white" , border:"none" , borderRadius:".5rem" , cursor:"pointer"}}>Clear Filters</button>
        </Box>
      )}

      {filteredData?.length > 0 && (<button style={{padding:".5rem" , background:"#FF69B4" , color:"white" , border:"none" , borderRadius:".5rem" , cursor:"pointer"}} onClick={logoutHandler}>Logout</button>) }

      {filteredData?.length > 0 && (
        <Box sx={{width:{ xs: "80%", sm: "70%", md: "50%", lg: "50%", xl: "50%" }, marginTop:1}}>
        <BarChart
          onSelectFeature={setSelectedFeature}
          completeData={filteredData}
        />
        </Box>
      )}

      {selectedFeature && (
        <Box sx={{width:{ xs: "80%", sm: "70%", md: "50%", lg: "50%", xl: "50%" }, marginTop:5}}>
        <LineChart
          feature={selectedFeature}
          onSelectFeature={setSelectedFeature}
          completeData={filteredData}
        />
        </Box>
      )}
    </div>
  );
};

export default Graphs;
