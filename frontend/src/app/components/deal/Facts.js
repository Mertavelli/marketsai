import React from "react";

export default function Facts() {
    return (

        <div className="relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-md pointer-events-none">
                <span className="text-sm font-semibold text-[#0049FF] uppercase tracking-wide">
                    Entwurf
                </span>
            </div>
            <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md border border-border h-full">
                <h2 className="sub-heading">Investment Rationale & Key Risks</h2>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    {/* Investment Rationale */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-black">Rationale</h3>
                        <ul className="list-disc list-inside space-y-1 marker:text-[#0049FF]">
                            <li>Recurring revenue model with 90%+ retention</li>
                            <li>High-margin B2B software vertical</li>
                            <li>Strong founder-led team with industry expertise</li>
                            <li>Clear expansion potential in DACH & Nordics</li>
                        </ul>
                    </div>

                    {/* Key Risks */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium text-black">Key Risks</h3>
                        <ul className="list-disc list-inside space-y-1 marker:text-[#0049FF]">
                            <li>Customer concentration: Top 3 clients = 52% of revenue</li>
                            <li>No recurring revenue in new market segments</li>
                            <li>Tech stack requires refactoring</li>
                            <li>High dependency on CEO for key deals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
