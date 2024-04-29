import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetOrdemDeServico from "@/types/get-ordem-de-servico";

const getOrdersRequest = async (id_empresa: number | null, codigo: string | null, status: string | null) => {
  const { data } = await api.get<GetOrdemDeServico>("/ordens", {
    params: {
      id_empresa: id_empresa,
      codigo: codigo,
      status: status,
    },
  });
  return data;
};

export const useGetOrders = (id_empresa: number | null, status: string | null, codigo: string | null) => {
  return useQuery({
    queryKey: ["orders", id_empresa, codigo, status],
    queryFn: () => getOrdersRequest(id_empresa, codigo, status),
    retry: (failureCount, error) => {

      if (error instanceof Error && error.message.includes("404")) {
        if (failureCount == 3)
          return false;
      }

      return true;
    },
  });
};