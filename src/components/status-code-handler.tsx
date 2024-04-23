import { useTranslation } from "react-i18next";
import {AxiosError} from "axios";

interface StatusCodeHandlerProps {
    requisitionType: string;
    error: AxiosError;
}

/**
 * Componente que renderiza a mensagem de erro de acordo com o status da requisição e o tipo de requisição
 */
const StatusCodeHandler = ({requisitionType, error}: StatusCodeHandlerProps) => {
    // Hook que pega a função de tradução
    const {t} = useTranslation();

    // Se não tiver resposta, não renderiza nada
    //TODO: Verificar se é necessário ou renderizar algo genérico
    const {response} = error;
    if(!response) return;

    // Pega o status da resposta
    const { status } = response;

    // Mensagem de erro de acordo com o tipo de requisição e o status code
    const errorMessage = `${requisitionType}-error-${status}`

    return (
        <div className="flex w-full items-center justify-center font-medium">{t(errorMessage)}</div>
    );
};
export default StatusCodeHandler;
