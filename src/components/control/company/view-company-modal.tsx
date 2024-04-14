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
import {ReactNode} from "react";
import Empresa from "@/types/empresa";

interface EditCompanyProps {
    empresa: Empresa;
    children: ReactNode;
}



const ViewCompanyModal = ({children, empresa}: EditCompanyProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Empresas</DialogTitle>
                    <DialogDescription>Você está visualizando as informações da Empresa.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input disabled className=" col-span-2" id="nome" placeholder="Nome" value={empresa.nome} />
                    <Input disabled className="col-span-1 " id="cnpj" placeholder="CNPJ" value={empresa.cnpj} />

                    <Input disabled className="col-span-1 " id="telefone" placeholder="Telefone da Empresa" value={empresa.telefone}  />

                    <Input disabled className="col-span-1 " id="CEP" placeholder="CEP" value={empresa.cep} />

                    <Input disabled className="col-span-1 " id="estado" placeholder="Estado" value={empresa.estado}  />

                    <Input disabled className="col-span-1 " id="cidade" placeholder="Cidade" value={empresa.cidade}  />

                    <Input disabled className="col-span-1 " id="bairro" placeholder="Bairro" value={empresa.bairro} />

                    <Input disabled className="col-span-1 " id="logradouro" placeholder="Endereço" value={empresa.logradouro} />

                    <Input disabled className="col-span-1 " id="numero" placeholder="Número" value={empresa.numero} />

                    <Input disabled className="col-span-1 " id="complemento" placeholder="Complemento"  value={empresa.complemento}/>

                    <Input disabled className="col-span-1 " id="nomeResponsavel" placeholder="Nome Responsável" value={empresa.nome_responsavel}  />

                    <Input disabled className="col-span-1 " id="emailResponsavel" placeholder="Email Responsável" value={empresa.email_responsavel} />

                    <Input disabled className="col-span-1 " id="telefoneResponsavel" placeholder="Telefone Responsável" value={empresa.telefone_responsavel} />
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        form="user-form"
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
