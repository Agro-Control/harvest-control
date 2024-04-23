"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ReactNode, useState} from "react";
import Empresa from "@/types/empresa";
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
    User,
    EnvelopeSimple,
} from "@phosphor-icons/react";

interface EditCompanyProps {
    empresa: Empresa;
    children: ReactNode;
}

const ViewCompanyModal = ({children, empresa}: EditCompanyProps) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Empresa</DialogTitle>
                    <DialogDescription>Você está visualizando as informações da Empresa.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="col-span-2">
                        <Input Icon={Buildings} disabled placeholder="Nome" value={empresa.nome || "Não Informado"} />
                    </div>

                    <Input
                        disabled
                        Icon={IdentificationCard}
                        className="col-span-1 "
                        id="cnpj"
                        placeholder="CNPJ"
                        value={empresa.cnpj || "Não Informado"}
                    />

                    <Input
                        Icon={Phone}
                        disabled
                        className="col-span-1 "
                        id="telefone"
                        placeholder="Telefone da Empresa"
                        value={empresa.telefone}
                    />

                    <Input
                        disabled
                        Icon={NavigationArrow}
                        className="col-span-1 "
                        id="CEP"
                        placeholder="CEP"
                        value={empresa.cep || "Não Informado"}
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
                    Icon={User}
                        disabled
                        className="col-span-1"
                        id="nomeResponsavel"
                        placeholder="Nome Responsável"
                        value={empresa.nome_responsavel || "Não Informado"}
                    />

                    <Input
                    Icon={EnvelopeSimple}
                        disabled
                        className="col-span-1"
                        id="emailResponsavel"
                        placeholder="Email Responsável"
                        value={empresa.email_responsavel || "Não Informado"}
                    />

                    <Input
                    Icon={Phone}
                        disabled
                        className="col-span-1"
                        id="telefoneResponsavel"
                        placeholder="Telefone Responsável"
                        value={empresa.telefone_responsavel || "Não Informado"}
                    />
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleClose}
                        type="submit"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default ViewCompanyModal;
