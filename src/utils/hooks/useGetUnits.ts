import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetUnidade from "@/types/get-unidade";

const getUnitsRequest = async (id_empresa: number | null, codigo: string | null, status: string | null) => {
  const { data } = await api.get<GetUnidade>("/unidades", {
    params: {
      id_empresa: id_empresa,
      codigo: codigo,
      status: status,
    },
  });
  return data;
};

export const useGetUnits = (enableFlag: boolean, id_empresa: number | null, status: string | null, codigo: string | null) => {
  return useQuery({
    queryKey: ["units", id_empresa, codigo, status],
    queryFn: () => getUnitsRequest(id_empresa, codigo, status),
    enabled: enableFlag,
    retry: (failureCount, error) => {

      if (error instanceof Error && error.message.includes("404")) {
        if (failureCount == 3)
          return false;
      }

      return true;
    },
  });
};


