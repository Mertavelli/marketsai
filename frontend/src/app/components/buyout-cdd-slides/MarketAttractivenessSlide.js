'use client'
import React from "react"
import Header from "../slides/Header"
import Footer from "../slides/Footer"
import MarketAttractivenessChart from "../slides/MarketAttractivenessChart"

export default function MarketAttractivenessSlide({ metrics = {}, pageNumber }) {
    const countries = metrics?.market_entry?.evaluated_markets || []
    const company_name = metrics?.company_profile?.company_name_presentation

    return (
        <div className="slide">
            <Header title={metrics?.market_entry?.title} />

            <div className="flex justify-end gap-2 mb-4">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <p className="text-[0.6rem]">Future {company_name} focus</p>
                </div>

                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <p className="text-[0.6rem]">Possible {company_name} focus</p>
                </div>

                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <p className="text-[0.6rem]">Current {company_name} focus</p>
                </div>

            </div>

            <div className="flex items-start gap-5 h-full w-full">
                <div className="w-[55%]">
                    <MarketAttractivenessChart countries={countries} />
                </div>

                <div className="flex flex-col gap-2 pt-2 w-[45%]">
                    <div>
                        <div className="bg-[url('/slides/bg.png')] w-full bg-cover bg-center">
                            <h2 className="sub-heading-slide text-white text-center whitespace-nowrap">Current and future potential markets</h2>
                        </div>
                        <div className="border border-border text-[0.6rem] py-1 px-2">
                            <p>Future markets included should be based on:</p>
                            <ul className="list-disc list-inside text-[0.6rem]">
                                <li>{metrics?.market_entry?.future_markets_comment}</li>
                            </ul>

                            <p>Future objective for {company_name} can accordingly be: </p>
                            <ul className="list-disc list-inside text-[0.6rem] grid grid-cols-2">
                                {countries
                                    .filter((country) => country.focus === "future")
                                    .map((country, i) => (
                                        <li key={i}>{country.country}</li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="bg-[url('/slides/bg.png')] w-full bg-cover bg-center">
                            <h2 className="sub-heading-slide text-white text-center whitespace-nowrap">Not included / no potential</h2>
                        </div>
                        <div className="border border-border text-[0.6rem] py-1 px-2">
                            <ul className="list-disc list-inside text-[0.6rem]">
                                <li>
                                    {countries
                                        .filter((country) => country.focus === "no_potential")
                                        .map((country) => country.country)
                                        .join(', ')}
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className="text-[0.6rem] bg-secondary flex gap-1 py-4 px-2 leading-tight">
                        <p className="font-semibold">Note:</p>
                        <p>The analysis is inspiration for further research. Deeper research of each market is needed to draw market entry conclusions.</p>
                    </div>

                </div>
            </div>

            <Footer metrics={metrics} pageNumber={pageNumber} />
        </div>
    )
}
