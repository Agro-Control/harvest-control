"use client";

// import {IconType} from "@lib";
import {Horse, ChartPie} from "@phosphor-icons/react";

// interface NavButtonProps {
//     Icon: IconType;
// }

const NavButton = () => {
    return (
        <div className="flex h-[40px] w-full cursor-pointer flex-row items-center justify-start gap-2 px-3 rounded-xl transition-colors  hover:bg-divider ">
            <ChartPie className="h-6 w-6" />
            <p className="font-jakarta text-lg text-green-950">Dashboard</p>
        </div>
    );
};
export default NavButton;
