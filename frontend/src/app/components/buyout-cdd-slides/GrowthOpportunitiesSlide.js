'use client'
import React from "react"
import Header from "../slides/Header"
import Footer from "../slides/Footer"

export default function GrowthOpportunitiesSlide({ metrics = {}, pageNumber }) {
    const growth = metrics?.growth_opportunities || {}
    const cells = [
        { key: 'new_organic' },
        { key: 'new_acquisition' },
        { key: 'existing_organic' },
        { key: 'existing_acquisition' },
    ]

    return (
        <div className="slide">
            <Header title={`Growth opportunities in ${growth.country || 'target country'}`} />

            <div className="flex flex-col items-center justify-center mt-4 absolute top-15 left-15">
                <div className="flex items-center">
                    {/* Y-Achsen-Titel */}
                    <div className="flex flex-col justify-center items-center mr-4" style={{ height: '14.5rem' }}>
                        <h2 className="sub-heading-slide -rotate-90 whitespace-nowrap">Markets</h2>
                    </div>

                    {/* Y-Achsen-Beschriftungen + Matrix */}
                    <div className="grid grid-cols-[auto_auto] grid-rows-2 gap-0">
                        {/* Y-Achsen-Beschriftung */}
                        <div className="flex items-center justify-end pr-2 text-[0.6rem]">New</div>
                        {/* New Row */}
                        <div className="grid grid-cols-2 divide-x divide-y border border-dashed divide-dashed border-border divide-border text-[0.6rem] text-white font-semibold text-center">
                            {['new_organic', 'new_acquisition'].map((key) => (
                                <div
                                    key={key}
                                    className={`min-h-[7rem] min-w-[12rem] flex items-center justify-center ${growth[key] ? 'bg-accent' : ''}`}
                                >
                                    {growth[key] && (
                                        <p className="bg-white text-black sub-heading-slide px-4">{growth.country}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Y-Achsen-Beschriftung */}
                        <div className="flex items-center justify-end pr-2 text-[0.6rem]">Existing</div>
                        {/* Existing Row */}
                        <div className="grid grid-cols-2 divide-x divide-y border border-dashed divide-dashed border-border divide-border text-[0.6rem] text-white font-semibold text-center">
                            {['existing_organic', 'existing_acquisition'].map((key) => (
                                <div
                                    key={key}
                                    className={`min-h-[7rem] min-w-[12rem] flex items-center justify-center ${growth[key] ? 'bg-accent' : ''}`}
                                >
                                    {growth[key] && (
                                        <p className="bg-white text-black sub-heading-slide px-4">{growth.country}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* X-Achsen-Beschriftungen */}
                <div className="ml-25 mt-2 flex flex-col items-center">
                    <div className="flex justify-between w-[24rem] px-2 text-[0.6rem]">
                        <p>Organic</p>
                        <p>Acquisition-based</p>
                    </div>
                    <h2 className="sub-heading-slide mt-1">Growth model</h2>
                </div>
            </div>

            <Footer metrics={metrics} pageNumber={pageNumber} />
        </div>
    )
}
