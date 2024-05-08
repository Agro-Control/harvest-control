import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetOrdemDeServico from "@/types/get-ordem-de-servico";

const getOrdersRequest = async (empresa_id: number | null, codigo: string | null, status: string | null) => {
  const { data } = await api.get<GetOrdemDeServico>("/ordens", {
    params: {
      empresa_id: empresa_id,
      codigo: codigo,
      status: status,
    },
  });
  return data;
};

export const useGetOrders = (empresa_id: number | null, status: string | null, codigo: string | null) => {
  return useQuery({
    queryKey: ["orders", empresa_id, codigo, status],
    queryFn: () => getOrdersRequest(empresa_id, codigo, status),
    retry: (failureCount, error) => {

      if (error instanceof Error && error.message.includes("404")) {
        if (failureCount == 3)
          return false;
      }

      return true;
    },
  });
};