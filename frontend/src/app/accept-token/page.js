'use client'

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/stores/useAuthStore";

export default function AcceptToken() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect");
    const userParam = searchParams.get("user");
    const login = useAuthStore((state) => state.login);

    // Default user is null
    let user = null;

    if (userParam) {
        try {
            user = JSON.parse(decodeURIComponent(userParam));
        } catch (error) {
            console.error("Fehler beim Parsen des User-Params:", error);
        }
    }

    useEffect(() => {
        if (token && redirect && user) {
            localStorage.setItem("token", token);
            login(user, token);
            window.location.href = redirect;
        }
    }, [token, redirect, user]);

    return <p>Authenticating... Token: {token}</p>;
}
