'use client';
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/useAuthStore";
import ProfileAvatar from "./ProfileAvatar";
import { FiLogOut } from "react-icons/fi";
import { ChartCandlestick } from "lucide-react"
import PortfolioModal from "./PortfolioModal";
import { MdAccountBox } from "react-icons/md";

const pages = [
    "Home", "Startups", "Workflows", "Deals"
];

export default function Navbar() {
    const dropdownRef = useRef(null);
    const { user } = useAuthStore() || {};
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);
    const [isOpen, setIsOpen] = useState(false)
    const [portfolioIsOpen, setPortfolioIsOpen] = useState(false)

    const getInitialPage = () => {
        if (pathname === "/") return "home";
        const match = pathname.match(/^\/pages\/([^\/]+)/);
        return match ? match[1].toLowerCase() : "home";
    };

    const [activePage, setActivePage] = useState(getInitialPage);

    useEffect(() => {
        setActivePage(getInitialPage());
    }, [pathname]);

    const handlePageChange = (page) => {
        const lowerPage = page.toLowerCase();
        setActivePage(lowerPage);
        if (lowerPage === "home") {
            router.push("/");
        } else {
            router.push(`/pages/${lowerPage}`);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/login"); // oder "/" – je nachdem, was du willst
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    return (
        <>
            <div className="p-5 pb-0">
                <div className="flex justify-between items-center">
                    <div className="flex items-end gap-3">
                        <Link href="/">
                            <img src="/logo.png" className="w-30" alt="Logo" />
                        </Link>
                        <label className="text-accent badge text-sm">MVP</label>
                    </div>

                    <div className="flex items-center gap-4">
                        {/*                         <Link href="/">
                            <label className="cursor-pointer p-gray">Support</label>
                        </Link> */}
                        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex items-center gap-2 font-medium hover:bg-secondary p-2 rounded-md transition-all">
                            <ProfileAvatar name={user?.firstName} src={user?.logo} className={"w-8 h-8 text-xs"} />
                            <p>{user?.firstName + " " + user?.lastName}</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex gap-2 border-b border-border px-5 mb-5">
                {pages.map((page, i) => (
                    <div
                        key={i}
                        className={`pb-1 ${activePage === page.toLowerCase() ? "border-b-3 border-accent" : ""}`}
                    >
                        <button
                            onClick={() => handlePageChange(page.toLowerCase())}
                            className={`py-1.5 px-4 text-center rounded-md cursor-pointer hover:text-accent hover:bg-accent/5 transition-all ${activePage === page.toLowerCase() ? "text-accent" : ""
                                }`}
                        >
                            <p className="p-gray">{page}</p>
                        </button>
                    </div>
                ))}
            </div>

            {isOpen && (
                <div ref={dropdownRef} className="absolute top-17 right-5 z-50 bg-secondary pt-4 px-2 rounded-md border border-border shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                    <div className="flex flex-col justify-center items-center min-w-[8.5rem]">
                        <ProfileAvatar name={user?.firstName || ""} className={"w-12 h-12 text-xl"} />
                        <div>
                            <p className="text-xs text-black font-medium">{(user?.firstName) + " " + user?.lastName}</p>
                            <p className="text-xs font-medium mb-4">{user?.email}</p>
                        </div>

                        {user.accountType == "investor" && (
                            <button onClick={() => setPortfolioIsOpen(true)} className="flex items-center gap-2 text-black text-xs font-medium border-t border-border w-full py-2 cursor-pointer">
                                <ChartCandlestick size={15} />
                                <p>Portfolio</p>
                            </button>
                        )}

                        {user.accountType == "company" && (
                            <Link href={"/pages/company-account"} className="flex items-center gap-2 text-black text-xs font-medium border-t border-border w-full py-2 cursor-pointer">
                                <MdAccountBox size={15} />
                                <p>Account</p>
                            </Link>
                        )}


                        <button onClick={handleLogout} className="flex items-center gap-2 text-black text-xs font-medium border-t border-border w-full py-2 cursor-pointer">
                            <FiLogOut />
                            <p>Log out</p>
                        </button>
                    </div>
                </div>
            )}

            {portfolioIsOpen && <PortfolioModal setPortfolioIsOpen={setPortfolioIsOpen} />}

        </>
    );
}
