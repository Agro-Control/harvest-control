"use client";

import {UsersThree, User, EnvelopeSimple, IdentificationCard, Phone, SunHorizon, Factory} from "@phosphor-icons/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {MaskedInput} from "@/components/ui/masked-input";
import formatPhone from "@/utils/functions/formatPhone";
import formatCpf from "@/utils/functions/formatCpf";
import {useAuth} from "@/utils/hooks/useAuth";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";
import {InputMask} from "@react-input/mask";
import {Input} from "@/components/ui/input";
import Operador from "@/types/operador";
import {Gestor} from "@/types/gestor";
import {ReactNode} from "react";

interface EditUserProps {
    userInformation: Operador | Gestor;
    children: ReactNode;
}

const ViewUserModal = ({children, userInformation}: EditUserProps) => {
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";

    const {t} = useTranslation();
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Usuário</DialogTitle>
                    <DialogDescription>Você está visualizando as informações do usuário.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input
                        Icon={User}
                        disabled
                        value={userInformation.nome}
                        className=""
                        id="name"
                        placeholder="Nome"
                    />

                    <Input
                        disabled
                        Icon={UsersThree}
                        className=""
                        id="role"
                        placeholder="Cargo"
                        value={t(userInformation.tipo)}
                    />

                    {!isAdmin && <Input
                        disabled
                        Icon={SunHorizon}
                        className=""
                        id="role"
                        placeholder="Turno"
                        value={t(userInformation.turno)}
                    />}

                    <MaskedInput
                        maskInput={{
                            input: InputMask,
                            mask: "___.___.___-__",
                        }}
                        Icon={IdentificationCard}
                        id="identifier"
                        placeholder="CPF"
                        disabled
                        value={formatCpf(userInformation.cpf)}
                    />

                    <Input
                        disabled
                        value={userInformation.email || "Não Informado"}
                        Icon={EnvelopeSimple}
                        id="email"
                        placeholder="Email"
                    />

                    <MaskedInput
                        disabled
                        maskInput={{
                            input: InputMask,
                            mask: "(__) _____-____",
                        }}
                        Icon={Phone}
                        id="phone"
                        placeholder="Telefone"
                        value={formatPhone(userInformation.telefone)}
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                        >
                            Voltar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default ViewUserModal;
