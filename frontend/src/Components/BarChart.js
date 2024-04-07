import {Bar} from 'react-chartjs-2'
import {useState , useEffect} from 'react';
import axios from 'axios';
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart = ({ onSelectFeature }) => {

    const [userData , setUserData] = useState({
        labels : [2016 , 2017 , 2018],
        datasets :[{
            label: "no of users",
            data : [10000 , 2000, 30000]
        }]
    })


    useEffect(() => {
        axios.get('http://localhost:3000/api/feature-totals')
            .then(response => {
                const data = response.data;
                setUserData({
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Total Time Spent on Each Feature',
                        data: Object.values(data),
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    }],
                });
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);


    return <div style={{width: "700px"}}><Bar data={userData} options={{
        onClick: (e, elements) => {
            console.log("clicked");
            console.log("elements" , elements);
            if (elements.length > 0) {
                console.log("clicked2")
                const featureName = userData.labels[elements[0].index];
                console.log("feature name" , featureName);
                onSelectFeature(featureName);
            }
        }
    }} /></div> 
}

export default BarChart;