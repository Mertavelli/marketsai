import TextareaAutosize from "react-textarea-autosize";

export default function ExecutiveSummary({ metrics, setMetrics }) {
    return (
        <div className="border-b border-border pb-4">
            <h1 className="sub-heading-report">Executive Summary</h1>
            <TextareaAutosize
                className="rp w-full"
                value={metrics?.executive_summary || ""}
                onChange={(e) => {
                    setMetrics((prev) => ({
                        ...prev,
                        executive_summary: e.target.value,
                    }));
                }}
            />
        </div>
    );
}
