"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthContextProvider} from "@/contexts/Auth";
import {ClientCookiesProvider} from "./cookies";
import {I18nextProvider} from "react-i18next";
import {cookies} from "next/headers";
import {ReactNode} from "react";
import i18n from "@/lang";

interface ProvidersProps {
    children: ReactNode;
}

const MINUTE = 60 * 1000;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 20 * MINUTE,
            staleTime: Infinity,
            retry: false,
        },
    },
});

const Providers = ({children}: ProvidersProps) => {
    return (
        <ClientCookiesProvider value={cookies().getAll()}>
            <I18nextProvider i18n={i18n} defaultNS={"translation"}>
                <QueryClientProvider client={queryClient}>
                    <AuthContextProvider>{children}</AuthContextProvider>
                </QueryClientProvider>
            </I18nextProvider>
        </ClientCookiesProvider>
    );
};
export default Providers;
