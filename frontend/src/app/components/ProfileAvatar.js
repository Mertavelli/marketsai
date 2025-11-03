'use client'
import React from "react";

// Farben für Buchstaben A-Z (kannst du anpassen)
const colors = [
    "#1e3a8a", // Indigo-900
    "#1d4ed8", // Blue-700
    "#2563eb", // Blue-600
    "#3b82f6", // Blue-500
    "#60a5fa", // Blue-400
    "#93c5fd", // Blue-300
    "#0ea5e9", // Sky-500
    "#38bdf8", // Sky-400
    "#7dd3fc", // Sky-300
    "#06b6d4", // Cyan-500
    "#22d3ee", // Cyan-400
    "#67e8f9", // Cyan-300
    "#818cf8", // Violet-400
    "#a5b4fc", // Violet-300
    "#c084fc", // Purple-400
    "#f472b6", // Pink-400 (dezenter Farbtupfer)
    "#f9a8d4", // Pink-300
    "#a3e635", // Lime-400
    "#4ade80", // Green-400
    "#facc15", // Yellow-400 (selten verwendet)
    "#fcd34d"  // Amber-300
];


function getColorForLetter(letter) {
    const index = letter.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, ...
    return colors[index % colors.length];
}

export default function ProfileAvatar({ name, className, src }) {
    if (!name) return null;

    const firstLetter = name.trim().charAt(0).toUpperCase();
    const bgColor = getColorForLetter(firstLetter);

    if (!src) return (
        <div
            className={`rounded-full flex items-center justify-center text-white font-semibold ${className}`}
            style={{ backgroundColor: bgColor }}
            title={name}
        >
            {firstLetter}
        </div>
    );
    if (src) return (
        <div className={`rounded-full border border-border overflow-hidden ${className}`}>
            <img src={src} />
        </div>
    )
}
