import { useData } from "../Context/DataContext";


const filterByGender = (state , data) => {
    console.log("gender function data" , data);
    console.log("in gender function" , state);

    if(state.gender) 
    {
        const genderedData = data.filter(ele => ele.Gender === state.gender);
        console.log("gendered data is" , genderedData);

        return data.filter(ele => ele.Gender === state.gender);
    }

    return data;
    

}


const filterByAge = (state , data) => {

    if(state.age){

        return data.filter(ele => ele.Age === state.age)
    }

    return data;

    

}


const filterByDate = (state , data) => {

    if (state.dateFrom && state.dateTo){

        const dateData = data.filter(ele => {
            const dateParts = ele.Day.split("-"); // Assuming date format is "dd-mm-yyyy"
            console.log("ele.day is" , ele.Day);
            console.log("from date upar" , state.dateFrom)
            console.log("date parts are", dateParts);
            const currentDate = new Date(`${'20'+dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
            const fromDate = new Date(state.dateFrom);
            const toDate = new Date(state.dateTo);
        
            console.log("Current Date:", currentDate);
            console.log("From Date:", fromDate);
            console.log("To Date:", toDate);
            
            // Ensure that the time component is stripped off for accurate date comparison
            fromDate.setHours(0, 0, 0, 0);
            toDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0,0,0,0);
        
            console.log("Filtered Date Range:", fromDate, "to", toDate);
        
            const withinRange = currentDate >= fromDate && currentDate <= toDate;
            console.log("Within Range?", withinRange);
        
            return withinRange;
        });
        
        console.log("Filtered Data:", dateData);
        

        console.log("the date data is" , dateData);


        return dateData;
    }

    return data;

}





const useFilter = () => {
 console.log("userfilter is being called");
  const { state } = useData();
  const { data } = state;
  console.log("data in usefilter" , data)
  const genderData = filterByGender(state, data);
  console.log("gender data is " , genderData);
  const ageData = filterByAge(state, genderData);
  console.log("age data is " , ageData);
  const dateData = filterByDate(state , ageData);
  return { filteredData: dateData };
};

export { useFilter };