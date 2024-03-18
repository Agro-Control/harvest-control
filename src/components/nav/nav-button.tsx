// "use client";

import {Icon} from "@phosphor-icons/react";
import {usePathname} from "next/navigation";

interface NavButtonProps {
    title: string;
    Icon: Icon;
    path: string;
}

const NavButton = ({Icon, title, path}: NavButtonProps) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    const activeStyle = isActive
        ? "border-l-[5px] flex h-[46px] w-full cursor-pointer flex-row items-center justify-start gap-3 rounded-md rounded-r-xl border-green-600 px-6 transition-colors pointer-events-none bg-divider select-none"
        : "flex h-[46px] w-full cursor-pointer flex-row items-center justify-start gap-3 rounded-xl px-6 transition-colors  hover:bg-divider  select-none ";

    return (
        <div className={`${activeStyle}`}>
            <Icon className="h-6 w-6" weight="fill" color="#052e14" />
            <p className="text-md font-jakarta font-medium  text-green-950 ">{title}</p>
        </div>
    );
};
export default NavButton;
