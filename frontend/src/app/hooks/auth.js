'use client';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
// Test
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useRegisterUser = () => {
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    return useMutation({
        mutationFn: async (user) => {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server returned invalid JSON: " + text);
            }

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            return data; // { token, user }
        },

        onSuccess: (data) => {
            if (data.token) {
                login(data.user, data.token);
                router.push("/");

            }
        },

        onError: (error) => {
            console.error("Registration error:", error.message);
        },
    });
};

export const useLoginUser = () => {
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    return useMutation({
        mutationFn: async (credentials) => {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
            });

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server returned invalid JSON: " + text);
            }

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            return data; // { token, user }
        },

        onSuccess: (data) => {
            if (data.token) {
                login(data.user, data.token);
                router.push("/");
            }
        },

        onError: (error) => {
            console.error("Login error:", error.message);
        },
    });
};
