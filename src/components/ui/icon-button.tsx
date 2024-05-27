import {Icon as IconType} from "@phosphor-icons/react";

interface IconButtonProps {
    Icon: IconType;
    handleButtonClick?: () => void;
}

export const IconButton = ({
    Icon,
    handleButtonClick,
}: IconButtonProps) => {
    return (
        <div
            className="
                relative
                flex
                h-11
                w-11
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-divider
                bg-transparent
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-tertiary
                focus:outline-none
                focus:ring-2
                focus:ring-complementary/80
                focus:ring-offset-2
                focus:ring-offset-background
            "
            onClick={handleButtonClick}
        >
            <div className="relative">
                <Icon className="h-5 w-5 text-green-950" />
               
            </div>
        </div>
    );
};