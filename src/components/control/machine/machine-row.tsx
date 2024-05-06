import useFormattedDate from "@/utils/formatDate";
import { useTranslation } from "react-i18next";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Pencil } from "@phosphor-icons/react";
import Maquina from "@/types/maquina";
import EditMachineModal from "./edit-machine-modal";
import ViewMachineModal from "./view-machine-modal";

interface FieldRowProps {
    maquina: Maquina;
}
const MachineRow = ({ maquina }: FieldRowProps) => {
    const { t } = useTranslation();
    const formatDate = useFormattedDate();

    return (
        <TableRow key={maquina.id}>
            <TableCell className="font-medium">{maquina.nome}</TableCell>
            <TableCell className="font-medium">{maquina.modelo}</TableCell>
            <TableCell className="">{maquina.fabricante}</TableCell>
            <TableCell className="">{formatDate(maquina.data_aquisicao!)}</TableCell>
            <TableCell className="">{t(maquina.status!)}</TableCell>
            <TableCell className="w-28">
                <div className="-ml-1 flex w-full flex-row items-center gap-3">
                    <EditMachineModal maquina={maquina}>
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </EditMachineModal>
                    <ViewMachineModal machine={maquina}>
                        <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                    </ViewMachineModal>
                </div>
            </TableCell>
        </TableRow>

    );
};

export default MachineRow;