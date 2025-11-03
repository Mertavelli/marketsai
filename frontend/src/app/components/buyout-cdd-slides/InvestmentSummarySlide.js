'use client'
import React from "react"
import Footer from "../slides/Footer"
import Header from "../slides/Header"

export default function InvestmentSummarySlide({ metrics = {}, pageNumber }) {
    const investmentCase = metrics?.investment_case
    const strengths = investmentCase?.strengths || []
    const opportunities = investmentCase?.opportunities || []

    return (
        <div className="slide">
            <Header title={investmentCase?.summary} prefix="Summary" />

            <div className="flex flex-col">

                {/* Background + Headline */}
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-[url('/slides/bg.png')] bg-cover bg-center scale-x-[-1] z-0" />
                    <div className="relative z-10">
                        <h2 className="sub-heading-slide text-white py-0.5 pl-2">
                            {metrics?.company_profile?.company_name_presentation} has several obvious strongholds
                        </h2>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-2 border border-border text-[0.6rem] p-2">

                    {/* LEFT COLUMN: Strengths */}
                    <div>
                        <h3 className="font-semibold mb-1">
                            {metrics?.company_profile?.company_name_presentation} is an attractive takeover candidate because…
                        </h3>

                        {strengths.length > 0 && (
                            <ul className="list-disc list-outside pl-8">
                                {strengths.map((item, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                        <p className="inline">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Opportunities */}
                    <div>
                        <h3 className="font-semibold mb-1">
                            Opportunities for improvements via vertical integration
                        </h3>

                        {opportunities.length > 0 && (
                            <ul className="list-disc list-outside pl-8">
                                {opportunities.map((item, idx) => (
                                    <li key={idx} className="leading-relaxed">
                                        <p className="inline">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>

                <Footer metrics={metrics} pageNumber={pageNumber} />
            </div>
        </div>
    )
}
