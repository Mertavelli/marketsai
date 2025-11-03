'use client'
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Multiselect({ options = [], placeholder = "Select industries", onChange, defaultSelection }) {
    const [selectedOptions, setSelectedOptions] = useState(defaultSelection || []);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option) => {
        const updated = selectedOptions.includes(option)
            ? selectedOptions.filter((item) => item !== option)
            : [...selectedOptions, option];

        setSelectedOptions(updated);
        if (onChange) onChange(updated);
    };

    return (
        <div className="relative w-full cursor-pointer" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border rounded-md p-3 border-border bg-white text-left relative cursor-pointer"
            >
                {selectedOptions.length > 0 ? selectedOptions.join(", ") : placeholder}
                {/* Chevron-Icon */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    <FiChevronDown />
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full max-h-60 overflow-auto border border-border rounded-md bg-white shadow-md">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`px-4 py-2 cursor-pointer hover:bg-accent/10 ${selectedOptions.includes(option) ? "font-medium text-accent" : ""
                                }`}
                            onClick={() => toggleOption(option)}
                        >
                            {selectedOptions.includes(option) ? "✓ " : ""}
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
