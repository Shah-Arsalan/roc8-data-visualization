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
            backgroundColor: [ '#FF69B4'],
        }],
    }


    return <div style={{width: 600}}><Bar data={bardetails} options={{
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const featureName = bardetails.labels[elements[0].index];
                onSelectFeature(featureName);
            }
        }
    }} /></div> 
}

export default BarChart;