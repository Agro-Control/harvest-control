import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Pencil } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import OrdemServico from "@/types/ordem-de-servico";
import useFormattedDate from "@/utils/formatDate";
import EditOrderModal from "./edit-order-modal";
import ViewOrderModal from "./view-order-modal";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import GetOrdemDeServico from "@/types/get-ordem-de-servico";

interface OrderRowProps {
    ordem: OrdemServico;
    refetchOrders?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetOrdemDeServico, Error>>;
}
const OrdersRow = ({ ordem, refetchOrders }: OrderRowProps) => {
    const { t } = useTranslation();
    const formatDate = useFormattedDate();


    return (
        <TableRow key={ordem.id}>
            <TableCell className="font-medium">{ordem.id}</TableCell>
            <TableCell className="font-medium">{ordem.nome_maquina}</TableCell>
            <TableCell className="">{formatDate(ordem.data_inicio!)}</TableCell>
            <TableCell className="">{formatDate(ordem.data_previsao_fim!)}</TableCell>
            <TableCell className="">{formatDate(ordem.data_fim!)}</TableCell>
            <TableCell className="">{t(ordem.status!)}</TableCell>
            <TableCell className="w-28">
                <div className="-ml-1 flex w-full flex-row items-center gap-3">
                   {ordem.status != "C" && ordem.status != "F" && ordem.status != "E"  && <EditOrderModal ordem={ordem} refetchOrders={refetchOrders}>
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </EditOrderModal>}
                    <ViewOrderModal ordem={ordem}>
                        <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                    </ViewOrderModal>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default OrdersRow;