import {Icon as IconType} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface NavButtonProps {
    title: string;
    icon: IconType;
    path: string;
    havePerm: boolean | null;
}
export const NavButton = ({icon: Icon, title, path}: NavButtonProps) => {

    const pathname = usePathname();
    const isActive = pathname === path;
    
    const {t} = useTranslation();
    return (
        <Link
            href={path}
            className={`
            ${isActive ? "pointer-events-none" : ""}
            
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
            xl:h-10`}
        >
            <Icon
                weight="fill"
                className={`
                      h-6
                      w-6
                      text-green-950
                      transition-colors
                      duration-200
                    
                      ${isActive ? "pointer-events-none text-green-600" : ""}
                `}
            />
            <span
                className={`
                h-6
                text-green-950
                transition-colors
                duration-200
                w-full
                ${isActive ? "pointer-events-none text-green-600 w-full" : ""}
          `}
            >
                {t(title)}
            </span>
        </Link>
    );
};
