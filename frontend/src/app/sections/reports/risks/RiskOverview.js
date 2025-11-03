import Badge from "@/app/components/reports/Badge"
import RiskRadarChart from "@/app/components/reports/RiskRadarChart"
import TextareaAutosize from "react-textarea-autosize";

export default function RiskOverview({ metrics, setMetrics }) {
    return (
        <div className="my-4">
            <h1 className="sub-heading-report">Risks</h1>
            <div className="grid grid-cols-2 gap-4">
                <RiskRadarChart metrics={metrics} />
                <div>
                    <Badge>Commentary</Badge>
                    <TextareaAutosize
                        className="rp w-full"
                        value={metrics?.risks?.comment || ""}
                        onChange={(e) => {
                            setMetrics((prev) => ({
                                ...prev,
                                risks: {
                                    ...prev.risks,
                                    comment: e.target.value,
                                },
                            }));
                        }}
                    />

                </div>
            </div>

        </div>
    )
}