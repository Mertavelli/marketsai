'use client'
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MarketSizeChart from "../../components/reports/MarketSizeChart"
import RiskRadarChart from "../../components/reports/RiskRadarChart";
import CompetitorTable from "../../components/reports/CompetitorTable";
import { SourcesPanel } from "@/app/components/SourcesPanel";
import TextareaAutosize from "react-textarea-autosize";

function formatWithCommas(value) {
    if (value === 0 || value === "0") return value
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeNonDigits(value) {
    return value.replace(/\D/g, "");
}


export default function DeepReportDocument({ metrics, setMetrics }) {
    const searchParams = useSearchParams();
    const [domain, setDomain] = useState("")

    const competitorsRaw = searchParams.get("competitors");
    const tam_sources_Raw = searchParams.get("tam_sources");
    const sam_sources_Raw = searchParams.get("sam_sources");
    const som_sources_Raw = searchParams.get("som_sources");
    const risk_sources_Raw = searchParams.get("sources");
    const risk_profile_raw = searchParams.get("profile");
    const [localMetrics, setLocalMetrics] = useState(
        {
            "company_overview": {
                "name": searchParams.get("name") || "",
                "industry": searchParams.get("industry") || "",
                "usp": searchParams.get("usp") || "",
                "business_model": searchParams.get("business_model") || "",
                "headquarter": searchParams.get("headquarter") || "",
                "website": searchParams.get("website") || "",
                "innovation": searchParams.get("innovation") || "",
                "market_power": searchParams.get("market_power") || ""
            },

            "financials": {
                "revenue_last_year": searchParams.get("revenue_last_year") || "",
                "revenue_last_year_source": searchParams.get("revenue_last_year_source") || "",
                "profit_last_year": searchParams.get("profit_last_year") || "",
                "profit_last_year_source": searchParams.get("profit_last_year_source") || "",
                "wages": searchParams.get("wages") || "",
                "wages_source": searchParams.get("wages_source") || "",
                "employees": searchParams.get("employees") || "",
                "employees_source": searchParams.get("employees_source") || "",
                "total_businesses": searchParams.get("total_businesses") || "",
                "total_businesses_source": searchParams.get("total_businesses_source") || ""
            },

            "market_data": {
                "tam": searchParams.get("tam") || "",
                "sam": searchParams.get("sam") || "",
                "som": searchParams.get("som") || "",
                "tam_sources": tam_sources_Raw ? JSON.parse(decodeURIComponent(tam_sources_Raw)) : [],
                "sam_sources": sam_sources_Raw ? JSON.parse(decodeURIComponent(sam_sources_Raw)) : [],
                "som_sources": sam_sources_Raw ? JSON.parse(decodeURIComponent(som_sources_Raw)) : [],
            },

            "competitors": competitorsRaw ? JSON.parse(decodeURIComponent(competitorsRaw)) : [],

            "risk_analysis": {
                "profile": risk_profile_raw ? JSON.parse(decodeURIComponent(risk_profile_raw)) : {},
                "sources": risk_sources_Raw ? JSON.parse(decodeURIComponent(risk_sources_Raw)) : []
            },
            "management_summary": searchParams.get("management_summary") || "",
            "ai_recommendation": searchParams.get("ai_recommendation") || "",
        }
    )

    const effectiveMetrics = metrics || localMetrics;


    useEffect(() => {
        console.log("metrics:", effectiveMetrics);

        if (effectiveMetrics?.company_overview?.website && typeof effectiveMetrics?.company_overview?.website === 'string') {
            const website = effectiveMetrics?.company_overview?.website.trim();
            if (website.length > 0 && website.includes('.')) {
                try {
                    console.log("website: ", website)
                    const url = new URL(website.startsWith('http') ? website : `https://${website}`);
                    const hostname = url.hostname;
                    const domainParts = hostname.split('.');

                    const newDomain = domainParts[0] === 'www'
                        ? domainParts.slice(1).join('.')
                        : hostname;

                    setDomain(newDomain);
                } catch (err) {
                    console.error('Invalid URL:', effectiveMetrics?.company_overview?.website);
                }
            }
        }
    }, [effectiveMetrics]);

    return (
        <div className="flex flex-col gap-2.5 bg-white p-5 h-full">
            <div className="flex items-start justify-between">
                <h1 className="rh1 max-w-xl">{effectiveMetrics?.company_overview?.name} / Global / {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - Market Research Report</h1>
                <img
                    src={`https://logo.clearbit.com/${domain}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://i.ibb.co/Z1kmFJm6/logo.png';
                    }}
                    className="w-15 h-auto"
                />

            </div>

            <div className="flex gap-5">
                <p className="rp">Markets AI</p>
                <p className="rp">Stuttgart, Germany</p>
                <p className="rp">{new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
                <p className="rp">b3f7c2d0-91fa-45cb-a5c9-8371b9a3c6d1</p>
            </div>

            <div className="flex border border-border rounded-md w-full">
                <div className="px-5 py-1 border-r border-border w-1/4">
                    <label className="rp">Revenue</label>
                    <div className="relative w-full">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2">$</span>
                        <input
                            type="text"
                            className="pl-6 pr-2 py-1 rh3 w-full text-right text-ellipsis"
                            style={{ fontSize: effectiveMetrics?.financials?.revenue_last_year?.length > 10 ? "0.85rem" : "1rem" }}
                            value={formatWithCommas(effectiveMetrics?.financials?.revenue_last_year ?? "")}
                            placeholder="Not found"
                            onChange={(e) =>
                                setMetrics(prev => ({
                                    ...prev,
                                    financials: {
                                        ...prev.financials,
                                        revenue_last_year: removeNonDigits(e.target.value)
                                    }
                                }))
                            }
                        />
                    </div>
                    <h3 className="rh3"></h3>
                </div>

                <div className="px-5 py-1 border-r border-border w-1/4">
                    <label className="rp">Profit</label>
                    <div className="relative w-full">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2">$</span>
                        <input
                            type="text"
                            className="pl-6 pr-2 py-1 rh3 w-full text-right text-ellipsis"
                            style={{ fontSize: effectiveMetrics?.financials?.profit_last_year?.length > 10 ? "0.85rem" : "1rem" }}
                            value={formatWithCommas(effectiveMetrics?.financials?.profit_last_year ?? "")}
                            placeholder="Not found"
                            onChange={(e) =>
                                setMetrics(prev => ({
                                    ...prev,
                                    financials: {
                                        ...prev.financials,
                                        profit_last_year: removeNonDigits(e.target.value)
                                    }
                                }))
                            }
                        />
                    </div>
                </div>

                <div className="px-5 py-1 border-r border-border w-1/4">
                    <label className="rp">Employees</label>
                    <input
                        type="text"
                        className="pl-6 pr-2 py-1 rh3 w-full text-right text-ellipsis"
                        style={{ fontSize: effectiveMetrics?.financials?.employees?.length > 10 ? "0.85rem" : "1rem" }}
                        value={formatWithCommas(effectiveMetrics?.financials?.employees ?? "")}
                        placeholder="Not found"
                        onChange={(e) =>
                            setMetrics(prev => ({
                                ...prev,
                                financials: {
                                    ...prev.financials,
                                    employees: removeNonDigits(e.target.value)
                                }
                            }))
                        }
                    />
                </div>

                <div className="px-5 py-1 border-r border-border w-1/4">
                    <label className="rp">Businesses</label>
                    <input
                        type="text"
                        className="pl-6 pr-2 py-1 rh3 w-full text-right text-ellipsis"
                        style={{ fontSize: effectiveMetrics?.financials?.total_businesses?.length > 10 ? "0.85rem" : "1rem" }}
                        value={formatWithCommas(effectiveMetrics?.financials?.total_businesses ?? "")}
                        placeholder="Not found"
                        onChange={(e) =>
                            setMetrics(prev => ({
                                ...prev,
                                financials: {
                                    ...prev.financials,
                                    total_businesses: removeNonDigits(e.target.value)
                                }
                            }))
                        }
                    />
                </div>

            </div>

            <div className="flex flex-col gap-2.5 py-2 border-y border-border">
                <h2 className="rh2">Management Summary</h2>
                <p className="rp">

                    <TextareaAutosize
                        value={effectiveMetrics?.management_summary ?? "-"}
                        onChange={(e) =>
                            setMetrics(prev => ({
                                ...prev,
                                management_summary: e.target.value
                            }))
                        }
                        className="w-full"
                    />
                </p>
            </div>

            <div className="flex flex-col gap-10 mt-5">
                <div className="flex justify-between items-start gap-5">
                    <div className="w-1/2">
                        <h2 className="rh2">Market Overview</h2>
                        <MarketSizeChart metrics={effectiveMetrics} report={true} />
                    </div>

                    <div className="w-1/2">
                        <h2 className="rh2">Competitor Landscape</h2>
                        <CompetitorTable metrics={effectiveMetrics} report={true} />
                    </div>

                </div>

                <div className="flex justify-between items-start gap-5">

                    <div className="w-1/2">
                        <h2 className="rh2">Risks</h2>
                        <RiskRadarChart metrics={effectiveMetrics} report={true} />
                    </div>

                    <div className="w-1/2">
                        <h2 className="rh2">AI Recommendation</h2>
                        <p className="rp">
                            {effectiveMetrics?.ai_recommendation}
                        </p>
                    </div>

                </div>
            </div>

            {/* Sources */}
            {!metrics && (
                <div className="mt-40">
                    <SourcesPanel metrics={effectiveMetrics} />
                </div>

            )}

        </div>
    );
}
