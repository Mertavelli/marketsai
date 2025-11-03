import { LuBriefcaseBusiness } from "react-icons/lu";
import { LuChartLine } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import Button from "../components/Button";
import { PiStarFourFill } from "react-icons/pi";
import { GoLock } from "react-icons/go";
import Link from "next/link";
import { workflows } from "../mockData";

function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")      // Leerzeichen → Bindestrich
        .replace(/[^\w\-]+/g, "")  // Sonderzeichen entfernen
        .replace(/\-\-+/g, "-");   // Doppelte Bindestriche → Einfach
}

export default function RecommendedWorkflows() {
    const workflowsList = workflows(25)
    return (
        <div>
            <h2 className="sub-heading">Recommended Workflows</h2>
            <div className="grid grid-cols-3 gap-4">

                {workflowsList.map((workflow, i) => (
                    <div key={i} className="card flex flex-col gap-2 p-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-accent/5 rounded-full p-5 w-min flex flex-justify-center text-accent">
                                {workflow.icon}
                            </div>

                            <div>
                                <h1 className="card-heading text-black">{workflow.title}</h1>
                                <div className="flex gap-1">
                                    {!workflow.badges.locked && (
                                        <>
                                            <p className="badge text-xs text-black">{workflow.badges.target}</p>
                                            <p className="badge text-xs text-black">{workflow.badges.focus}</p>
                                        </>
                                    )}
                                    {workflow.badges.new && (
                                        <div className="badge text-accent flex items-center gap-1">
                                            <PiStarFourFill />
                                            <p>New</p>
                                        </div>

                                    )}
                                    {workflow.badges.locked && (
                                        <div className="badge text-accent flex items-center justify-center">
                                            <GoLock />
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <p>{workflow.info}</p>
                            {workflow.badges.locked ? (
                                <span className="bg-gray-300 text-white py-1.5 px-4 text-center rounded-md cursor-not-allowed text-sm">
                                    Coming Soon
                                </span>
                            ) : (
                                <Link
                                    href={`/pages/workflows/${slugify(workflow.title)}`}
                                    className="bg-accent text-white py-1.5 px-4 text-center rounded-md cursor-pointer hover:bg-accent/90 text-sm"
                                >
                                    Start
                                </Link>
                            )}

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}