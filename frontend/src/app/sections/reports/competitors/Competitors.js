import BCGMatrixChart from "@/app/components/reports/BCGMatrixChart"
import Badge from "@/app/components/reports/Badge"
import TextareaAutosize from "react-textarea-autosize";

export default function Competitors({ metrics, setMetrics }) {
    return (
        <div className="h-full my-4">
            <h1 className="sub-heading-report">Competitors</h1>
            <p className="text-black font-medium">BCG Matrix</p>
            <BCGMatrixChart metrics={metrics} setMetrics={setMetrics} />
            <div>
                <Badge>Commentary</Badge>
                <TextareaAutosize
                    className="rp w-full"
                    value={metrics?.competitor_landscape?.comment || ""}
                    onChange={(e) => {
                        setMetrics((prev) => ({
                            ...prev,
                            competitor_landscape: {
                                ...prev.competitor_landscape,
                                comment: e.target.value,
                            },
                        }));
                    }}
                />
            </div>

        </div>
    )
}