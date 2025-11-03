'use client'
import React, { useState, useEffect } from "react"
import { useAuthStore } from "@/app/stores/useAuthStore"

export default function CoverSlide({ metrics = {} }) {
    const { user } = useAuthStore()
    //console.log("CoverSlide:", metrics)
    return (
        <div className="bg-[url('/slides/bg.png')] w-full h-full bg-cover bg-center">
            <div className="bg-white mx-20 h-[80%] pt-20 px-10">
                <h1 className="text-3xl font-semibold">Pre-study of {metrics?.company_profile?.company_name_presentation}</h1>
                <h2>Presentation to {user.company}, {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}</h2>
            </div>
        </div>
    )
}