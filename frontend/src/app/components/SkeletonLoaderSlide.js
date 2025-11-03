import React from "react";
import { Skeleton } from "primereact/skeleton";

export default function SkeletonLoaderSlide() {
    const skeletonClass = "bg-gray-100"; // sehr hell für dezente Wirkung

    return (
        <div className="aspect-[16/9] w-full max-w-5xl border border-border rounded-xl p-10 bg-white animate-pulse flex flex-col justify-between space-y-8 text-black">

            {/* Titel */}
            <div className="space-y-2">
                <Skeleton width="50%" height="2.5rem" className={skeletonClass} />
                <Skeleton width="30%" height="1.25rem" className={skeletonClass} />
            </div>

            {/* Hauptinhalt */}
            <div className="flex flex-1 gap-10">
                {/* Linke Spalte (Text / Bullet Points) */}
                <div className="flex flex-col gap-3 flex-[1.2]">
                    {Array(4).fill(0).map((_, i) => (
                        <Skeleton key={i} width={`${90 - i * 10}%`} height="1rem" className={skeletonClass} />
                    ))}
                </div>

                {/* Rechte Spalte (Chart) */}
                <div className="flex-[1]">
                    <Skeleton height="12rem" className={skeletonClass} />
                </div>
            </div>

            {/* KPIs */}
            <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                    <Skeleton width="6rem" height="1rem" className={skeletonClass} />
                    <Skeleton width="8rem" height="1.5rem" className={skeletonClass} />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton width="6rem" height="1rem" className={skeletonClass} />
                    <Skeleton width="8rem" height="1.5rem" className={skeletonClass} />
                </div>
            </div>

            {/* Fußnote */}
            <Skeleton width="20%" height="0.75rem" className={skeletonClass} />
        </div>
    );
}
