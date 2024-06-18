import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Pencil } from "@phosphor-icons/react";
import EditFieldModal from "./edit-field-modal";
import ViewFieldModal from "./view-field-modal";
import { useTranslation } from "react-i18next";
import Talhao from "@/types/talhao";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import GetTalhao from "@/types/get-talhao";

interface FieldRowProps {
    talhao: Talhao;
    refetchFields: (options?: RefetchOptions) => Promise<QueryObserverResult<GetTalhao, Error>>
}
const FieldRow = ({ talhao, refetchFields}: FieldRowProps) => {
    const {t} = useTranslation();

    return (
        <TableRow key={talhao.id}>
            <TableCell className="font-medium">{talhao.codigo}</TableCell>
            <TableCell className="font-medium">{talhao.tamanho + " ha"}</TableCell>
            <TableCell className="">{t(talhao.status)}</TableCell>
            <TableCell className="w-28">
                <div className="-ml-1 flex w-full flex-row items-center gap-3">
                    <EditFieldModal field={talhao} refetchFields={refetchFields}>
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </EditFieldModal>
                    <ViewFieldModal field={talhao}>
                        <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                    </ViewFieldModal>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default FieldRow;