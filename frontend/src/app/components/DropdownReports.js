'use client'
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineSelector } from "react-icons/hi";

export default function DropdownReports({ options, selected, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelected(option.title);
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col gap-2 relative w-[9rem]`}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="text-sm font-medium text-black flex justify-between gap-2 items-center cursor-pointer bg-secondary hover:bg-accent/5 rounded-md p-1.5 transition-all w-full"
            >
                <p className="truncate max-w-[7rem]">
                    {selected || options[0]?.company_overview?.name}
                </p>
                <HiOutlineSelector size={20} className="text-tertiary shrink-0" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-full border border-secondary bg-white rounded-lg shadow-md z-10">
                    {options?.map((option, i) =>
                        <Link
                            key={option?._id}
                            href={`/pages/deals/${option?.deal?._id}/reports/${option?._id}`}
                            onClick={() => handleSelect(option)}
                        >
                            <p className="p-black text-sm w-full text-left px-4 py-2 hover:bg-accent/5 transition-colors cursor-pointer whitespace-nowrap">
                                {option?.company_overview?.name?.length > 15
                                    ? option.company_overview.name.slice(0, 15) + "..."
                                    : option.company_overview?.name}

                            </p>
                        </Link>
                    )}

                </div>
            )}
        </div>
    );
}
