import * as React from "react";

import { cn } from "@/lib/utils"
import {MagnifyingGlass} from "@phosphor-icons/react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    return (
      <div className="w-full relative">
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
           <MagnifyingGlass className="h-5 w-5" color="#052e14" />
          </div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-xl border border-divider bg-white  py-2 px-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pl-9",
            className
          )}
          ref={ref}
          {...props}
        />
      
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
