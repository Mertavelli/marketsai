'use client'

import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)

const ticketSize = 25000000 // 25 Mio EUR

const data = {
    labels: ['2024', '2025', '2026', '2027', '2028'],
    datasets: [
        {
            label: 'MoIC 2x',
            data: [2, 2.4, 2.8, 3.2, 3.6].map(m => m * ticketSize / 1e6), // in Mio EUR
            borderColor: '#0049FF',
            backgroundColor: '#0049FF',
            tension: 0.3
        },
        {
            label: 'MoIC 3x',
            data: [2, 2.8, 3.6, 4.4, 5.2].map(m => m * ticketSize / 1e6),
            borderColor: '#336BFF',
            backgroundColor: '#336BFF',
            tension: 0.3
        },
        {
            label: 'MoIC 4x',
            data: [2, 3.2, 4.4, 5.6, 6.8].map(m => m * ticketSize / 1e6),
            borderColor: '#99B9FF',
            backgroundColor: '#99B9FF',
            tension: 0.3
        }
    ]
}

const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return `${context.dataset.label}: €${context.raw.toFixed(1)}M`
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Exit Value (€M)'
            }
        }
    }
}

export default function ExitSzenarios() {
    return (
        <div className='relative h-full'>
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-md pointer-events-none">
                <span className="text-sm font-semibold text-[#0049FF] uppercase tracking-wide">
                    Entwurf
                </span>
            </div>
            <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md border border-border h-full">
                <h2 className="sub-heading">Exit Scenarios</h2>
                <div className="w-full h-full">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>

    )
}
