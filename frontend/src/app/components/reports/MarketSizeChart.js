'use client';

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

function formatAbbreviatedUSD(value) {
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}bn`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
    return `$${value}`;
}

const MarketSizeChart = ({ metrics }) => {
    const { tam, sam } = metrics?.market_size || {}

    const chartData = {
        labels: ['TAM', 'SAM', 'SOM'],
        datasets: [
            {
                label: 'Market Sizes (USD)',
                data: [
                    Number(tam?.value),
                    Number(sam?.value),
                    Number(sam?.value) * (5 / 100)
                ],
                backgroundColor: ['#A5C8FF', '#3C8DFF', '#0049FF']
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 30,
                bottom: 30,
                left: 10,
                right: 10
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => formatAbbreviatedUSD(context.raw),
                },
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: '#000',
                font: {
                    weight: 'regular',
                    size: 12
                },
                formatter: (value) => formatAbbreviatedUSD(value),
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => formatAbbreviatedUSD(value),
                },
            },
        },
        maintainAspectRatio: false
    };

    return (
        <div className="h-full max-h-[300px]">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default MarketSizeChart;
