import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-plugin-zoom';

ChartJS.register();

const LineChart = ({ feature, completeData }) => {
    const featureData = completeData.map(ele => { return { Day: ele.Day, Value: ele[feature] } });
    const [chartData, setChartData] = useState({});
    const [bool, setBool] = useState(false);
    const chartRef = useRef();

    useEffect(() => {
        if (feature) {
            const rawData = featureData;
            const uniqueLabels = [];
            const aggregatedData = {};

            rawData.forEach(item => {
                const label = item.Day;

                if (!uniqueLabels.includes(label)) {
                    uniqueLabels.push(label);
                    aggregatedData[label] = item.Value;
                } else {
                    aggregatedData[label] += item.Value;
                }
            });

            setChartData({
                labels: uniqueLabels,
                datasets: [{
                    label: `Time range for ${feature}`,
                    data: uniqueLabels.map(label => aggregatedData[label]),
                    borderColor: ['#FF69B4'],
                    tension: 0.1
                }],
            });
            setBool(true);
        }
    }, [feature, completeData]);

    useEffect(() => {
        if (bool && chartRef.current && chartRef.current.chartInstance) {
            const chart = chartRef.current.chartInstance;
            if (chart && chart.resize) {
                chart.resize();
            }
        }
    }, [bool]);

    return (
        bool ? (
            <div style={{ width: "100%", position: "relative" , minHeight: "300px" }}>
                <Line
                    ref={chartRef}
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            zoom: {
                                pan: {
                                    enabled: true,
                                    mode: 'x',
                                },
                                zoom: {
                                    wheel: { enabled: true },
                                    pinch: { enabled: true },
                                    mode: 'x',
                                },
                            },
                        },
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        ) : (
            <div></div>
        )
    );
};

export default LineChart;
