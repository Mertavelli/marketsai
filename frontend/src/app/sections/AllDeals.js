'use client'
import React, { useState, useEffect } from "react";
import { DealCard } from "../components/DealCard";

export default function AllDeals({ deals }) {

    return (
        <div className="flex flex-col h-full w-full">
            <h2 className="sub-heading">All Deals</h2>
            <div className="w-full flex flex-col gap-4 mt-5 rounded-md">
                <div className="grid grid-cols-4 gap-4 w-full">
                    {deals?.map((deal) => (
                        <DealCard key={deal._id} deal={deal} />
                    ))}
                </div>
            </div>
        </div>
    );
}
