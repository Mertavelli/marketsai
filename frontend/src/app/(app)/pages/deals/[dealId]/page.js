'use client'
import ChooseDealModal from "@/app/components/ChooseDealModal"
import React, { useState, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";
import DropdownDeals from "@/app/components/DropdownDeals";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useGetDealById, useGetDealsOfUser } from "@/app/hooks/api";
import SettingsButton from "@/app/components/SettingsButton";
import FilesList from "@/app/components/deal/FilesList";
import DealSummary from "@/app/components/deal/DealSummary";
import Financials from "@/app/components/deal/Financials";
import ExitSzenarios from "@/app/components/deal/ExitSzenarios";
import Facts
    from "@/app/components/deal/Facts";
import Activity from "@/app/components/deal/Activity";
import DealSettingsModal from "@/app/components/DealSettingsModal";

export default function DealDetails() {
    const params = useParams();
    const { user } = useAuthStore();
    const { dealId } = useParams();
    const { data: deals, dealsIsLoading, dealsError } = useGetDealsOfUser(user.id);
    const { data: deal, dealIsLoading, dealError } = useGetDealById(dealId);

    if (dealsIsLoading) return <p>Lade Projekte...</p>;
    if (dealsError) return <p>Fehler: {dealsError.message}</p>;
    if (dealIsLoading) return <p>Lade Deal...</p>;
    if (dealError) return <p>Fehler: {dealError.message}</p>;

    const [selected, setSelected] = useState(deal?.title)
    const [settingsIsOpen, setSettingsIsOpen] = useState(false)

    return (
        <>
            <div className="w-full max-w-[91rem] flex flex-col gap-5 h-[65rem]">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href={"/pages/deals"} className="p-gray hover:text-black transition-all whitespace-nowrap">
                            All Deals
                        </Link>
                        <IoChevronForward size={15} />
                        <div className="w-[12rem]">
                            <DropdownDeals options={deals || []} selected={selected} setSelected={setSelected} />
                        </div>

                    </div>

                    <div className="flex items-center gap-1">
                        <SettingsButton onClick={() => setSettingsIsOpen(true)} />
                    </div>
                </div>

                <h1 className="heading">{deal?.title}</h1>

                {/* Content */}
                <div className="w-full h-full flex flex-col gap-4">

                    <div className="flex gap-4 w-full">

                        <div className="w-[40%]">
                            <DealSummary />
                        </div>


                        <div className="w-[30%]">
                            <Financials />
                        </div>

                        <div className="w-[30%]">
                            <ExitSzenarios />
                        </div>

                    </div>

                    <div className="flex gap-4 w-full">

                        <div className="w-[25%]">
                            <FilesList />
                        </div>

                        <div className="w-[45%]">
                            <Facts />
                        </div>

                        <div className="w-[30%]">
                            <Activity />
                        </div>

                    </div>

                </div>
            </div>

            {settingsIsOpen && <DealSettingsModal settingsIsOpen={settingsIsOpen} setSettingsIsOpen={setSettingsIsOpen} />}
        </>
    )
}