import React, { useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
);

const RiskRadarChart = ({ metrics, setMetrics }) => {
    const risk = metrics?.risks || {};

    const data = {
        labels: ['Competitive', 'Market', 'Regulatory', 'Reputational', 'Technology'],
        datasets: [
            {
                label: 'Risikoprofil',
                data: [
                    Number(risk?.competitive) ?? 0,
                    Number(risk?.market) ?? 0,
                    Number(risk?.regulatory) ?? 0,
                    Number(risk?.reputational) ?? 0,
                    Number(risk?.technology) ?? 0,
                ],
                backgroundColor: 'rgba(0, 73, 255, 0.2)',
                borderColor: '#0049FF',
                borderWidth: 2,
                pointBackgroundColor: '#0049FF',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        },
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 5
            }
        }
    };

    return (
        <div className="h-full max-h-[350px]">
            <Radar data={data} options={options} />
        </div>
    );
};

export default RiskRadarChart;
