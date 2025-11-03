'use client';

import React from "react";
import { MdOutlineSettings } from "react-icons/md";

export default function SettingsButton({ onClick }) {
    return (
        <div className="w-full">
            <button
                type="button"
                onClick={onClick}
                className="text-sm font-medium text-black flex justify-between gap-2 items-center cursor-pointer bg-secondary hover:bg-accent/5 rounded-md p-1.5 transition-all"
            >
                <div className="flex items-center justify-between gap-2">
                    <MdOutlineSettings size={18} className="text-tertiary" />
                    <span>Settings</span>
                </div>
            </button>
        </div>
    );
}
