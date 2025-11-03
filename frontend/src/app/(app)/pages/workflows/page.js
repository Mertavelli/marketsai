import RecommendedWorkflows from "@/app/sections/RecommendedWorkflows"
import AllWorkflows from "@/app/sections/AllWorkflows"


export default function Workflows() {
    return (
        <div className="w-full max-w-[91rem] flex flex-col gap-5 h-full">
            <h1 className="heading">Explore Workflows</h1>

            <RecommendedWorkflows />
            <AllWorkflows />

        </div>
    )
}