import Badge from "@/app/components/reports/Badge"
import TeamTable from "@/app/components/reports/TeamTable"
import TextareaAutosize from "react-textarea-autosize";

export default function Team({ metrics, setMetrics }) {

    return (
        <div className="my-4">
            <h1 className="sub-heading-report">Management Team</h1>
            <div className="flex flex-col gap-4">
                <TeamTable metrics={metrics} setMetrics={setMetrics} />
                <div>
                    <Badge>Commentary</Badge>
                    <TextareaAutosize
                        className="rp w-full"
                        value={metrics?.management_team?.comment || ""}
                        onChange={(e) => {
                            setMetrics((prev) => ({
                                ...prev,
                                management_team: {
                                    ...prev.management_team,
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