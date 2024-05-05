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
import Unidade from "@/types/unidade";



interface EditUnitProps {
    unit: Unidade;
    children: ReactNode;
}



const ViewUnitModal = ({children, unit}: EditUnitProps) => {
    const [open, setOpen] = useState(false);

    
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Unidades</DialogTitle>
                    <DialogDescription>Você está visualizando as informações da Unidade.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input disabled className=" col-span-2" id="nome" placeholder="Nome" value={unit.nome} />

                    <Input disabled className="col-span-1 " id="CEP" placeholder="CEP" value={unit.cep} />

                    <Input disabled className="col-span-1 " id="estado" placeholder="Estado" value={unit.estado}  />

                    <Input disabled className="col-span-1 " id="cidade" placeholder="Cidade" value={unit.cidade}  />

                    <Input disabled className="col-span-1 " id="bairro" placeholder="Bairro" value={unit.bairro} />

                    <Input disabled className="col-span-1 " id="logradouro" placeholder="Endereço" value={unit.logradouro} />

                    <Input disabled className="col-span-1 " id="numero" placeholder="Número" value={unit.numero} />

                    <Input disabled className="col-span-1 " id="complemento" placeholder="Complemento"  value={unit.complemento}/>

                    <Input disabled className="col-span-1 " id="empresa_nome" placeholder="Matriz" value={unit.empresa_nome}  />

                    <Input disabled className="col-span-1 " id="status" placeholder="Status" value={unit.status === 'A' ? 'Ativo' : 'Inativo'} />
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
export default ViewUnitModal;
