'use client'
import React, { useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";

export default function DropdownForm({ label, options, className = "", selected, setSelected, required = true }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col gap-2 relative w-full min-w-[9rem] ${className}`}>
            {label && (
                <label className="text-black">
                    {label}
                    <span className="text-red-500 text-sm ml-1">{required ? "*" : ""}</span>
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="text-black flex justify-between gap-2 items-center cursor-pointer border border-border p-3 hover:bg-accent/5 rounded-md transition-all w-full"
            >
                {selected || options[0]}
                <HiOutlineSelector size={20} className="text-tertiary" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 w-full border border-secondary bg-white rounded-lg shadow-md z-10 flex flex-col max-h-40 overflow-y-auto">
                    {options.map((option, i) => (
                        <button
                            type="button"
                            key={i}
                            onClick={() => handleSelect(option)}
                            className="text-black text-sm text-left px-4 py-2 hover:bg-accent/5 transition-colors cursor-pointer w-full"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
