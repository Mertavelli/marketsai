import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isInitialized: false,

    login: (user, token) => {
        set({ user, token });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    },

    logout: () => {
        // Redirect zuerst
        window.location.href = "/login";

        // Dann verzögert Zustand leeren
        setTimeout(() => {
            set({ user: null, token: null });
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }, 300);
    },

    initializeAuth: () => {
        if (typeof window === "undefined") return;

        try {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            set({
                user: storedUser ? JSON.parse(storedUser) : null,
                token: storedToken || null,
                isInitialized: true
            });
        } catch (e) {
            console.error("❌ Fehler beim Lesen von Auth aus localStorage:", e);
            set({ user: null, token: null, isInitialized: true });
        }
    }
}));
