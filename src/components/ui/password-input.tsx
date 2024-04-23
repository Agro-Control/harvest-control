import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Eye, EyeClosed, LockKey} from "@phosphor-icons/react";
import {useState} from "react";
import * as React from "react";
import {cn} from "@/lib/utils";



export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({className, type, ...props}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <TooltipProvider delayDuration={200}> 
        <div className="relative w-full">
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="absolute left-3 top-1/2 z-50 -translate-y-1/2 transform cursor-pointer">
                    <LockKey className="h-5 w-5 text-green-950" />

                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{props.placeholder}</p>
                </TooltipContent>
            </Tooltip>
           
            <div
                className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <Eye className="h-5 w-5" color="#052e14" />
                ) : (
                    <EyeClosed className="h-5 w-5" color="#052e14" />
                )}
            </div>
            <input
                type={showPassword ? "text" : "password"}
                className={cn(
                    "flex h-10 w-full rounded-xl border border-divider bg-white   py-2 pr-9 pl-10  text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
            />
        </div>
        </TooltipProvider> 
    );
});
PasswordInput.displayName = "PasswordInput";

export {PasswordInput};
