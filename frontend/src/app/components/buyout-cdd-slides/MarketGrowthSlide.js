'use client'
import React, { useState, useEffect } from "react"
import Header from "../slides/Header"
import Footer from "../slides/Footer"
import MarketDevelopmentChart from "../slides/MarketDevelopmentChart"
import { calculateCAGR } from "@/app/helpers"

export default function MarketGrowthSlide({ metrics = {}, pageNumber }) {
    const marketDevelopment = metrics?.market_development

    return (
        <div className="slide">
            <Header title={marketDevelopment.title} />
            <div className="grid grid-cols-2 gap-10">
                {marketDevelopment.markets.map((country, i) => (
                    <div key={i} className="">
                        <h2 className="sub-heading-slide border-b border-border py-1 w-full mb-2">{country.title}</h2>

                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col gap-2 w-[80%]">
                                <p className="text-[0.6rem] font-semibold whitespace-nowrap">Revenue, <span className="text-tertiary">{country.unit}</span></p>
                                <MarketDevelopmentChart chartDataObject={country} />
                            </div>

                            <div className="flex flex-col gap-2 w-[20%]">
                                <p className="text-[0.6rem] font-semibold whitespace-nowrap">CAGR, <span className="text-tertiary">%</span></p>
                                <p className="text-[0.6rem] whitespace-nowrap border border-border p-0.5 rounded-md text-center">
                                    {(() => {
                                        const cagr = calculateCAGR(country.data)
                                        return cagr !== null ? `${cagr.toFixed(1)}%` : "n/a"
                                    })()}
                                </p>
                            </div>
                        </div>

                    </div>

                ))}
            </div>

            <Footer metrics={metrics} pageNumber={pageNumber} />
        </div>
    )
}