'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

export default function MarketGrowthChart({ metrics }) {
    const data_set = metrics?.market_growth?.values ?? [];

    // Parse und sortiere die Daten nach Jahr
    const sortedData = [...data_set]
        .filter(entry => entry.value && entry.year)
        .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    const labels = sortedData.map(entry => entry.year);
    const values = sortedData.map(entry => parseFloat(entry.value));

    const data = {
        labels,
        datasets: [
            {
                label: 'Market Growth',
                data: values,
                borderColor: '#0049FF',
                backgroundColor: 'rgba(0, 73, 255, 0.2)',
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#0049FF'
            }
        ]
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
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) =>
                        `€${(context.parsed.y / 1e9).toFixed(1)}B`
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => `€${(value / 1e9).toFixed(0)}B`
                }
            }
        }
    };

    return (
        <div className="h-full max-h-[300px]">
            <Line data={data} options={options} />
        </div>
    );
}
