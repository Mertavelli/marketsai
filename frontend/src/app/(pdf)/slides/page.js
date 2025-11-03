'use client'
import {
    Chart as ChartJS,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import quadrantBackgrounds from '@/app/plugins/quadrantBackgroundPlugin'

ChartJS.unregister(ChartDataLabels)
ChartJS.unregister(quadrantBackgrounds)

export default function DeepReportSlides({ slides = [], slideIndex = 0 }) {
    const currentSlide = slides?.[slideIndex]

    return (
        <div className="aspect-[16/9] w-full max-w-5xl border border-border rounded-xl bg-white text-black flex items-center justify-center overflow-hidden">
            {currentSlide ? currentSlide : <p className="text-gray-400">Keine Slide gefunden.</p>}
        </div>
    )
}
