'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { useGetPortfolioOfUser } from '../hooks/api'
import { useAuthStore } from '../stores/useAuthStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const formatCurrencyShort = (value) => {
    if (value >= 1_000_000_000) return `€${(value / 1_000_000_000).toFixed(1)}B`
    if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}K`
    return `€${value.toLocaleString()}`
}


const AssetsDonutChart = () => {
    const chartRef = useRef(null)
    const { user } = useAuthStore()
    const { data: portfolio = [] } = useGetPortfolioOfUser(user.id)

    // 🔁 Dynamisch aus dem Portfolio berechnen
    const chartData = useMemo(() => {
        const labels = portfolio.map(entry => entry.company)
        const data = portfolio.map(entry => entry.capital)

        const total = data.reduce((sum, val) => sum + val, 0)

        return {
            labels,
            data,
            total
        }
    }, [portfolio])

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Assets under Management (AUM)',
                data: chartData.data,
                backgroundColor: ['#0049FF', '#4D73FF', '#809BFF', '#B3C3FF', '#DDE6FF', '#EDF2FF', '#F7FAFF'],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#1F1F1F',
                    boxWidth: 20,
                    padding: 20
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed
                        return `${context.label}: $${value.toLocaleString()}`
                    }
                }
            }
        }
    }

    useEffect(() => {
        const chart = chartRef.current
        if (!chart) return

        const centerText = {
            id: 'centerText',
            beforeDraw: (chart) => {
                const { width, height } = chart
                const { ctx } = chart
                ctx.save()
                ctx.font = '600 2.5rem "Inter", sans-serif'
                ctx.fillStyle = '#1F1F1F'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(formatCurrencyShort(chartData.total), width / 2, height / 2 - 20)
            }
        }

        ChartJS.register(centerText)
        return () => ChartJS.unregister(centerText)
    }, [chartData.total])

    return (
        <div className="flex flex-col w-full h-full">
            <div className='sub-heading invisible'>Placeholder</div>
            <div className="card flex-grow">
                <h2 className="sub-heading">AUM Breakdown</h2>
                <div className="w-[400px] h-[400px] mx-auto">
                    <Doughnut ref={chartRef} data={data} options={options} />
                </div>


            </div>
        </div>
    )
}

export default AssetsDonutChart
