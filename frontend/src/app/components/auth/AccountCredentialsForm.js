'use client'
import React from "react";
import Input from "../Input";
import { useLoginUser } from "@/app/hooks/auth";

export default function AccountCredentialsForm({
    title,
    onNext,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    buttonText,
    login
}) {

    const {
        mutate: loginUser,
        isPending,
        isSuccess,
        isError,
        error
    } = useLoginUser();


    const handleNext = () => {
        const newErrors = {};

        if (!email || !email.includes("@")) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password || password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors((prev) => ({ ...prev, ...newErrors }));
            return;
        }

        setErrors((prev) => ({ ...prev, email: "", password: "" }));

        if (login) {
            loginUser({
                email,
                password,
            });
        }
        else {
            onNext();
        }

    };

    return (
        <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
                e.preventDefault();
                handleNext();
            }}
        >
            <h1 className="heading">{title}</h1>

            <Input
                type="email"
                placeholder="Enter your email"
                label="Email"
                value={email}
                setValue={setEmail}
                error={errors.email}
            />

            <Input
                type="password"
                placeholder="Enter your password"
                label="Password"
                value={password}
                setValue={setPassword}
                forgot={true}
                error={errors.password}
            />

            <button
                type="submit"
                className="bg-accent text-white py-3 text-center rounded-md cursor-pointer hover:bg-accent/90"
            >
                {buttonText}
            </button>
            {error && <p className="text-red-500 text-center">{error.message}</p>}
        </form>
    );
}
