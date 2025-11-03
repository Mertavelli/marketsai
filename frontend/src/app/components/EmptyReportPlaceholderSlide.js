import { LuFileSearch } from "react-icons/lu";

export default function EmptyReportPlaceholderSlide() {
    return (
        <div className="aspect-[16/9] w-full max-w-5xl bg-white border border-border rounded-xl p-10 flex flex-col items-center justify-center text-tertiary">
            <LuFileSearch size={60} className="mb-5" />
            <h3 className="text-2xl font-semibold mb-2">No Report Yet</h3>
            <p className="text-center text-md max-w-md">
                To generate a market report, please fill in the company details and click <span className="font-medium">Create Report</span>.
            </p>
        </div>

    );
}
