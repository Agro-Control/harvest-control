import {AxiosError} from "axios";
import { useTranslation } from "react-i18next";

interface StatusCodeHandlerProps {
    requisitionType: string;
    error: AxiosError;
}

const StatusCodeHandler = ({requisitionType, error}: StatusCodeHandlerProps) => {
    const {t} = useTranslation();
    const {response} = error;
    
    if(!response) return;

    const { status } = response;
    const errorMessage = `${requisitionType}-error-${status}`

    return (
        <div className="flex w-full items-center justify-center font-medium">{t(errorMessage)}</div>
    );
};
export default StatusCodeHandler;
