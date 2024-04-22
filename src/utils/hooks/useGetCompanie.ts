import {useQuery} from "@tanstack/react-query";
import {api} from "@/lib/api";
import Empresa from "@/types/empresa";

const getCompanieRequest = async (id: number) => {
    try {
        const response = await api.get("/empresas/", {
            params: {
                id: id
            },
        });
        if (response.data && response.data.empresas && response.data.empresas.length > 0) {
            
            return response.data.empresas[0];
        } else {
            throw new Error("Empresa não encontrada");
        }
    } catch (error) {
        // Se ocorrer um erro na solicitação, lance-o para ser tratado no componente que chama o hook
        throw error;
    }
};

export const useGetCompanie = (id: number) => {
    return useQuery({
        queryKey: ["companie"],
        queryFn: () => getCompanieRequest(id),
    });
};