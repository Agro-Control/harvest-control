"use client";

import Sidebar from "@/components/nav/sidebar";
import { useAuth } from "@/utils/hooks/useAuth";
import Loading from "../loading";

export default function ControlLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, isLoading } = useAuth();
    const isUserNull = user === null;
    const isLoadingUser = isLoading || isUserNull;
    return isLoadingUser ? (
        <Loading />
    ) : (
        <div className="flex w-full flex-row items-center">
            <Sidebar />
            <div className="ml-[308px] flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">{children}</div>
        </div>
    );
}
