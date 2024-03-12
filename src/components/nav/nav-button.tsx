// "use client";

import {Icon} from "@phosphor-icons/react";

interface NavButtonProps {
    title: string;
    Icon: Icon;
}

const NavButton = ({Icon, title}: NavButtonProps) => {
    return (
        <div className="flex h-[46px] w-full cursor-pointer flex-row items-center justify-start gap-3 rounded-xl px-6 transition-colors  hover:bg-divider ">
            <Icon className="h-6 w-6" weight="fill" color="#052e14" />
            <p className="font-jakarta text-md font-medium text-green-950">{title}</p>
        </div>
    );
};
export default NavButton;
