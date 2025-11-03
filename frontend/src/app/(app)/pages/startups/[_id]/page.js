'use client'

import React from "react"
import StartupCard from "@/app/components/StartupCard"
import { useGetUserById } from "@/app/hooks/api"
import { useParams } from "next/navigation"


export default function StartupDetails() {
    const { _id } = useParams()
    const { data: startup, isLoading, error } = useGetUserById(_id)

    if (isLoading) return <p>Loading startup...</p>
    if (error) return <p>Error loading startup details.</p>
    if (!startup) return <p>No startup found.</p>

    return (
        <div className="w-full max-w-[91rem] flex flex-col gap-5 h-full">
            <StartupCard startup={startup} inDetails={true} />

            <div className="border border-border rounded-md p-4">
                <h1 className="heading">About {startup.company}</h1>

                {/* PDF Pitchdeck Viewer */}
                {startup.pitchdeck ? (
                    <p></p>
                ) : (
                    <p>No pitchdeck available.</p>
                )}
            </div>
        </div>
    )
}
