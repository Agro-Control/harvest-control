import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Icon as IconType} from "@phosphor-icons/react";
import * as React from "react";
import {cn} from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon?: IconType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, Icon, type, ...props}, ref) => {
    return (
        <TooltipProvider delayDuration={200}>
            <div className="relative w-full">
                {Icon && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="absolute left-3 top-1/2 z-50 -translate-y-1/2 transform cursor-pointer">
                                <Icon className="h-5 w-5 text-green-950" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{props.placeholder}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
                <input
                    type={type}
                    className={cn(
                        `flex h-10 w-full rounded-xl border border-divider bg-white ${Icon ? "pl-10" : "px-4"} py-2 pr-4 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50`,
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        </TooltipProvider>
    );
});
Input.displayName = "Input";

export {Input};
