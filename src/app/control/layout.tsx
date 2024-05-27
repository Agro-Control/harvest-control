"use client";

import {useMediaQuery} from "@/utils/hooks/useMediaQuery";
import Sidebar from "@/components/nav/sidebar";
import {useAuth} from "@/utils/hooks/useAuth";
import Loading from "../loading";
import MobileNav from "@/components/nav/mobile-nav";

export default function ControlLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const {user, isLoading} = useAuth();
    const isUserNull = user === null;
    const isLoadingUser = isLoading || isUserNull;
    return isLoadingUser ? (
        <Loading />
    ) : (
        <div className={`flex w-full ${isDesktop ? "flex-row gap-0" : "gap-1 flex-col"} items-center`}>
            {isDesktop && <Sidebar />}
            {!isDesktop && <MobileNav />}
            <div className={`${ isDesktop ? "ml-[308px]" : " ml-0"} flex h-full w-full flex-col overflow-y-auto overflow-x-hidden`}>{children}</div>
        </div>
    );
}
