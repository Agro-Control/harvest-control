import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Pencil } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import OrdemServico from "@/types/ordem-de-servico";
import useFormattedDate from "@/utils/formatDate";

interface OrderRowProps {
    ordem: OrdemServico;
}
const OrdersRow = ({ ordem }: OrderRowProps) => {
    const {t} = useTranslation();
    const formatDate = useFormattedDate();


    return (
        <TableRow key={ordem.id}>
            <TableCell className="font-medium">{ordem.id}</TableCell>
            <TableCell className="font-medium">{ordem.id_maquina}</TableCell>
            <TableCell className="">{formatDate(ordem.data_inicio)}</TableCell>
            <TableCell className="">{formatDate(ordem.data_fim)}</TableCell>
            <TableCell className="">{t(ordem.status)}</TableCell>
           {/*<TableCell className="w-28">
                <div className="-ml-1 flex w-full flex-row items-center gap-3">
                    <EditFieldModal order={ordem}>
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </EditFieldModal>
                    <ViewFieldModal order={ordem}>
                        <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                    </ViewFieldModal>
                </div>
            </TableCell>*/}
        </TableRow>
    );
};

export default OrdersRow;