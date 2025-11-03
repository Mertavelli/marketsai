'use client'
import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import { PiStarFourFill } from "react-icons/pi";
import { GoLock } from "react-icons/go";
import Link from "next/link";
import { workflows } from "../mockData";

function slugify(text) {
    return text
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

export default function AllWorkflows() {
    const workflowsList = workflows(80)
    const [searchTerm, setSearchTerm] = useState("")

    const filterWorkflows = (category) =>
        workflowsList.filter(
            (workflow) =>
                workflow.category === category &&
                (
                    workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
        );

    const renderWorkflows = (list) => (
        <div className="grid grid-cols-3 gap-4">
            {list.map((workflow) =>
                workflow.badges.locked ? (
                    <div key={workflow.title} className="bg-white border border-border rounded-md p-4 cursor-not-allowed text-start opacity-60">
                        <div className="bg-accent/5 text-accent flex justify-center py-4 rounded-md mb-4">
                            {workflow.icon}
                        </div>
                        <div className="flex flex-col justify-between h-[9rem]">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-black text-lg font-medium">{workflow.title}</h2>
                                <p className="text-xs">{workflow.description}</p>
                            </div>
                            <div className="flex gap-1 text-black text-sm">
                                {workflow.badges.new && (
                                    <div className="badge text-accent flex items-center gap-1">
                                        <PiStarFourFill />
                                        <p>New</p>
                                    </div>
                                )}
                                <div className="badge text-accent flex items-center justify-center">
                                    <GoLock />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link key={workflow.title} href={`/pages/workflows/${slugify(workflow.title)}`} className="bg-white border border-border rounded-md p-4 cursor-pointer text-start">
                        <div className="bg-accent/5 text-accent flex justify-center py-4 rounded-md mb-4">
                            {workflow.icon}
                        </div>
                        <div className="flex flex-col justify-between h-[9rem]">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-black text-lg font-medium">{workflow.title}</h2>
                                <p className="text-xs">{workflow.description}</p>
                            </div>
                            <div className="flex gap-1 text-black text-sm">
                                <p className="badge">{workflow.badges.target}</p>
                                <p className="badge">{workflow.badges.focus}</p>
                                {workflow.badges.new && (
                                    <div className="badge text-accent flex items-center gap-1">
                                        <PiStarFourFill />
                                        <p>New</p>
                                    </div>
                                )}
                                {workflow.badges.locked && (
                                    <div className="badge text-accent flex items-center justify-center">
                                        <GoLock />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    )

    const cddWorkflows = filterWorkflows("CDD");
    const identificationWorkflows = filterWorkflows("Identification");

    return (
        <div className="flex flex-col h-full">
            <h2 className="sub-heading">All Workflows</h2>
            <div className="border-b border-border w-full mb-8 mt-3" />

            <Searchbar value={searchTerm} onChange={setSearchTerm} placeholder={"Search your workflows"} />

            {cddWorkflows.length > 0 && (
                <div className="bg-secondary w-full py-5 px-10 flex flex-col gap-4 mt-5 rounded-md">
                    <h2 className="sub-heading">Commercial Due Diligence</h2>
                    {renderWorkflows(cddWorkflows)}
                </div>
            )}

            {identificationWorkflows.length > 0 && (
                <div className="bg-secondary w-full py-5 px-10 flex flex-col gap-4 mt-10 rounded-md">
                    <h2 className="sub-heading">Target Identification</h2>
                    {renderWorkflows(identificationWorkflows)}
                </div>
            )}

        </div>
    )
}
