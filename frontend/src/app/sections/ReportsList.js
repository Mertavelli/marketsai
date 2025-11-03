import { LuBriefcaseBusiness } from "react-icons/lu";
import { LuChartLine } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import Button from "../components/Button";
import { PiStarFourFill } from "react-icons/pi";
import { GoLock } from "react-icons/go";
import Link from "next/link";
import { useGetDealById, useGetReportsByDealId } from "@/app/hooks/api";
import { useParams } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import { HiOutlineDocumentReport } from "react-icons/hi";

export default function ReportsList() {
    const { dealId } = useParams();
    const { data: reports, isLoading, error } = useGetReportsByDealId(dealId);

    if (isLoading) return <p>Lade Projekt...</p>;
    if (error) return <p>Fehler: {error.message}</p>;


    return (
        <div>
            <h2 className="sub-heading">All Reports</h2>
            <div className="grid grid-cols-3 gap-4">

                {reports?.map((report, i) => {
                    const website = report?.company_overview?.website || "";
                    const cleanedDomain = website.replace(/^https?:\/\//, "").replace(/^www\./, "");

                    return (
                        <div key={i} className="card flex flex-col gap-2 p-4">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full overflow-hidden">
                                    <img
                                        src={`https://logo.clearbit.com/${cleanedDomain}`}
                                        alt="Company Logo"
                                        className="w-15 h-auto"
                                    />
                                </div>

                                <div>
                                    <h1 className="card-heading text-black whitespace-nowrap">
                                        {report.company_overview.name}
                                    </h1>
                                    <div className="flex gap-1">
                                        <p className="badge text-xs text-black">{"Investment Memo"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <p className="text-sm">{report.executive_summary.slice(0, 40)}...</p>

                                <Link
                                    href={`/pages/deals/${dealId}/reports/${report._id}`}
                                    className="bg-accent text-white py-1.5 px-4 text-center rounded-md cursor-pointer hover:bg-accent/90 text-sm"
                                >
                                    Open
                                </Link>
                            </div>
                        </div>
                    );
                })}


            </div>
        </div>
    )
}