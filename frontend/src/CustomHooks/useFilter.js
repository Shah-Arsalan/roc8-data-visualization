import { useData } from "../Context/DataContext";


const filterByGender = (state , data) => {

    if(state.gender) 
    {
        const genderedData = data.filter(ele => ele.Gender === state.gender);

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
            const dateParts = ele.Day.split("-"); 
            const currentDate = new Date(`${'20'+dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
            const fromDate = new Date(state.dateFrom);
            const toDate = new Date(state.dateTo);
        
            

            fromDate.setHours(0, 0, 0, 0);
            toDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0,0,0,0);
        

        
            const withinRange = currentDate >= fromDate && currentDate <= toDate;

        
            return withinRange;
        });
        



        return dateData;
    }

    return data;

}





const useFilter = () => {
  const { state } = useData();
  const { data } = state;
  const genderData = filterByGender(state, data);
  const ageData = filterByAge(state, genderData);
  const dateData = filterByDate(state , ageData);
  return { filteredData: dateData };
};

export { useFilter };