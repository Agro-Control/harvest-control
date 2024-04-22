import * as React from "react";

import {cn} from "@/lib/utils";
import {InputMask, useMask} from "@react-input/mask";

interface MaskProps {
    mask: string;
    input: typeof InputMask;
}
export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    maskInput?: MaskProps;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
    ({className, maskInput, type, ...props}, ref) => {
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
            <input
                className={cn(
                    "flex h-10 w-full rounded-xl border border-divider bg-white  px-4 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-800 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",

                    className,
                )}
                ref={setRefs}
                {...props}
            />
        );
    },
);
MaskedInput.displayName = "MaskedInput";

export {MaskedInput};
