
import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import { Gestor } from '@/types/gestor';
import Operador from "@/types/operador";


interface UsersListProps {
    usuarios: Operador[] | Gestor[];
}

const UsersList = ({usuarios}: UsersListProps) => {
    const {t} = useTranslation();

    return (
        <TableBody>
        {usuarios.map((user, index) => {
            return (
                <TableRow key={index}>
                    <TableCell className="font-medium max-w-48">{user.matricula || "Não Possuí"}</TableCell>
                    <TableCell className="font-medium">{user.nome}</TableCell>
                    <TableCell className="">{t(user.tipo)}</TableCell>
                    <TableCell className="">{t(user.status)}</TableCell>
                    <TableCell className="">{format(user.data_contratacao, "dd/MM/yyyy")}</TableCell>
                    <TableCell className="">{t(user.turno) || "Não Possuí"}</TableCell>
                    <TableCell className="w-28">
                        {/* <div className="-ml-1 flex w-full flex-row items-center gap-3">
                            <EditUserModal userInformation={user}>
                                <Pencil
                                    className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                                    weight="fill"
                                />
                            </EditUserModal>
                            <ViewUserModal userInformation={user}>
                                <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                            </ViewUserModal>
                        </div> */}
                    </TableCell>
                </TableRow>
            );
        })}
    </TableBody>
    )

}

export default UsersList

