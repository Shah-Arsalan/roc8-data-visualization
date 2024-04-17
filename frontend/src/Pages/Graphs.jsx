import axios from "axios";
import { useEffect, useState } from "react";
import BarChart from "../Components/BarChart";
import LineChart from "../Components/LineChart";
import { useAuth } from "../Context/AuthContext";
import { useFilter } from "../CustomHooks/useFilter";
import { useData } from "../Context/DataContext";

const Graphs = () => {
  const { token, setToken } = useAuth();
  const { state, dispatch } = useData();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const { filteredData } = useFilter();
  console.log("filteredData in graphs page", filteredData);
  const [loader, setLoader] = useState(true);

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    setToken(null);
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
  }, []);

  return (
    <div>
      <div
        className="filter-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "start",
          marginBottom: 10,
        }}
      >
        <div>Filter by gender and age :</div>
        <div style={{ curosor: "pointer" }}>
          <label
            onClick={() =>
              dispatch({
                type: "GENDER",
                payload: { gender: "Male" },
              })
            }
          >
            <input
              type="radio"
              name="gender"
              value="male"
              checked={state.gender === "Male"}
            />
            Male
          </label>
          <label
            onClick={() =>
              dispatch({
                type: "GENDER",
                payload: { gender: "Female" },
              })
            }
          >
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
          <label
            onClick={() =>
              dispatch({
                type: "AGE",
                payload: { age: "15-25" },
              })
            }
          >
            <input
              type="radio"
              name="age"
              value="15-25"
              checked={state.age === "15-25"}
            />
            Age 15-25
          </label>
          <label
            onClick={() =>
              dispatch({
                type: "AGE",
                payload: { age: ">25" },
              })
            }
          >
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
            <input
              type="date"
              value={state.dateFrom ? state.dateFrom : "2022-10-02"}
              onChange={(e) => {
                dispatch({
                  type: "DATEFROM",
                  payload: { dateFrom: e.target.value },
                });
              }}
            />
            From Date :
          </label>
          <label>
            <input
              type="date"
              value={state.dateTo? state.dateTo : "2022-10-30"}
              onChange={(e) => {
                dispatch({
                  type: "DATETO",
                  payload: { dateTo: e.target.value },
                });
              }}
            />
            To Date :
          </label>
          <div>(only from 4-10-2022 to 29-10-2022 )</div>
        </div>
        <button onClick={() => dispatch({ type: "CLEAR_FILTERS" })}>
          Clear Filters
        </button>
      </div>

      <button onClick={logoutHandler}>Logout</button>

      {loader && (
        <div>
          Loading... the site where backend is hosted is slow to respond
        </div>
      )}

      {filteredData?.length > 0 && (
        <BarChart
          onSelectFeature={setSelectedFeature}
          completeData={filteredData}
        />
      )}

      {selectedFeature && (
        <LineChart
          feature={selectedFeature}
          onSelectFeature={setSelectedFeature}
          completeData={filteredData}
        />
      )}
    </div>
  );
};

export default Graphs;
