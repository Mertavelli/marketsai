import React from "react";

const activityLog = [
    {
        message: "Investment Memo aktualisiert",
        time: "vor 2 Minuten",
    },
    {
        message: "Exit-Multiple auf 5x geändert",
        time: "vor 1 Stunde",
    },
    {
        message: "Kommentar von Olivia Lee hinzugefügt",
        time: "vor 3 Tagen",
    },
    {
        message: "Neuer Web-Link zur Marktanalyse hinzugefügt",
        time: "vor 1 Woche",
    }
];

export default function Activity() {
    return (
        <div className="relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-md pointer-events-none">
                <span className="text-sm font-semibold text-[#0049FF] uppercase tracking-wide">
                    Entwurf
                </span>
            </div>
            <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md border border-border h-full">
                <h2 className="sub-heading">Activity</h2>

                <ul className="flex flex-col gap-3 text-sm">
                    {activityLog.map((entry, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 rounded-full bg-[#0049FF] shrink-0" />
                            <div>
                                <p className="text-black font-medium">{entry.message}</p>
                                <p className="text-gray-500 text-xs">{entry.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
