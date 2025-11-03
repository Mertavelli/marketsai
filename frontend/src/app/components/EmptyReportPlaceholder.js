import { LuFileSearch } from "react-icons/lu";

export default function EmptyReportPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-tertiary bg-white border border-border rounded-xl p-10">
            <LuFileSearch size={60} className="mb-5" />
            <h3 className="text-2xl font-semibold mb-2">No Report Yet</h3>
            <p className="text-center text-md max-w-md">
                To generate a market report, please fill in the company details and click <span className="font-medium">Create Report</span>.
            </p>
        </div>
    );
}
