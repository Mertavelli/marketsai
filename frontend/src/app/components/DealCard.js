'use client'
import Link from "next/link";
import { useGetReportsByDealId } from "../hooks/api";
import ProfileAvatar from "./ProfileAvatar";
import { useAuthStore } from "../stores/useAuthStore";

export function DealCard({ deal }) {
    const { user } = useAuthStore()
    const { data: reports } = useGetReportsByDealId(deal._id);

    return (
        <Link
            href={`/pages/deals/${deal._id}`}
            className="bg-secondary border border-border rounded-xl cursor-pointer text-start overflow-hidden transform transition-all duration-200 hover:scale-[1.01] w-full"
        >

            <div>
                <img
                    src={`/deals/${deal.imageKey}.png`}
                    className="w-full h-30 object-cover"
                />
            </div>

            <div className="flex items-center gap-2 p-2 w-full">
                <ProfileAvatar name={user.firstName} className="w-6 h-6 text-xs" />
                <div className="flex flex-col">
                    <h2 className="text-black font-medium text-sm">{deal.title}</h2>
                    <div className="flex gap-1 text-xs">
                        <p>
                            {`${reports?.length ?? 0} ${reports?.length === 1 ? "Report" : "Reports"}`}
                        </p>
                        <p>{"1 Member"}</p>
                    </div>
                </div>
            </div>

        </Link>
    );

}
