import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Pencil } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import EditUnitModal from "./edit-unit-modal";
import ViewUnitModal from "./view-unit-modal";
import Unidade from "@/types/unidade";

interface UnitRowProps {
    unidade: Unidade;
    isAdm: boolean
}

const UnitRow = ({ unidade, isAdm }: UnitRowProps) => {

    return (
        <TableRow key={unidade.id}>
            <TableCell className="font-medium">{unidade.id}</TableCell>
            <TableCell className="font-medium">{unidade.nome}</TableCell>
            {isAdm && <TableCell className="font-medium">{unidade.empresa_nome}</TableCell>}
            <TableCell className="">{unidade.status}</TableCell>
            <TableCell className="w-28">
                <div className="-ml-1 flex w-full flex-row items-center gap-3">
                    <EditUnitModal unit={unidade}>
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </EditUnitModal>
                    <ViewUnitModal unit={unidade}>
                        <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                    </ViewUnitModal>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default UnitRow;