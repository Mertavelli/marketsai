'use client'
import React, { useState, useEffect } from "react"
import Header from "../slides/Header"
import Footer from "../slides/Footer"
import { ChevronRight } from "lucide-react"

export default function KeyDriversSlide({ metrics = {}, pageNumber }) {
    const keyDrivers = metrics?.key_drivers
    console.log("keyDrivers: ", keyDrivers)
    return (
        <div className="slide">
            <Header title={"Four key drivers ensure high customer traffic"} />
            <div className="flex items-center gap-8">

                <div className="bg-[url('/slides/bg.png')] w-full bg-cover bg-center max-w-[12rem] h-25 px-2 flex justify-center items-center">
                    <h2 className="sub-heading-slide text-white text-center">{keyDrivers.summary}</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {keyDrivers.drivers.map((driver, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <ChevronRight size={30} />
                            <div className="bg-secondary max-w-[10rem] h-15 px-2 flex justify-center items-center w-full">
                                <h2 className="sub-heading-slide text-center">{driver.type}</h2>
                            </div>

                            <ul className="list-disc list-outside pl-4 text-[0.6rem] leading-tight">
                                {driver?.description?.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <Footer metrics={metrics} pageNumber={pageNumber} />
        </div>
    )
}