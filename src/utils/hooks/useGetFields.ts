import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetTalhao from "@/types/get-talhao";

const getFieldsRequest = async (codigo: string | null, status: string | null) => {
    const { data } = await api.get<GetTalhao>("/talhoes", {
        params: {
            codigo: codigo,
            status: status,
        },
    });
    return data;
};

export const useGetFields = (status: string | null, codigo: string | null) => {
    return useQuery({
        queryKey: ["fields", codigo, status],
        queryFn: () => getFieldsRequest(codigo, status),
        retry: (failureCount, error) => {

            if (error instanceof Error && error.message.includes("404")) {
                if (failureCount == 3)
                    return false;
            }

            return true;
        },
    });
};