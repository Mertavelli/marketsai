'use client'
import React, { useState, useEffect } from "react"
import Header from "../slides/Header"
import Footer from "../slides/Footer"

export default function ProductPortfolioSlide({ metrics = {}, pageNumber }) {
    const productPortfolio = metrics?.product_portfolio

    return (
        <div className="slide">
            <Header title={productPortfolio.title} />
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 w-full">
                    <div className="w-[15%]">
                        <p className="whitespace-nowrap text-[0.6rem]">Value proposition:</p>
                    </div>
                    <div className="w-[85%]">
                        <div className="relative w-full">
                            <div className="absolute inset-0 bg-[url('/slides/bg.png')] bg-cover bg-center scale-x-[-1] z-0" />
                            <div className="relative z-10">
                                <h2 className="sub-heading-slide text-white py-0.5 text-center">“{productPortfolio.value_proposition}”</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <div className="w-[15%]">
                        <div />
                    </div>
                    <div className={`w-[85%] grid gap-1`}
                        style={{ gridTemplateColumns: `repeat(${productPortfolio.pillars.length || 1}, minmax(0, 1fr))` }}
                    >
                        {productPortfolio.pillars.map((pillar, i) => (
                            <div className="flex justify-center" key={i}>
                                <img src={"/slides/pyramide.png"} className="w-20 h-auto" />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <div className="w-[15%]">
                        <p className="whitespace-nowrap text-[0.6rem]">Core element:</p>
                    </div>
                    <div className={`w-[85%] grid gap-1`}
                        style={{ gridTemplateColumns: `repeat(${productPortfolio.pillars.length || 1}, minmax(0, 1fr))` }}
                    >
                        {productPortfolio.pillars.map((pillar, i) => (
                            <div key={i} className="bg-accent p-0.5 flex justify-between items-center">
                                <div className="rounded-full border border-white min-w-5 min-h-5">
                                    <p className="sub-heading-slide text-white text-center">{i + 1}</p>
                                </div>
                                <p className="sub-heading-slide text-white text-center">{pillar.name}</p>
                                <div />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <div className="w-[15%]">
                        <p className="whitespace-nowrap text-[0.6rem]">Products:</p>
                    </div>
                    <div className={`w-[85%] grid gap-1`}
                        style={{ gridTemplateColumns: `repeat(${productPortfolio.pillars.length || 1}, minmax(0, 1fr))` }}
                    >
                        {productPortfolio.pillars.map((pillar, i) => (
                            <div key={i} className="p-1.5 border border-border">
                                <ul className="list-disc list-outside pl-4 text-[0.6rem] leading-tight">
                                    {pillar.products.map((product, j) => (
                                        <li key={j}>{product}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <div className="w-[15%]">
                        <p className="whitespace-nowrap text-[0.6rem]">Price:</p>
                    </div>
                    <div className={`w-[85%] grid gap-1`}
                        style={{ gridTemplateColumns: `repeat(${productPortfolio.pillars.length || 1}, minmax(0, 1fr))` }}
                    >
                        {productPortfolio.pillars.map((pillar, i) => (
                            <div key={i} className="p-1.5 border border-border">
                                <ul className="list-disc list-outside pl-4 text-[0.6rem] leading-tight">
                                    {pillar.price_strategy.map((price, j) => (
                                        <li key={j}>{price}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <Footer metrics={metrics} pageNumber={pageNumber} />
        </div>
    )
}