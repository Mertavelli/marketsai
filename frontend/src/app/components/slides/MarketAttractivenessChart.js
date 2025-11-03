'use client'
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Title } from 'chart.js'
import { Bubble } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import quadrantBackgrounds from '@/app/plugins/quadrantBackgroundPlugin'

// Nur interne Chart-Komponenten registrieren, Datalabels wird lokal eingebunden
ChartJS.register(LinearScale, PointElement, Tooltip, Title)

export default function MarketAttractivenessChart({ countries }) {
    const data = {
        datasets: countries.map((country) => ({
            label: country.country,
            data: [{
                x: country.ease_of_entry,
                y: country.attractiveness,
                r: 8,
            }],
            backgroundColor: getColorByFocus(country.focus),
        }))
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                min: 0,
                max: 10,
                grid: { display: false },
                title: { display: true, text: 'Ease of Entry', font: { size: 14 } },
                ticks: { stepSize: 1 }
            },
            y: {
                min: 0,
                max: 10,
                grid: { display: false },
                title: { display: true, text: 'Market Attractiveness', font: { size: 14 } },
                ticks: { stepSize: 1 }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || ''
                        const { x, y } = context.raw
                        return `${label}: Ease ${x}, Attractiveness ${y}`
                    }
                }
            },
            datalabels: {
                display: true,
                align: 'top',
                color: '#000',
                font: {
                    weight: 'normal',
                    size: 10,
                },
                formatter: (_, context) => context.dataset.label
            },
            quadrantBackgrounds: true
        }
    }

    return (
        <div className='h-[275px] w-full'>
            <Bubble options={options} data={data} plugins={[quadrantBackgrounds, ChartDataLabels]} />
        </div>
    )

    function getColorByFocus(focus) {
        switch (focus) {
            case 'current': return 'rgba(0, 0, 0, 0.8)'
            case 'future': return 'rgba(234, 179, 8, 0.7)'
            case 'no_potential': return 'rgba(255, 255, 255, 0.8)'
            default: return 'rgba(107, 114, 128, 0.5)'
        }
    }
}
