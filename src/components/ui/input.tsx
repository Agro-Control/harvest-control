import {Icon as IconType} from "@phosphor-icons/react";
import * as React from "react";
import {cn} from "@/lib/utils";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon?: IconType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, Icon, type, ...props}, ref) => {
    return (
        <div className="relative w-full">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 transform z-50 ">
                    <Icon className="h-5 w-5 text-green-950" />
                </div>
            )}
            <input
                type={type}
                className={cn(
                    `flex h-10 w-full rounded-xl border border-divider bg-white ${Icon ? "pl-10" : "px-4"} pr-4 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50`,
                    className,
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});
Input.displayName = "Input";

export {Input};
