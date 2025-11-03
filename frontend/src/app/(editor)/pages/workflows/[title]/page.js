'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { IoChevronForward } from "react-icons/io5";
import { PiStarFourFill } from "react-icons/pi";
import { BiSave } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import Dropdown from "@/app/components/Dropdown";
import Chat from "@/app/components/Chat";
import EmptyReportPlaceholder from "@/app/components/EmptyReportPlaceholder";
import EmptyReportPlaceholderSlide from "@/app/components/EmptyReportPlaceholderSlide";
import SkeletonLoader from "@/app/components/SkeletonLoader";
import SkeletonLoaderSlide from "@/app/components/SkeletonLoaderSlide";
import DeepReportDocument from "@/app/(pdf)/reports/page";
import DeepReportSlides from "@/app/(pdf)/slides/page";
import ChooseDealModal from "@/app/components/ChooseDealModal";
import CreateDealModal from "@/app/components/CreateDealModal";

import CoverSlide from "@/app/components/buyout-cdd-slides/CoverSlide";
import ExecutiveSummarySlide from "@/app/components/buyout-cdd-slides/ExecutiveSummarySlide";
import InvestmentSummarySlide from "@/app/components/buyout-cdd-slides/InvestmentSummarySlide";
import MarketGrowthSlide from "@/app/components/buyout-cdd-slides/MarketGrowthSlide";
import MarketTrendsSlide from "@/app/components/buyout-cdd-slides/MarketTrendsSlide";
import ProductPortfolioSlide from "@/app/components/buyout-cdd-slides/ProductPortfolioSlide";
import KeyDriversSlide from "@/app/components/buyout-cdd-slides/KeyDriversSlide";
import GrowthOpportunitiesSlide from "@/app/components/buyout-cdd-slides/GrowthOpportunitiesSlide";
import MarketAttractivenessSlide from "@/app/components/buyout-cdd-slides/MarketAttractivenessSlide";

import { workflows, buyout_cdd_data } from "@/app/mockData";
import { slugify, unslugify } from "@/app/helpers"
import { useGeneratePDF, useSendChat, useCreateAnalysis } from "@/app/hooks/api";

export default function ChatPreviewLayout() {
    const [index, setIndex] = useState(0);
    const { title } = useParams();
    const formattedTitle = unslugify(title);
    const [selected, setSelected] = useState(formattedTitle);

    const workflowsList = workflows(25);
    const selectedWorkflow = workflowsList.find(w => slugify(w.title) === title) || workflowsList[0];

    const [metrics, setMetrics] = useState({});
    const [chooseDealIsOpen, setChooseDealIsOpen] = useState(false);
    const [createDealIsOpen, setCreateDealIsOpen] = useState(false);

    const { mutate: sendChat, isPending, error, data: responseData } = useSendChat();
    const { mutate: createMarketAnalysis, isPending: isPendingAnalysis, error: errorAnalysis, data: analysisData } = useCreateAnalysis();

    useEffect(() => {
        if (analysisData) {
            setMetrics(analysisData);
            toast.success("Investment Memo successfully generated.");
        }
    }, [analysisData]);

    const slides = [
        <CoverSlide key="0" metrics={metrics} pageNumber={index + 1} />, <ExecutiveSummarySlide key="1" metrics={metrics} pageNumber={index + 1} />, <InvestmentSummarySlide key="2" metrics={metrics} pageNumber={index + 1} />,
        <MarketGrowthSlide key="3" metrics={metrics} pageNumber={index + 1} />, <MarketTrendsSlide key="4" metrics={metrics} pageNumber={index + 1} />, <ProductPortfolioSlide key="5" metrics={metrics} pageNumber={index + 1} />,
        <KeyDriversSlide key="6" metrics={metrics} pageNumber={index + 1} />, <GrowthOpportunitiesSlide key="7" metrics={metrics} pageNumber={index + 1} />, <MarketAttractivenessSlide key="8" metrics={metrics} pageNumber={index + 1} />
    ];

    const handleSave = () => analysisData && setChooseDealIsOpen(true);
    const handlePrev = () => analysisData && index > 0 && setIndex(index - 1);
    const handleNext = () => analysisData && index < slides.length - 1 && setIndex(index + 1);

    return (
        <>
            <div className="w-full max-w-[91rem] flex flex-col gap-5 h-full max-h-[80vh]">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/pages/workflows" className="p-gray hover:text-black transition-all">All Workflows</Link>
                        <IoChevronForward size={15} />
                        <Dropdown options={workflowsList} selected={selected} setSelected={setSelected} />
                    </div>

                    <div className="flex items-center gap-1">
                        <p className="badge text-black">{selectedWorkflow?.badges.target}</p>
                        <p className="badge text-black">{selectedWorkflow?.badges.focus}</p>
                        {selectedWorkflow?.badges?.new && <div className="badge text-accent flex items-center gap-1"><PiStarFourFill /><p>New</p></div>}
                        <button onClick={handleSave} disabled={!analysisData} className={`font-medium text-sm transition-all p-1.5 rounded-md flex justify-between items-center gap-2 ${analysisData ? "bg-accent hover:bg-accent/90 cursor-pointer text-white" : "bg-secondary text-black cursor-not-allowed"}`}>
                            Save
                            <BiSave className={analysisData ? "text-white" : "text-black"} />
                        </button>
                    </div>
                </div>

                <div className="flex items-start w-full gap-4 h-full max-h-full">
                    <div className="flex-[0.4] h-full">
                        <Chat {...{ sendChat, responseData, isPending, createMarketAnalysis, isPendingAnalysis, analysisData, error, errorAnalysis, chooseDealIsOpen, setChooseDealIsOpen, createDealIsOpen, setCreateDealIsOpen, onMetricsChange: setMetrics }} />
                    </div>

                    {title === "Startup-CDD" && (
                        <div className="flex-[0.6] h-full overflow-hidden">
                            {!analysisData && !isPendingAnalysis && <EmptyReportPlaceholder />}
                            {isPendingAnalysis && <SkeletonLoader />}
                            {analysisData && <div className="h-full border border-border rounded-xl overflow-y-auto"><DeepReportDocument metrics={metrics} setMetrics={setMetrics} /></div>}
                        </div>
                    )}

                    {title === "Buyout-CDD" && (
                        <div className="flex-[0.6] h-min flex flex-col gap-4 overflow-hidden">
                            {!analysisData && !isPendingAnalysis && <EmptyReportPlaceholderSlide />}
                            {isPendingAnalysis && <SkeletonLoaderSlide />}
                            {analysisData && <DeepReportSlides {...{ metrics, setMetrics, slideIndex: index, slides }} />}
                            <div className="flex items-center justify-center gap-2">
                                <button onClick={handlePrev} className="border border-border p-2 rounded-md hover:cursor-pointer hover:bg-secondary transition-all"><FaChevronLeft size={15} /></button>
                                <p>{index + 1}</p>
                                <button onClick={handleNext} className="border border-border p-2 rounded-md hover:cursor-pointer hover:bg-secondary transition-all"><FaChevronRight size={15} /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {chooseDealIsOpen && <ChooseDealModal {...{ chooseDealIsOpen, setChooseDealIsOpen, createDealIsOpen, setCreateDealIsOpen, metrics }} />}
            {createDealIsOpen && <CreateDealModal {...{ chooseDealIsOpen, setChooseDealIsOpen, createDealIsOpen, setCreateDealIsOpen, analysisData, isEditor: true }} />}
        </>
    );
}
