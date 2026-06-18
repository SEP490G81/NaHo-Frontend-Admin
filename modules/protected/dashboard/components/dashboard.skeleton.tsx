import React from "react";

const Block = ({ className = "" }: { className?: string }) => (
    <div className={`bg-bgc-app animate-pulse rounded-xl ${className}`} />
);

/** Placeholder layout shown while the overview query is loading. */
const DashboardSkeleton = () => (
    <div className="space-y-5">
        <Block className="h-24" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Block className="h-32" />
            <Block className="h-32" />
            <Block className="h-32" />
            <Block className="h-32" />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Block className="h-72 lg:col-span-2" />
            <Block className="h-72" />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Block className="h-72" />
            <Block className="h-72" />
        </div>
    </div>
);

export default DashboardSkeleton;
