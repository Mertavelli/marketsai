'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useIsMobile from '../hooks/useIsMobile';
import { useAuthStore } from '../stores/useAuthStore';

export default function Providers({ children }) {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);
    const user = useAuthStore((state) => state.user);
    const isInitialized = useAuthStore((state) => state.isInitialized);
    const isMobile = useIsMobile();
    const [queryClient] = useState(() => new QueryClient());
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        initializeAuth();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const isAuthRoute = ['/login', '/register', '/accept-token', '/company-login', '/company-register'].includes(pathname);
            if (isInitialized && !user && !isAuthRoute) {
                router.push('/login');
            }
        }, 500); // 500 ms warten

        return () => clearTimeout(timeout);
    }, [isInitialized, user, pathname]);

    if (isMobile) return <p className="text-center">Currently not available on mobile devices.</p>;
    if (!isInitialized) return <p className="text-center">Loading...</p>;

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
