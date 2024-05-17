"use client";
import {
    ChartPieSlice,
    WindowsLogo,
    FileText,
    FilePdf,
    UsersThree,
    Truck,
    MapPin,
    Buildings,
    SignOut,
    Icon as IconType,
} from "@phosphor-icons/react";
import SidebarHeader from "./sidebar-header";
import NavButton from "./nav-button";
import {useAuth} from "@/utils/hooks/useAuth";

interface NavButtonProps {
    icon: IconType;
    title: string;
    path: string;
    havePerm: boolean;
}

const Sidebar = () => {
    const {removeUser, user} = useAuth();
    const isAdmin = user && user.tipo === "D";
    const isGerente = user && user.tipo === "G";

    const NavButtons = [
        {
            icon: WindowsLogo,
            title: "control-panel",
            path: "/control",
            havePerm: isAdmin || isGerente,
        },
        {
            icon: ChartPieSlice,
            title: "dashboard",
            path: "/control/dashboard",
            havePerm: isAdmin || isGerente,
        },
        {
            icon: FileText,
            title: "service-order",
            path: "/control/orders",
            havePerm: isGerente,
        },
        {
            icon: FilePdf,
            title: "report",
            path: "/control/report",
            havePerm: isAdmin || isGerente,
        },
        {
            icon: UsersThree,
            title: "user-management",
            path: "/control/users",
            havePerm: isAdmin || isGerente,
        },
        {
            icon: Truck,
            title: "machines",
            path: "/control/machines",
            havePerm: isGerente,
        },
        {
            icon: MapPin,
            title: "fields",
            path: "/control/field",
            havePerm: isGerente,
        },
        {
            icon: Buildings,
            title: "company-management",
            path: "/control/business-management",
            havePerm: isAdmin || isGerente,
        },
    ];

    return (
        <div className="fixed left-0 top-0 flex h-screen w-[308px] flex-col justify-start gap-12 bg-sidebar py-6 drop-shadow-side">
            <SidebarHeader />
            <div className="flex w-full flex-col gap-3 px-2  ">
                {NavButtons.map((button) => {
                    return button.havePerm && <NavButton key={button.title} Icon={button.icon} title={button.title} path={button.path} />;
                })}
            </div>
            <div className="mt-auto flex h-[14vh] w-full flex-col justify-end gap-3 self-end bg-transparent px-2">
                <div
                    onClick={() => removeUser()}
                    className="group flex h-[40px] w-full cursor-pointer flex-row items-center justify-start gap-3 rounded-xl px-6 transition-colors  hover:bg-divider "
                >
                    <SignOut className="h-6 w-6 text-green-950  " weight="fill" />
                    <p className="text-md font-jakarta font-medium text-green-950">Sair</p>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;
