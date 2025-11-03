'use client'
import React from "react"
import Header from "../slides/Header"
import Footer from "../slides/Footer"
import { FaCircleUp, FaCircleDown } from "react-icons/fa6";

export default function MarketTrendsSlide({ metrics = {}, pageNumber }) {
    const marketTrends = metrics.market_trends
    const trends = marketTrends?.trends || []

    const growthTemplate = (rowData) => {
        return (
            <span className="text-sm">
                {rowData.growth_direction === 'up' ? '🔺 Growing' : '🔻 Declining'}
            </span>
        )
    }

    return (
        <div className="slide">
            <Header title={`Market Trends: ${marketTrends?.market} in ${marketTrends?.country}`} />
            <div className="flex flex-col">
                <div className="relative w-full">
                    <div className="absolute inset-0 bg-[url('/slides/bg.png')] bg-cover bg-center scale-x-[-1] z-0" />
                    <div className="relative z-10 grid grid-cols-3 border border-white">
                        <h2 className="sub-heading-slide text-white py-0.5 pl-2">Trend type</h2>
                        <h2 className="sub-heading-slide text-white py-0.5 text-center border-x border-white">Trend</h2>
                        <h2 className="sub-heading-slide text-white py-0.5 text-center">Growth</h2>
                    </div>
                </div>

                <div className="inline-grid grid-cols-3 text-[0.6rem] border border-dotted border-border">
                    {trends.map((trend, i) => (
                        <React.Fragment key={i}>
                            <p className="font-semibold px-1 py-0.5 border border-dotted border-border">{trend.type}</p>
                            <p className="px-1 py-0.5 border border-dotted border-border">{trend.description}</p>
                            <div className="flex items-center justify-center px-1 py-0.5 border border-dotted border-border">
                                {trend.growth_direction === "up" ? (
                                    <FaCircleUp className="text-accent" size={12} />
                                ) : (
                                    <FaCircleDown className="text-red-500" size={12} />
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>

            </div>

            <Footer metrics={metrics} pageNumber={pageNumber} />
        </div>
    )
}
