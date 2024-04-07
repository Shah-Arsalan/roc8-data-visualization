import {Bar} from 'react-chartjs-2'
import {useState , useEffect} from 'react';
import axios from 'axios';
import {Chart as ChartJS} from 'chart.js/auto'

const BarChart = ( {onSelectFeature  , completeData}) => {

    const bardata = completeData.reduce((acc, row) => {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(feature => {
            acc[feature] = (acc[feature] || 0) + row[feature];
        });
        return acc;
    }, {});

    const bardetails = {
        labels: Object.keys(bardata),
        datasets: [{
            label: 'Total Time Spent on Each Feature',
            data: Object.values(bardata),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }],
    }
    console.log("The barData is" , bardata);

    return <div style={{width: "700px"}}><Bar data={bardetails} options={{
        onClick: (e, elements) => {
            console.log("clicked");
            console.log("elements" , elements);
            if (elements.length > 0) {
                console.log("clicked2")
                const featureName = bardetails.labels[elements[0].index];
                console.log("feature name" , featureName);
                onSelectFeature(featureName);
            }
        }
    }} /></div> 
}

export default BarChart;