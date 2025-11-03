'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AccountCredentialsForm from "@/app/components/auth/AccountCredentialsForm";
import UserProfileForm from "@/app/components/auth/UserProfileForm";
import { IoIosArrowBack } from "react-icons/io";
import { useRegisterUser } from "../../hooks/auth"
import { useAuthStore } from "@/app/stores/useAuthStore";
import Link from "next/link";

export default function CompanyRegister() {
    const login = useAuthStore((state) => state.login);
    const {
        mutate: registerUser,
        data: registrationResponse,
        isPending,
        isSuccess,
        isError,
        error
    } = useRegisterUser();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")

    const [selectedIndustries, setSelectedIndustries] = useState([])
    const [errors, setErrors] = useState({});

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const router = useRouter();

    const nextStep = () => {
        setActiveTabIndex((prev) => prev + 1);
    };

    const prevStep = () => {
        setActiveTabIndex((prev) => {
            const newIndex = prev - 1;
            if (newIndex < 0) {
                window.location.href = "https://marketsai.io";
                return prev;
            }
            return newIndex;
        });
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!email || !email.includes("@")) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required.";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required.";
        }

        if (!company.trim()) {
            newErrors.company = "Company name is required.";
        }

        if (!position.trim()) {
            newErrors.position = "Position is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        registerUser({
            email,
            password,
            firstName,
            lastName,
            company,
            position,
            industries: selectedIndustries,
            accountType: "company"
        });

        console.log({
            email,
            password,
            firstName,
            lastName,
            company,
            position,
            industry,
        });
    };

    useEffect(() => {
        if (isSuccess && registrationResponse?.user && registrationResponse?.token) {
            console.log("registrationResponse:", registrationResponse);
        }
    }, [isSuccess, registrationResponse]);



    const tabs = [
        <AccountCredentialsForm
            title="Create an startup account"
            onNext={nextStep}
            email={email}

            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errors={errors}
            setErrors={setErrors}
            buttonText={"Next"}
            login={false}

        />,
        <UserProfileForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            company={company}
            setCompany={setCompany}
            position={position}
            setPosition={setPosition}
            selectedIndustries={selectedIndustries}
            setSelectedIndustries={setSelectedIndustries}
            handleSubmit={handleSubmit}
            errors={errors}
        />,
    ];

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="p-20 w-full max-w-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white relative flex flex-col gap-5">
                <button
                    onClick={prevStep}
                    className="absolute top-5 left-5 rounded-full p-2 border border-border hover:text-accent hover:bg-accent/5 hover:border-accent transition-all cursor-pointer"
                >
                    <IoIosArrowBack size={25} />
                </button>

                <Link
                    href={"/register"}
                    className="absolute top-5 right-5 rounded-full p-2 border border-border hover:text-accent hover:bg-accent/5 hover:border-accent transition-all cursor-pointer"
                >
                    <p>Investor Sign Up</p>
                </Link>

                {tabs[activeTabIndex]}
                {error && <p className="text-red-500 text-center">{error.message}</p>}
                <div className="flex gap-2 justify-center">

                    <p>Already have an account?</p>
                    <Link href="/company-login" className="text-accent">Log in</Link>
                </div>
            </div>
        </div>
    );
}
