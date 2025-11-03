import { useParams } from "next/navigation";
import { useGetReportsByDealId, useGetSourcesByDealId } from "@/app/hooks/api";
import { ChevronRight } from "lucide-react";
import { TbWorldWww } from "react-icons/tb";
import Link from "next/link";

export default function FilesList() {
    const { dealId } = useParams();
    const { data: reports } = useGetReportsByDealId(dealId);
    const { data: sources } = useGetSourcesByDealId(dealId);

    const files = [
        ...(reports?.map((r) => ({ ...r, fileType: "report" })) || []),
        ...(sources?.map((s) => ({ ...s, fileType: "source" })) || []),
    ];

    return (
        <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md border border-border h-full">
            <h1 className="sub-heading">Sources</h1>
            {files.map((file, i) => {
                const isReport = file.fileType === "report";
                const website = file?.company_overview?.website || "";
                const cleanedDomain = website.replace(/^https?:\/\//, "").replace(/^www\./, "");

                return (
                    <Link
                        href={isReport ? `/pages/deals/${dealId}/reports/${file._id}` : file.url}
                        key={i}
                        className="border border-border rounded-md bg-white p-2 w-full max-w-xs cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {isReport ? (
                                    <div className="rounded-full overflow-hidden">
                                        <img
                                            src={`https://logo.clearbit.com/${cleanedDomain}`}
                                            alt="Company Logo"
                                            className="w-6 h-6 object-contain"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = "/logo.png";
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <TbWorldWww size={20} />
                                )}

                                <div className="flex flex-col items-start">
                                    <h2 className="text-black font-medium text-sm">
                                        {isReport
                                            ? file?.company_overview?.name
                                            : `${file?.title.slice(0, 20)}...`}
                                    </h2>
                                    <p className="text-xs">
                                        {isReport ? "Investment Memo" : "Web-Source"}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight />
                        </div>
                    </Link>
                );
            })}

        </div>
    );
}
