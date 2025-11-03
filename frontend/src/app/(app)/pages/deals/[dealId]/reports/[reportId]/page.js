'use client'
import ChooseDealModal from "@/app/components/ChooseDealModal"
import React, { useState, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";
import DropdownReports from "@/app/components/DropdownReports";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useGetReportById, useGetReportsByDealId, useUpdateReport, useGeneratePDF } from "@/app/hooks/api";
import SettingsButton from "@/app/components/SettingsButton";
import ReportsList from "@/app/sections/ReportsList";
import DropdownActions from "@/app/components/DropdownActions";
import { BiSave } from "react-icons/bi";
import { HiExternalLink } from "react-icons/hi";
import DeepReportDocument from "@/app/(pdf)/reports/page";
import { toast } from "sonner"
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

export default function ReportDetails() {
    const { user, token } = useAuthStore()
    const { dealId, reportId } = useParams();
    const { data: reports, reportsIsLoading, reportsError } = useGetReportsByDealId(dealId);
    const { data: report, reportIsLoading, reportError } = useGetReportById(reportId);
    const { mutate: updateReport, updateReportIsPending, updateReportError } = useUpdateReport();
    const {
        mutate: generatePDF,
        isPending,
        isSuccess,
        isError,
        error,
    } = useGeneratePDF();

    if (reportsIsLoading) return <p>Lade Reports...</p>;
    if (reportsError) return <p>Fehler: {reportsError.message}</p>;
    if (reportIsLoading) return <p>Lade Report...</p>;
    if (reportError) return <p>Fehler: {reportError.message}</p>;

    const [metrics, setMetrics] = useState({})

    const [selected, setSelected] = useState(report?.company_overview?.name)

    const [settingsIsOpen, setSettingsIsOpen] = useState(false)

    useEffect(() => {
        if (report) {
            //console.log("report: ", report)
            setMetrics(report);
        }
    }, [report]);

    console.log(metrics)

    const handleDownload = () => {
        if (!token || !dealId || !reportId) {
            console.error("❌ Fehlende Parameter für PDF-Export");
            return;
        }

        console.log("⬇️ PDF Payload:", {
            token,
            dealId,
            reportId,
        });

        generatePDF({
            token,
            dealId,
            reportId,
            user
        });
    };


    const handleSave = () => {
        updateReport({
            reportId: reportId,
            updatedFields: {
                ...metrics
            },
        });

        toast.success("Report saved successfully!")
    }

    const actions = [
        {
            title: "Save",
            icon: <BiSave />,
            onClick: handleSave
        },
        {
            title: "Export PDF",
            icon: <HiExternalLink />,
            onClick: handleDownload
        },
    ]

    return (

        <>
            {isPending && (
                <div className="fixed inset-0 z-50 bg-white/40 backdrop-blur-xs flex items-center justify-center">
                    <Tailspin
                        size="50"
                        stroke="4"
                        speed="0.9"
                        color="#0049FF"
                    />
                </div>
            )}

            <div className="w-full max-w-[91rem] flex flex-col gap-5 h-full">
                <div className="pdf-ignore flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href={"/pages/deals"} className="p-gray hover:text-black transition-all whitespace-nowrap">
                            All Deals
                        </Link>
                        <IoChevronForward size={15} />
                        <Link href={`/pages/deals/${report?.deal?._id}`} className="p-gray hover:text-black transition-all whitespace-nowrap">
                            {report?.deal?.title}
                        </Link>
                        <IoChevronForward size={15} />
                        <div className="w-[10rem]">
                            <DropdownReports options={reports || []} selected={selected} setSelected={setSelected} />
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {/*                         <p className="badge text-black">{"Tech"}</p>
                        <p className="badge text-black">{"1 Member"}</p> */}
                        <DropdownActions options={actions} />
                    </div>
                </div>

                <div className="w-full gap-4 h-full max-h-full rounded-xl border border-border">
                    <DeepReportDocument metrics={metrics} setMetrics={setMetrics} />
                </div>
            </div>
        </>


    )
}