import EditCompanyModal from "@/components/control/company/edit-company-modal";
import ViewCompanyModal from "@/components/control/company/view-company-modal";
import {TableCell, TableRow} from "@/components/ui/table";
import {Eye, Pencil} from "@phosphor-icons/react";
import Empresa from "@/types/empresa";
import {useTranslation} from "react-i18next";

interface CompanyRowProps {
    empresa: Empresa;
}

const CompanyRow = ({empresa}: CompanyRowProps) => {
    const {t} = useTranslation();
    const formattedCnpj = empresa.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

    return (
        <TableRow>
            <TableCell className="font-medium">{formattedCnpj}</TableCell>
            <TableCell className="font-medium">{empresa.nome}</TableCell>
            <TableCell className="font-medium">{empresa.cidade}</TableCell>
            <TableCell className="">{t(empresa.estado)}</TableCell>
            <TableCell className="">{t(empresa.status)}</TableCell>
            <TableCell className="w-28">
                <div className="-ml-1 flex w-full flex-row items-center gap-3">
                    <EditCompanyModal company={empresa}>
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                            weight="fill"
                        />
                    </EditCompanyModal>
                    <ViewCompanyModal empresa={empresa}>
                        <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                    </ViewCompanyModal>
                </div>
            </TableCell>
        </TableRow>
    );
};
export default CompanyRow;
