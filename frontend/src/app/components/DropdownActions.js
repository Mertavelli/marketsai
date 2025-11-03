'use client'
import React, { useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";

function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

export default function DropdownActions({ label, options, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative w-full ${className}`}>
            {label && (
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
            )}

            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(prev => !prev)}
                className="text-sm w-[9rem] font-medium text-black flex justify-between gap-2 items-center cursor-pointer bg-secondary hover:bg-accent/5 rounded-md p-1.5 transition-all"
            >
                {"Actions"}
                <BsThreeDotsVertical size={18} className="text-tertiary" />
            </button>

            {isOpen && (
                <div
                    role="listbox"
                    className="absolute top-full mt-2 w-full border border-secondary bg-white rounded-lg shadow-lg z-20 overflow-hidden"
                >
                    {options.map((option, i) => (
                        <button
                            key={i}
                            role="option"
                            type="button"
                            onClick={option.onClick}
                            className="cursor-pointer w-full text-left flex justify-between items-center whitespace-nowrap px-4 py-2 text-sm text-tertiary hover:bg-accent/5 focus:bg-accent/10 transition-colors"
                        >
                            {option.title}
                            {option.icon && <span className="ml-2">{option.icon}</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
