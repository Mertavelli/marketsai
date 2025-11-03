'use client'
import React, { useState } from "react"
import Link from "next/link"
import AccountCredentialsForm from "@/app/components/auth/AccountCredentialsForm"

export default function CompanyLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({});

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="p-20 w-full max-w-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white relative flex flex-col gap-5">

                <Link
                    href={"/login"}
                    className="absolute top-5 right-5 rounded-full p-2 border border-border hover:text-accent hover:bg-accent/5 hover:border-accent transition-all cursor-pointer"
                >
                    <p>Investor Log In</p>
                </Link>

                <AccountCredentialsForm
                    title="Login as Startup"
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                    setErrors={setErrors}
                    buttonText={"Login"}
                    login={true}
                />
                <div className="flex gap-2 justify-center">
                    <p>Don't have an account?</p>
                    <Link href="/register" className="text-accent">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}