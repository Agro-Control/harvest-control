import EditCompanyModal from "@/components/control/company/edit-company-modal";
import ViewCompanyModal from "@/components/control/company/view-company-modal";
import {TableCell, TableRow} from "@/components/ui/table";
import {Eye, Pencil} from "@phosphor-icons/react";
import Empresa from "@/types/empresa";


interface CompanyRowProps {
    empresa: Empresa;
}

const CompanyRow = ({empresa}: CompanyRowProps) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{empresa.cnpj}</TableCell>
            <TableCell className="font-medium">{empresa.nome}</TableCell>
            <TableCell className="font-medium">{empresa.cidade}</TableCell>
            <TableCell className="">{empresa.estado}</TableCell>
            <TableCell className="">{empresa.status}</TableCell>
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
