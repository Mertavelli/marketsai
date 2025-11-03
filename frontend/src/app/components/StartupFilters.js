'use client'

import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'

const filterOptions = ["All"] /* ['All', 'Active', 'Closed', 'Draft'] */
const sortOptions = ['Last modified', 'Alphabetical', 'Newest first', 'Oldest first']

export default function StartupFilters({ filterBy, setFilterBy, sortBy, setSortBy }) {
    const [openFilter, setOpenFilter] = useState(false)
    const [openSort, setOpenSort] = useState(false)

    return (
        <div className="flex justify-end items-center relative">
            <div className="flex items-center gap-4 w-full">
                {/* Filter Dropdown */}
                <div className="relative w-full">
                    <button
                        onClick={() => {
                            setOpenFilter(!openFilter)
                            setOpenSort(false)
                        }}
                        className="p-gray hover:text-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                        {filterBy}
                        <IoChevronDown size={15} />
                    </button>
                    {openFilter && (
                        <div className="absolute right-0 mt-2 w-40 rounded-md border border-border bg-white shadow-md z-20">
                            {filterOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setFilterBy(option)
                                        setOpenFilter(false)
                                    }}
                                    className={`whitespace-nowrap w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${option === filterBy ? 'text-[#0049FF] font-medium' : 'text-gray-700'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full">
                    <button
                        onClick={() => {
                            setOpenSort(!openSort)
                            setOpenFilter(false)
                        }}
                        className="p-gray hover:text-black transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                        {sortBy}
                        <IoChevronDown size={15} />
                    </button>
                    {openSort && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-white shadow-md z-20">
                            {sortOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setSortBy(option)
                                        setOpenSort(false)
                                    }}
                                    className={`whitespace-nowrap w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${option === sortBy ? 'text-[#0049FF] font-medium' : 'text-gray-700'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
