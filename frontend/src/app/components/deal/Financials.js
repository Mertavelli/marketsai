import React, { useState } from "react";

export default function Financials() {
    return (
        <div className="relative h-full">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-md pointer-events-none">
                <span className="text-sm font-semibold text-[#0049FF] uppercase tracking-wide">
                    Entwurf
                </span>
            </div>
            <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md border border-border h-full">
                <h2 className="sub-heading">Financials</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Revenue</label>
                        <p className="text-black font-medium whitespace-nowrap">$150,000,000</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Bewertung</label>
                        <p className="text-black font-medium whitespace-nowrap">$600,000,000</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">EBITDA</label>
                        <p className="text-black font-medium whitespace-nowrap">$30,000,000</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">EBITDA-Marge</label>
                        <p className="text-black font-medium whitespace-nowrap">20%</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Mitarbeiterzahl</label>
                        <p className="text-black font-medium whitespace-nowrap">480</p>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Umsatz pro Mitarbeiter</label>
                        <p className="text-black font-medium whitespace-nowrap">$312,500</p>
                    </div>
                </div>

            </div>
        </div>

    )
}
