"use client";

import { NavButton, NavButtonProps } from "./navigate-button";
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
  
import {useAuth} from "@/utils/hooks/useAuth";


  
  const MobileMenu = () => {
   
    

    const {removeUser, user} = useAuth();
    const isAdmin = user && user.tipo === "D";
    const isGerente = user && user.tipo === "G";


    const NavButtons:  NavButtonProps[]  = [
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
            havePerm: isGerente,
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
      <div
        className="flex w-full flex-col items-start justify-start gap-5"
      >
            <span className="pl-4 text-xs font-bold uppercase text-green-950">
              menu geral
            </span>
            <div className="flex w-full flex-col items-start">
              {NavButtons.map((item) => (
                <NavButton key={item.path} {...item} />
              ))}
            </div>
        <span className="pl-4 text-xs font-bold uppercase text-green-950 pt-4">
          configurações
        </span>
        <div className="flex w-full flex-col items-start">
        <button
            // href={path}
            className="
        focus:ring-complementary/80
        group
        flex
        h-11
        w-full
        items-center
        justify-start
        gap-3
        rounded-2xl
        bg-transparent
        px-4
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-background
        xl:h-10
    "
        >
            <SignOut
            weight="fill"
            className="
                  h-6
                  w-6
                     text-green-950
                      transition-colors
                      duration-200
                      group-hover:text-green-600
                "
            />
            <span
                className="
                      text-base
                      font-medium
                      text-green-950
                      transition-colors
                      duration-200
                      group-hover:text-green-600
                  "
            >
                Sair
            </span>
        </button>
        </div>
      </div>
    );
  };
  export default MobileMenu;