import React from "react";

export default function DealSummary() {
    return (
        <div className="relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-md pointer-events-none">
                <span className="text-sm font-semibold text-[#0049FF] uppercase tracking-wide">
                    Entwurf
                </span>
            </div>

            {/* Inhalt */}
            <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md border border-border h-full opacity-50 pointer-events-none select-none">
                <h2 className="sub-heading">Deal Summary</h2>
                <div className="grid grid-cols-2 gap-4">

                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Industry</label>
                        <p className="text-black font-medium whitespace-nowrap">Software</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Investment Type</label>
                        <p className="text-black font-medium whitespace-nowrap">Majority Buyout</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Location</label>
                        <p className="text-black font-medium whitespace-nowrap">Berlin, Germany</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Status</label>
                        <p className="text-black font-medium whitespace-nowrap">In Review</p>
                    </div>

                    <div className="col-span-2 border-t border-border my-2" />

                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Ticket Size</label>
                        <p className="heading">€25.000.000</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs whitespace-nowrap">Equity Stake</label>
                        <p className="heading">30%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
