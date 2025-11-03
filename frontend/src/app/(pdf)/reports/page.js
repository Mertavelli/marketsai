'use client'
//import { effectiveMetrics } from "@/app/mockData"
import Header from "@/app/sections/reports/header/Header"
import ExecutiveSummary from "@/app/sections/reports/executive-summary/ExecutiveSummary"
import MarketOverview from "@/app/sections/reports/market-overview/MarketOverview"
import Competitors from "@/app/sections/reports/competitors/Competitors"
import RiskOverview from "@/app/sections/reports/risks/RiskOverview"
import Team from "@/app/sections/reports/team/Team"

export default function DeepReportDocument({ metrics, setMetrics }) {

    const localMetrics = ""
    const effectiveMetrics = metrics || localMetrics;

    return (
        <div className="p-10">
            <Header metrics={effectiveMetrics} setMetrics={setMetrics} />

            <div className="flex flex-col gap-4 mt-4">
                <ExecutiveSummary metrics={effectiveMetrics} setMetrics={setMetrics} />

                <MarketOverview metrics={effectiveMetrics} setMetrics={setMetrics} />

                <div className="pdf-page-break" />

                <Competitors metrics={effectiveMetrics} setMetrics={setMetrics} />

                <RiskOverview metrics={effectiveMetrics} setMetrics={setMetrics} />

                <Team metrics={effectiveMetrics} setMetrics={setMetrics} />
            </div>
        </div>

    )
}