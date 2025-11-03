import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Carousel({ children = [] }) {
    const [curr, setCurr] = useState(0);
    const prev = () => setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
    const next = () => setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));

    return (
        <div className="w-full overflow-hidden relative">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {children.map((child, i) => (
                    <div key={i} className="w-full flex-shrink-0 px-4 flex justify-center items-center">
                        <div className="w-full">{child}</div>
                    </div>
                ))}
            </div>

            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 pointer-events-none z-10">
                <button onClick={prev} className="pointer-events-auto rounded-full p-2 cursor-pointer">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={next} className="pointer-events-auto rounded-full p-2 cursor-pointer">
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {children.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all w-1.5 h-1.5 bg-white rounded-full border border-border ${curr === i ? "p-0.5" : "bg-white/50"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
