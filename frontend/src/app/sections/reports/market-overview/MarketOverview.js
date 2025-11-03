'use client'
import MarketSizeChart from "@/app/components/reports/MarketSizeChart";
import Badge from "@/app/components/reports/Badge";
import MarketGrowthChart from "@/app/components/reports/MarketGrowthChart";
import TextareaAutosize from "react-textarea-autosize";

export default function MarketOverview({ metrics, setMetrics }) {
    return (
        <div className="">
            <h1 className="sub-heading-report">Market Overview</h1>

            {/* Row 1: Size */}
            <div className="grid grid-cols-2 gap-4 items-start">

                <div className="min-w-[260px] max-w-[480px] h-full">
                    <p className="text-black font-medium">Size</p>
                    <MarketSizeChart metrics={metrics} />
                </div>

                <div className="min-w-[260px] max-w-[480px] h-full">
                    <Badge>Commentary</Badge>
                    <TextareaAutosize
                        className="rp w-full"
                        value={metrics?.market_size?.comment || ""}
                        onChange={(e) => {
                            setMetrics((prev) => ({
                                ...prev,
                                market_size: {
                                    ...prev.market_size,
                                    comment: e.target.value,
                                },
                            }));
                        }}
                    />
                </div>
            </div>

            {/* Spacing between rows */}
            <div className="h-6" />

            {/* Row 2: Growth */}
            <div className="grid grid-cols-2 gap-4 items-start">

                <div className="min-w-[260px] max-w-[480px] h-full">
                    <p className="text-black font-medium">Growth</p>
                    <MarketGrowthChart metrics={metrics} report={true} />
                </div>

                <div className="min-w-[260px] max-w-[480px] h-full">
                    <Badge>Commentary</Badge>
                    <TextareaAutosize
                        className="rp w-full"
                        value={metrics?.market_growth?.comment || ""}
                        onChange={(e) => {
                            setMetrics((prev) => ({
                                ...prev,
                                market_growth: {
                                    ...prev.market_growth,
                                    comment: e.target.value,
                                },
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
