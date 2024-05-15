import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import GetUnidade from "@/types/get-unidade";

const getUnitsRequest = async (empresa_id: number | null, grupo_id: number | null, codigo: string | null, status: string | null) => {
  const { data } = await api.get<GetUnidade>("/unidades", {
    params: {
      empresa_id: empresa_id,
      grupo_id: grupo_id,
      codigo: codigo,
      status: status,
    },
  });
  return data;
};

export const useGetUnits = (enableFlag: boolean, empresa_id: number | null, grupo_id: number | null, status: string | null, codigo: string | null) => {
  return useQuery({
    queryKey: ["units", empresa_id, grupo_id, codigo, status],
    queryFn: () => getUnitsRequest(empresa_id, grupo_id, codigo, status),
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


