import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ onSelectFeature, completeData }) => {
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
            backgroundColor: ['#FF69B4'],
            color: 'blue',
        }],
    };

    return (
        <div style={{ width: "100%", minHeight: "300px" }}>
            <Bar
                data={bardetails}
                options={{
                    onClick: (e, elements) => {
                        if (elements.length > 0) {
                            const featureName = bardetails.labels[elements[0].index];
                            onSelectFeature(featureName);
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Feature Names'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Time Spent'
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
};

export default BarChart;
