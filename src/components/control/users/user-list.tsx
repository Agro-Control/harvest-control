import {QueryObserverResult, RefetchOptions, useMutation, useQueryClient} from "@tanstack/react-query";
import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import EditUserModal from "@/components/control/edit-user-modal";
import ViewUserModal from "@/components/control/view-user-modal";
import {Pencil, Eye} from "@phosphor-icons/react";
import GetOperador from "@/types/get-operador";
import {useTranslation} from "react-i18next";
import GetGestor from "@/types/get-gestor";
import Operador from "@/types/operador";
import {Gestor} from "@/types/gestor";
import {format} from "date-fns";

interface UsersListProps {
    usuarios: Operador[] | Gestor[];
    refetchOperators?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetOperador, Error>>;
    refetchManager?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetGestor, Error>>;
    managerList?: boolean;
}

const UsersList = ({usuarios, refetchOperators, refetchManager, managerList = false}: UsersListProps) => {
    const {t} = useTranslation();

    return (
        <TableBody>
            {usuarios.map((user, index) => {
                return (
                    <TableRow key={index}>
                        {!managerList && (
                            <TableCell className="max-w-48 font-medium">{user.matricula || "Não Possuí"}</TableCell>
                        )}
                        <TableCell className="font-medium">{user.nome}</TableCell>
                        <TableCell className="">{t(user.tipo)}</TableCell>
                        <TableCell className="">{t(user.status)}</TableCell>
                        <TableCell className="">{format(user.data_contratacao, "dd/MM/yyyy")}</TableCell>
                        {!managerList && <TableCell className="">{t(user.turno) || "Não Possuí"}</TableCell>}
                        <TableCell className="">{managerList ? user.empresa : user.unidade}</TableCell>
                        <TableCell className="w-28">
                            <div className="-ml-1 flex w-full flex-row items-center gap-3">
                                {user.status === "A" && (
                                    <EditUserModal
                                        refetchOperators={refetchOperators}
                                        refetchManager={refetchManager}
                                        userInformation={user}
                                    >
                                        <Pencil
                                            className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900"
                                            weight="fill"
                                        />
                                    </EditUserModal>
                                )}
                                <ViewUserModal userInformation={user}>
                                    <Eye className="h-5 w-5 cursor-pointer text-black-950 transition-colors hover:text-green-900" />
                                </ViewUserModal>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export default UsersList;
