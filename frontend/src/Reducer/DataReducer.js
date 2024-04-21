const initialState = {
  data: [],
  gender: null,
  age: null,
  dateFrom: '2022-10-01',
  dateTo:'2022-10-31' ,
};

function excelDateToJSDate(excelDate) {
  const excelEpoch = new Date(1899, 11, 30);
  const milliseconds = (excelDate - 1) * 24 * 60 * 60 * 1000;
  const jsDate = new Date(excelEpoch.getTime() + milliseconds);

  const day = jsDate.getDate().toString().padStart(2, "0");
  const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
  const year = jsDate.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}

const DataReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "INITIAL_DATA_FETCH": {
      const changedData = payload.data.map((ele) => ({
        ...ele,
        Day: excelDateToJSDate(ele.Day),
      }));

      return { ...state, data: changedData };
    }

    case "GENDER": {
      return { ...state, gender: payload.gender };
    }

    case "AGE": {
      return { ...state, age: payload.age };
    }

    case "DATEFROM": {
      return { ...state, dateFrom: payload.datefrom };
    }

    case "DATETO": {
      return { ...state, dateTo: payload.dateto };
    }

    case "CLEAR_FILTERS": {
      return {
        ...state,
        gender: null,
        age: null,
        dateFrom: '2022-10-01',
        dateTo: '2022-10-31',
      };
    }

    default:
      return state;
  }
};

export { DataReducer, initialState };
