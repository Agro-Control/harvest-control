import {Icon as IconType} from "@phosphor-icons/react";
import {InputMask, useMask} from "@react-input/mask";
import * as React from "react";
import {cn} from "@/lib/utils";

interface MaskProps {
    mask: string;
    input: typeof InputMask;
}
export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    maskInput?: MaskProps;
    Icon?: IconType;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
    ({className, maskInput, Icon, type, ...props}, ref) => {
        const inputRef = useMask({
            mask: maskInput?.mask,
            replacement: {_: /\d/},
        });

        const setRefs = (inputElement: HTMLInputElement) => {
            inputRef.current = inputElement;

            if (typeof ref === "function") {
                ref(inputElement);
            } else if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement>).current = inputElement;
            }
        };

        return (
            <div className="relative w-full">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 transform ">
                    <Icon className="h-5 w-5 text-green-950" />
                </div>
            )}
            <input
                type={type}
                className={cn(
                    `flex h-10 w-full rounded-xl border border-divider bg-white ${Icon ? "pl-10" : "px-4"} pr-4 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50`,
                    className,
                )}
                ref={setRefs}
                {...props}
            />
        </div>
        );
    },
);
MaskedInput.displayName = "MaskedInput";

export {MaskedInput};
