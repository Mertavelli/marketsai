'use client'
import React from "react"
import Footer from "../slides/Footer";
import Header from "../slides/Header";

export default function ExecutiveSummarySlide({ metrics = {}, pageNumber }) {
    const executiveSummary = metrics?.executive_summary;

    return (
        <div className="slide">
            <Header title={"Executive summary"} />

            <div className="flex-grow py-4 overflow-auto text-[0.6rem] space-y-4">
                {executiveSummary?.key_takeaways?.map((item, index) => (
                    <div key={index}>
                        <p className="font-semibold">{item.takeaway}</p>
                        <ul className="space-y-1 pl-0">
                            {item.supporting_arguments.map((arg, idx) => (
                                <li key={idx} className="relative pl-5 leading-relaxed text-wrap">
                                    <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-black" />
                                    {arg}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {executiveSummary?.final_recommendation && (
                    <p className="font-semibold">{executiveSummary.final_recommendation}</p>
                )}
            </div>

            <Footer metrics={metrics} pageNumber={pageNumber} />
        </div>
    )
}
