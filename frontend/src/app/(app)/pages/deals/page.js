'use client'
import React, { use, useState } from "react";
import AllDeals from "@/app/sections/AllDeals"
import { IoMdAdd } from "react-icons/io";
import CreateDealModal from "@/app/components/CreateDealModal";
import DealFilters from "@/app/components/DealFilters";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { useGetDealsOfUser } from "@/app/hooks/api";

export default function Deals() {
    const { user } = useAuthStore();
    if (!user?.id) return null;
    const [createDealIsOpen, setCreateDealIsOpen] = useState(false)
    const [filterBy, setFilterBy] = useState('All')
    const [sortBy, setSortBy] = useState('Last modified')
    const { data: deals, isLoading, error } = useGetDealsOfUser(
        user.id,
        filterBy,
        sortBy
    )

    return (
        <div className="w-full max-w-[91rem] flex flex-col gap-5 h-[65rem]">
            <h1 className="heading">Your Deals</h1>

            <div className="flex justify-end items-center">

                <div className="flex items-center gap-2">
                    <DealFilters
                        filterBy={filterBy}
                        setFilterBy={setFilterBy}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <button
                        onClick={() => setCreateDealIsOpen(true)}
                        className={"font-medium text-sm transition-all p-1.5 rounded-md flex justify-between items-center gap-2 bg-accent hover:bg-accent/90 cursor-pointer text-white"}>
                        {"Create"}
                        <IoMdAdd size={20} className={"text-white"} />
                    </button>
                </div>
            </div>

            <AllDeals deals={deals} />

            {createDealIsOpen && (
                <CreateDealModal
                    createDealIsOpen={createDealIsOpen}
                    setCreateDealIsOpen={setCreateDealIsOpen}
                />
            )}
        </div>
    )
}