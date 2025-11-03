'use client';

import Link from "next/link";

export default function StartupCard({ startup, inDetails = false }) {
    const websiteUrl = startup.website?.startsWith("http")
        ? startup.website
        : `https://${startup.website}`;

    return (
        <div className="border border-border rounded-md p-4">
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                <div className="border border-border rounded-md overflow-hidden">
                    <img src={startup.logo} className="w-15 h-15" />
                </div>

                <div className="text-black">
                    <h2 className="font-semibold">{startup.company}</h2>
                    <p className="font-light">{startup.slogan}</p>
                    <p className="text-xs text-tertiary">{startup.employees} Employees</p>
                </div>
            </div>

            <div className="flex gap-4 text-sm mb-6">
                <div className="whitespace-nowrap">
                    <p className="font-medium text-black mb-1">Website</p>
                    <a
                        className="text-black hover:underline"
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {startup.website}
                    </a>
                </div>

                <div className="whitespace-nowrap">
                    <p className="font-medium text-black mb-1">Employees</p>
                    <p>{startup.employees}</p>
                </div>

                <div className="whitespace-nowrap">
                    <p className="font-medium text-black mb-1">Location</p>
                    <p>{startup.location}</p>
                </div>
            </div>

            <p className="text-black mb-6">{startup.description}</p>

            <div className="mb-6">
                <p className="font-medium text-black mb-1">Industries</p>
                <div className="flex gap-1 text-black">
                    {startup.industries?.map((industry, i) => (
                        <p className="badge" key={i}>{industry}</p>
                    ))}
                </div>
            </div>

            {!inDetails && (
                <div className="flex justify-center border-t border-border pt-4 hover:underline">
                    <Link href={`/pages/startups/${startup._id}`} className="text-black font-medium text-sm">
                        View details
                    </Link>
                </div>
            )}

        </div>
    );
}
