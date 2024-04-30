import {Button} from "./ui/button";
import {
   
    CircleNotch
} from "@phosphor-icons/react";

interface SubmitButtonProps {
    isLoading: boolean;
    form: string;
}



const SubmitButton = ({isLoading = false, form}: SubmitButtonProps) => {

    
    return (
        <Button
            type="submit"
            form={form}
            className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600 min-w-[104px] "
        >
           { isLoading ?  <CircleNotch className="h-5 w-5 animate-spin" /> :  "Confirmar"}
        </Button>
    );
};

export default SubmitButton;
