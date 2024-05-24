import { TableCell, TableRow } from "@/components/ui/table";
import Evento from "@/types/evento";
import formatDate from "@/utils/formatDate";
import { useTranslation } from "react-i18next";


interface EventRowProps {
    evento: Evento
}
const ReportRow = ({ evento}: EventRowProps) => {
    const {t} = useTranslation();

    return (
        <TableRow key={evento.id}>
            <TableCell className="font-medium">{evento.id}</TableCell>
            <TableCell className="font-medium">{evento.nome}</TableCell>
            <TableCell className="font-medium">{formatDate(evento.data_inicio!)}</TableCell>
            <TableCell className="font-medium">{formatDate(evento.data_fim!)}</TableCell>
            <TableCell className="font-medium">{evento.duracao + "segs"}</TableCell>
        </TableRow>
    );
};

export default ReportRow;