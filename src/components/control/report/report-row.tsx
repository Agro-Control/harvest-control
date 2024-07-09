import { TableCell, TableRow } from "@/components/ui/table";
import Evento from "@/types/evento";
import useFormattedDate from "@/utils/formatDate";
import { useTranslation } from "react-i18next";
import formatDuration from "@/utils/functions/formatDuration";


interface EventRowProps {
    evento: Evento
}
const ReportRow = ({ evento}: EventRowProps) => {
    const {t} = useTranslation();
    const formatDate = useFormattedDate();

    return (
        <TableRow key={evento.id}>
            <TableCell className="font-medium">{evento.operador_nome || "Não Informado"}</TableCell>
            <TableCell className="font-medium">{t(evento.nome!)}</TableCell>
            <TableCell className="font-medium">{formatDate(evento.data_inicio! as string | Date)}</TableCell>
            <TableCell className="font-medium">{formatDate(evento.data_fim!)}</TableCell>
            <TableCell className="font-medium">{formatDuration(evento.duracao!)}</TableCell>
        </TableRow>
    );
};

export default ReportRow;