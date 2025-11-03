'use client'
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineSelector } from "react-icons/hi";

function slugify(text) {
    return text
        .trim()
        .replace(/\s+/g, "-")      // Leerzeichen → Bindestrich
        .replace(/[^\w\-]+/g, "")  // Sonderzeichen entfernen
        .replace(/\-\-+/g, "-");   // Doppelte Bindestriche → Einfach
}

export default function Dropdown({ label, options, className, selected, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelected(option.title);
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col gap-2 w-[9rem] relative ${className}`}>
            {label && (
                <label>{label}</label>
            )}

            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="text-sm font-medium text-black flex justify-between gap-2 items-center cursor-pointer bg-secondary hover:bg-accent/5 rounded-md p-1.5 transition-all">
                {selected || options[0].title}
                <HiOutlineSelector size={20} className="text-tertiary" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-full border border-secondary bg-white rounded-lg shadow-md z-10">
                    {options.map((option, i) =>
                        option.badges?.locked ? (
                            <div
                                key={option.title}
                                className="p-black text-sm w-full text-left px-4 py-2 opacity-50 cursor-not-allowed whitespace-nowrap"
                            >
                                {option.title.length > 15 ? option.title.slice(0, 15) + "..." : option.title}
                            </div>
                        ) : (
                            <Link
                                key={option.title}
                                href={`/pages/workflows/${slugify(option.title)}`}
                                onClick={() => handleSelect(option)}
                            >
                                <p className="p-black text-sm w-full text-left px-4 py-2 hover:bg-accent/5 transition-colors cursor-pointer whitespace-nowrap">
                                    {option.title.length > 15 ? option.title.slice(0, 15) + "..." : option.title}
                                </p>

                            </Link>
                        )
                    )}

                </div>
            )}
        </div>
    );
}
