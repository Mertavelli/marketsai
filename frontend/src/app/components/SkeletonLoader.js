import React from "react";
import { Skeleton } from "primereact/skeleton";

export default function SkeletonLoader() {
    const skeletonClass = "bg-gray-100"; // extra hell

    return (
        <div className="border border-border rounded-xl p-10 bg-white space-y-6 w-full h-full animate-pulse">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton width="20rem" height="2.5rem" className={skeletonClass} />
                    <Skeleton width="10rem" height="1.5rem" className={skeletonClass} />
                </div>
                <Skeleton shape="circle" size="4rem" className={skeletonClass} />
            </div>

            {/* Meta Info */}
            <div className="flex gap-4">
                {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} width="8rem" height="1.2rem" className={skeletonClass} />
                ))}
            </div>

            {/* KPI Box */}
            <div className="grid grid-cols-5 gap-3">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded">
                        <Skeleton width="60%" height="1rem" className={`${skeletonClass} mb-2`} />
                        <Skeleton width="90%" height="1.5rem" className={skeletonClass} />
                    </div>
                ))}
            </div>

            {/* Chart Sektion */}
            <div className="grid grid-cols-2 gap-6">
                <Skeleton height="18rem" className={skeletonClass} />
                <Skeleton height="18rem" className={skeletonClass} />
            </div>

            {/* Textblock */}
            <div className="space-y-2">
                <Skeleton width="25%" height="1.5rem" className={skeletonClass} />
                {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} width={`${90 - i * 5}%`} height="1rem" className={skeletonClass} />
                ))}
            </div>
        </div>
    );
}
