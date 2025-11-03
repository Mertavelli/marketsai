'use client'
import React, { useState, useEffect } from "react";

function formatWithCommas(value) {
    if (value === 0 || value === "0") return value
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeNonDigits(value) {
    return value.replace(/\D/g, "");
}

export default function Header({ metrics, setMetrics }) {
    const { company_overview, financials } = metrics || {}
    const { revenue_last_year, profit_last_year, employees } = financials || {}
    console.log(revenue_last_year?.origin_value)
    const [domain, setDomain] = useState("")

    useEffect(() => {
        if (company_overview?.website && typeof company_overview?.website === 'string') {
            const website = company_overview?.website.trim();
            if (website.length > 0 && website.includes('.')) {
                try {
                    const url = new URL(website.startsWith('http') ? website : `https://${website}`);
                    const hostname = url.hostname;
                    const domainParts = hostname.split('.');

                    const newDomain = domainParts[0] === 'www'
                        ? domainParts.slice(1).join('.')
                        : hostname;

                    setDomain(newDomain);
                } catch (err) {
                    console.error('Invalid URL:', company_overview?.website);
                }
            }
        }
    }, [metrics]);



    return (
        <div>
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-full flex flex-col gap-4">
                    <h1 className="rh1 max-w-2xl">{company_overview?.name} / Global / {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - Market Research Report</h1>
                    <div className="border-b border-border" />

                    <div className="flex gap-5">
                        <p className="rp whitespace-nowrap">Markets AI</p>
                        <p className="rp whitespace-nowrap">Stuttgart, Germany</p>
                        <p className="rp whitespace-nowrap">
                            {new Date(metrics?.createdAt ?? new Date()).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>

                        <p className="rp whitespace-nowrap">{metrics?._id || ""}</p>
                    </div>

                </div>

                <img
                    src={`https://logo.clearbit.com/${domain}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://i.ibb.co/Z1kmFJm6/logo.png';
                    }}
                    className="w-25 h-auto"
                />
            </div>
            <div className="flex border-y border-border">
                <div className="px-5 py-1 border-r border-border">
                    <label className="rp">Revenue</label>
                    <div className="relative w-full text-[1.5rem]">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2">$</span>
                        <input
                            type="text"
                            className="pl-6 pr-2 py-1 w-full text-right text-black font-semibold"
                            value={formatWithCommas(revenue_last_year?.value ?? "")}
                            placeholder="Not found"
                            onChange={(e) => {
                                const raw = removeNonDigits(e.target.value);
                                const num = parseInt(raw || "0", 0);

                                setMetrics((prev) => ({
                                    ...prev,
                                    financials: {
                                        ...prev.financials,
                                        revenue_last_year: {
                                            ...prev.financials.revenue_last_year,
                                            value: num,
                                        },
                                    },
                                }));
                            }}
                        />

                    </div>
                    <h3 className="rh3"></h3>
                </div>

                <div className="px-5 py-1 border-r border-border">
                    <label className="rp">Profit</label>
                    <div className="relative w-full text-[1.5rem]">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2">$</span>
                        <input
                            type="text"
                            className="pl-6 pr-2 py-1 w-full text-right text-black font-semibold"
                            value={formatWithCommas(profit_last_year?.value ?? "")}
                            placeholder="Not found"
                            onChange={(e) => {
                                const raw = removeNonDigits(e.target.value);
                                const num = parseInt(raw || "0", 0);

                                setMetrics((prev) => ({
                                    ...prev,
                                    financials: {
                                        ...prev.financials,
                                        profit_last_year: {
                                            ...prev.financials.profit_last_year,
                                            value: num,
                                        },
                                    },
                                }));
                            }}
                        />
                    </div>
                </div>

                <div className="px-5 py-1">
                    <label className="rp">Employees</label>
                    <input
                        type="text"
                        className="pl-6 pr-2 py-1 w-full text-right text-[1.5rem] text-black font-semibold"
                        value={formatWithCommas(employees?.value ?? "")}
                        placeholder="Not found"
                        onChange={(e) => {
                            const raw = removeNonDigits(e.target.value);
                            const num = parseInt(raw || "0", 0);

                            setMetrics((prev) => ({
                                ...prev,
                                financials: {
                                    ...prev.financials,
                                    employees: {
                                        ...prev.financials.employees,
                                        value: num,
                                    },
                                },
                            }));
                        }}
                    />
                </div>
            </div>

        </div>


    )
}