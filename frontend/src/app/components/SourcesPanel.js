import React from "react";
import { BarChart2, TrendingUp, ShieldAlert } from "lucide-react";

const renderSourceItem = (source, label, index) => {
    const isLink = typeof source === "string";
    const link = isLink ? source : source?.link;
    const title = isLink ? label : `${label ?? source?.name}`;
    const description = isLink ? null : source?.description;
    const date = isLink ? null : source?.date;

    return (
        <div
            key={index}
            className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm space-y-1 break-words"
        >
            {title && <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{title}</div>}
            {description && (
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{description}</div>
            )}
            {date && (
                <div className="text-xs text-zinc-400">{date}</div>
            )}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-accent hover:underline text-sm font-medium mt-1"
            >
                View Source →
            </a>
        </div>
    );
};

export const SourcesPanel = ({ metrics }) => {
    const { financials, market_data, risk_analysis } = metrics;

    return (
        <div className="space-y-8">
            <Section icon={<BarChart2 className="w-5 h-5 text-accent" />} title="Financials">
                {financials.revenue_last_year_source &&
                    renderSourceItem(financials.revenue_last_year_source, `Revenue: ${financials.revenue_last_year?.toLocaleString("en-US")}`, 0)}
                {financials.profit_last_year_source &&
                    renderSourceItem(financials.profit_last_year_source, `Profit: ${financials.profit_last_year?.toLocaleString("en-US")}`, 1)}
                {financials.wages_source &&
                    renderSourceItem(financials.wages_source, `Wages: ${financials.wages !== null ? financials.wages?.toLocaleString("en-US") : "n/a"}`, 2)}
                {financials.employees_source &&
                    renderSourceItem(financials.employees_source, `Employees: ${financials.employees?.toLocaleString("en-US")}`, 3)}
                {financials.total_businesses_source &&
                    renderSourceItem(financials.total_businesses_source, `Total Businesses: ${financials.total_businesses?.toLocaleString("en-US")}`, 4)}
            </Section>

            <Section icon={<TrendingUp className="w-5 h-5 text-accent" />} title="Market Data">
                {market_data.tam_sources?.map((source, i) =>
                    renderSourceItem(source, "TAM", `tam-${i}`)
                )}
                {market_data.sam_sources?.map((source, i) =>
                    renderSourceItem(source, "SAM", `sam-${i}`)
                )}
                {market_data.som_sources?.map((source, i) =>
                    renderSourceItem(source, "SOM", `som-${i}`)
                )}
            </Section>

            <Section icon={<ShieldAlert className="w-5 h-5 text-accent" />} title="Risk Analysis">
                {risk_analysis.sources?.map((source, i) =>
                    renderSourceItem(source, null, `risk-${i}`)
                )}
            </Section>
        </div>
    );
};

const Section = ({ icon, title, children }) => (
    <section>
        <div className="flex items-center gap-2 mb-3">
            {icon}
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
    </section>
);
