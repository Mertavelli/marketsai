'use client';
import React from "react";
import Input from "../Input";
import Link from "next/link";
import Multiselect from "../Multiselect";

export default function UserProfileForm({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    company,
    setCompany,
    position,
    setPosition,
    selectedindustries,
    setSelectedIndustries,
    handleSubmit,
    errors
}) {

    const industries = [
        "Artificial Intelligence",
        "FinTech",
        "HealthTech",
        "EdTech",
        "E-Commerce",
        "SaaS",
        "GreenTech",
        "Mobility",
        "Logistics",
        "Cybersecurity",
        "Gaming",
        "SpaceTech",
        "Robotics",
        "Biotech",
        "LegalTech",
        "InsurTech",
        "AgriTech",
        "PropTech",
        "Media & Entertainment",
        "Human Resources",
        "Travel & Hospitality",
        "Blockchain / Web3",
        "Energy",
        "Consumer Products",
        "Food & Beverage",
        "Manufacturing / Industry 4.0",
        "Social Impact / Nonprofit",
        "Marketplace",
        "Augmented / Virtual Reality",
        "Analytics / Big Data"
    ];

    return (
        <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <h1 className="heading">Account details</h1>

            <Input
                type="text"
                placeholder="Enter your first name"
                label="First name"
                value={firstName}
                setValue={setFirstName}
                error={errors.firstName}
            />

            <Input
                type="text"
                placeholder="Enter your last name"
                label="Last name"
                value={lastName}
                setValue={setLastName}
                error={errors.lastName}
            />

            <Input
                type="text"
                placeholder="Enter your company name"
                label="Company"
                value={company}
                setValue={setCompany}
                error={errors.company}
            />

            <Input
                type="text"
                placeholder="Enter your job title"
                label="Position"
                value={position}
                setValue={setPosition}
                error={errors.position}
            />


            <div className="flex flex-col gap-2 text-black w-full">
                <label>Industries</label>
                <Multiselect options={industries} onChange={(selected) => setSelectedIndustries(selected)} />
            </div>

            <button
                type="submit"
                className="bg-accent text-white py-3 text-center rounded-md cursor-pointer hover:bg-accent/90"
            >
                Create account
            </button>

        </form>
    );
}
