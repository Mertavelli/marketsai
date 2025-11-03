'use client'
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar } from 'react-chartjs-2'

// Register modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)

export default function MarketDevelopmentChart({ chartDataObject }) {
    if (!chartDataObject) return null

    const {
        market,
        country,
        unit,
        data,
        source,
        source_name,
    } = chartDataObject

    const labels = data.map((entry) => entry.year.toString())
    const values = data.map((entry) => entry.value)

    const dataConfig = {
        labels,
        datasets: [
            {
                label: `${market}`,
                data: values,
                backgroundColor: '#0049FF',
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false, // ⬅️ Seitenverhältnis deaktivieren
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: 'black',
                    font: {
                        weight: '300', // Dünne Schrift
                        size: 10,      // Optional: kleiner
                    },
                },
            },
            datalabels: {
                color: 'white',
                anchor: 'end',
                align: 'start',
                font: {
                    weight: 'medium',
                },
                formatter: (value) => value.toLocaleString('en-US'),
            },
        },

        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    display: false,
                },
                title: {
                    display: false,
                },
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
            },
        },
    }

    return (
        <div className="w-full max-w-md mx-auto" style={{ height: 225 }}>
            <Bar options={options} data={dataConfig} />
        </div>
    )
}
