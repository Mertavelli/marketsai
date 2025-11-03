'use client'

import React, { useState } from "react";
import StartupFilters from "@/app/components/StartupFilters";
import Searchbar from "@/app/components/Searchbar";
import Link from "next/link";
import { FaFacebookSquare, FaLinkedin, FaShareAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import { usePublicCompanies } from "@/app/hooks/user";
import StartupCard from "@/app/components/StartupCard";

export default function Startups() {
    const [filterBy, setFilterBy] = useState('All')
    const [sortBy, setSortBy] = useState('Last modified')

    const { data: companies, isLoading } = usePublicCompanies();
    console.log(companies)

    return (
        <div className="w-full max-w-[91rem] flex flex-col gap-5 h-full mb-[30rem]">
            <h1 className="heading">Explore Startups</h1>

            <div className="w-full flex gap-10">
                <div className="w-[80%]">
                    <div className="flex items-center gap-4">
                        <Searchbar placeholder={"Search Startups"} />
                        <StartupFilters
                            filterBy={filterBy}
                            setFilterBy={setFilterBy}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
                        <button className="font-medium text-sm transition-all p-1.5 rounded-md flex justify-between items-center gap-2 bg-accent hover:bg-accent/90 cursor-pointer text-white">Search</button>
                    </div>

                    <div className="mt-5 flex flex-col gap-6">
                        {isLoading ? (
                            <p className="text-black">Loading startups...</p>
                        ) : (
                            companies?.map((startup, i) => (
                                <StartupCard key={i} startup={startup} />
                            ))
                        )}
                    </div>
                </div>

                <div className="w-[20%] flex flex-col gap-8">

                    <div className="text-black font-medium border border-border rounded-md p-4 py-8">
                        <p>Share this page</p>
                        <div className="flex items-center gap-4 text-tertiary mt-4">
                            <FaFacebookSquare />
                            <FaSquareXTwitter />
                            <FaLinkedin />
                            <FaShareAlt />
                        </div>
                    </div>

                    <div className="border border-border rounded-md p-4 bg-secondary flex flex-col gap-4">
                        <h2 className="text-black font-medium text-xl">Didn't find the startup you were looking for in this list?</h2>
                        <p className="text-sm">Discover thousands of startups on Markets AI — free and fast.</p>

                        <div className="text-black flex flex-col gap-2">
                            <div className="flex items-center">
                                <IoIosCheckmark size={18} />
                                <p>6,948 startups in Deep Tech</p>
                            </div>

                            <div className="flex items-center">
                                <IoIosCheckmark size={18} />
                                <p>50,888 startups in AI & Software</p>
                            </div>

                            <div className="flex items-center">
                                <IoIosCheckmark size={18} />
                                <p>10,222 startups in ClimateTech</p>
                            </div>

                            <div className="flex items-center">
                                <IoIosCheckmark size={18} />
                                <p>18,435 active investors across industries</p>
                            </div>
                        </div>

                        <p className="text-black">& thousands more opportunities to discover your next breakthrough connection.</p>

                        <button className="flex justify-center font-medium text-sm transition-all p-1.5 rounded-md items-center gap-2 bg-accent hover:bg-accent/90 cursor-pointer text-white">
                            <p>Find your next deal</p>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}