import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Pencil, ChartLine } from "@phosphor-icons/react";
import EditFieldModal from "./edit-field-modal";
import ViewFieldModal from "./view-field-modal";
import { useTranslation } from "react-i18next";
import Talhao from "@/types/talhao";
import ViewFieldDetails from "./view-field-details";

interface FieldRowProps {
    talhao: Talhao;
}
const FieldRow = ({ talhao }: FieldRowProps) => {
    const {t} = useTranslation();

    return (
        <TableRow key={talhao.id}>
            <TableCell className="font-medium">{talhao.codigo}</TableCell>
            <TableCell className="font-medium">{talhao.tamanho + " ha"}</TableCell>
            <TableCell className="">{t(talhao.status)}</TableCell>
            <TableCell className="w-28">
                <div className="-ml-1 flex w-full flex-row items-center gap-3">
                    <EditFieldModal field={talhao}>
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </EditFieldModal>
                    <ViewFieldModal field={talhao}>
                        <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                    </ViewFieldModal>
                    <ViewFieldDetails field={talhao}>
                        <ChartLine
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </ViewFieldDetails>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default FieldRow;