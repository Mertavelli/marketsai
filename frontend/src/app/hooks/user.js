'use client';

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";
import { toast } from "sonner";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;
const CLOUDINARY_BASE = "https://api.cloudinary.com/v1_1";

const fetchWithUserId = async (url, method, body, userId) => {
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-User-Id": userId,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
    }

    return await res.json();
};

export const useUpdateUser = () => {
    const user = useAuthStore((state) => state.user);

    return useMutation({
        mutationFn: (updateData) => {
            if (!user?._id) throw new Error("User-ID nicht verfügbar");
            return fetchWithUserId(`${API_BASE_URL}/update`, "POST", updateData, user._id);
        },

        onSuccess: (updatedUser) => {
            useAuthStore.setState({ user: updatedUser });
            localStorage.setItem("user", JSON.stringify(updatedUser));
        },

        onError: (err) => {
            console.error("❌ Fehler beim Update:", err.message);
            toast.error("Update fehlgeschlagen");
        },
    });
};

export const useUploadFile = ({
    resourceType = "auto",
    uploadPreset = "profile_upload",
    cloudName = "dlq2ovqw8",
    mongoField = null,
} = {}) => {
    const user = useAuthStore((state) => state.user);

    return useMutation({
        mutationFn: async ({ file, userId }) => {
            if (!file) throw new Error("Keine Datei angegeben.");

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            const res = await fetch(`${CLOUDINARY_BASE}/${cloudName}/${resourceType}/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok || !data.secure_url) {
                throw new Error("Upload fehlgeschlagen");
            }

            if (mongoField && userId) {
                await fetchWithUserId(`${API_BASE_URL}/update`, "POST", {
                    [mongoField]: data.secure_url,
                }, userId);
            }

            return data.secure_url;
        },

        onError: (err) => {
            console.error("❌ Upload-Fehler:", err);
            toast.error("Upload fehlgeschlagen");
        },
    });
};

export const usePublicCompanies = () => {
    return useQuery({
        queryKey: ["public-companies"],
        queryFn: async () => {
            const res = await fetch(`${API_BASE_URL}/companies/public`);
            if (!res.ok) throw new Error(await res.text());
            return res.json();
        },

        onError: (err) => {
            console.error("❌ Fehler beim Laden öffentlicher Unternehmen:", err.message);
            toast.error("Couldn't load public startup profiles.");
        },

        staleTime: 1000 * 60 * 5,
    });
};
