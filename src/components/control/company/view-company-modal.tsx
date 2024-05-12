"use client";
import {
    Buildings,
    IdentificationCard,
    Phone,
    MapPin,
    MapTrifold,
    NavigationArrow,
    Factory,
    House,
    Hash,
    Flag,
    UserPlus,
} from "@phosphor-icons/react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputMask } from "@react-input/mask";
import Empresa from "@/types/empresa";
import { ReactNode } from "react";
import { MaskedInput } from "@/components/ui/masked-input";
import formatCnpj from "@/utils/functions/formatCnpj";
import formatPhone from "@/utils/functions/formatPhone";
import formatCep from "@/utils/functions/formatCep";

interface EditCompanyProps {
    empresa: Empresa;
    children: ReactNode;
}

const ViewCompanyModal = ({ children, empresa }: EditCompanyProps) => {

  


    return (
        <Dialog >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Empresa</DialogTitle>
                    <DialogDescription>Você está visualizando as informações da Empresa.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="col-span-2">
                        <Input Icon={Buildings} disabled placeholder="Nome" value={empresa.nome || "Não Informado"} />
                    </div>

                    <MaskedInput
                        disabled
                        Icon={IdentificationCard}
                        className="col-span-1 "
                        id="cnpj"
                        placeholder="CNPJ"
                        value={formatCnpj(empresa.cnpj)}
                        maskInput={{ input: InputMask, mask: "__.___.___/____-__" }}
                    />

                    <MaskedInput
                        disabled
                        value={formatPhone(empresa.telefone)}
                        Icon={Phone}
                        placeholder="Telefone da Empresa"
                        maskInput={{
                            input: InputMask,
                            mask: "(__) _____-____",
                        }}
                    />

                    <MaskedInput
                        disabled
                        Icon={NavigationArrow}
                        className="col-span-1 "
                        id="CEP"
                        placeholder="CEP"
                        value={formatCep(empresa.cep)}
                        maskInput={{
                            input: InputMask,
                            mask: "_____-___",
                        }}
                    />

                    <Input
                        Icon={MapTrifold}
                        disabled
                        className="col-span-1 "
                        id="estado"
                        placeholder="Estado"
                        value={empresa.estado || "Não Informado"}
                    />

                    <Input
                        disabled
                        Icon={MapPin}
                        className="col-span-1 "
                        id="cidade"
                        placeholder="Cidade"
                        value={empresa.cidade || "Não Informado"}
                    />

                    <Input
                        Icon={Factory}
                        disabled
                        className="col-span-1 "
                        id="bairro"
                        placeholder="Bairro"
                        value={empresa.bairro || "Não Informado"}
                    />

                    <Input
                        Icon={House}
                        disabled
                        className="col-span-1 "
                        id="logradouro"
                        placeholder="Endereço"
                        value={empresa.logradouro || "Não Informado"}
                    />

                    <Input
                        Icon={Hash}
                        disabled
                        className="col-span-1 "
                        id="numero"
                        placeholder="Número"
                        value={empresa.numero || "Não Informado"}
                    />

                    <Input
                        Icon={Flag}
                        disabled
                        className="col-span-1 "
                        id="complemento"
                        placeholder="Complemento"
                        value={empresa.complemento || "Não Informado"}
                    />

                    <Input
                        Icon={UserPlus}
                        disabled
                        className="col-span-1 "
                        id="gestor_id"
                        placeholder="Gestor"
                        value={empresa.gestor_id || "Não Informado"}
                    />


                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                        >
                            Confirmar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default ViewCompanyModal;
