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
import { useGetCompanie } from "@/utils/hooks/useGetCompanie";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Talhao from "@/types/talhao";
import { useGetUnit } from "@/utils/hooks/useGetUnit";



interface EditFieldProps {
    field: Talhao;
    children: ReactNode;
}




const ViewFieldModal = ({ children, field }: EditFieldProps) => {
    const [open, setOpen] = useState(false);
    const {
        data: unidade,
        error,
        isError,
        isLoading,
        refetch,
        isRefetching,
    } = useGetUnit(field.unidade_id);

    useEffect(() => {
        if (open && !isLoading && !isRefetching) {
            refetch(); 
        }
    }, [open]);
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Talhão</DialogTitle>
                    <DialogDescription>Você está visualizando as informações do Talhão.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input disabled className=" col-span-2" id="codigo" placeholder="Codigo" value={field.codigo} />
                    <Input disabled className="col-span-1 " id="tamanho" placeholder="Tamanho" value={field.tamanho + " ha"} />
                    <Input disabled className="col-span-1 " id="Empresa" placeholder="Empresa" value={!isLoading && unidade?.nome}/>
                    <Input disabled className="col-span-1 " id="status" placeholder="Status" value={field.status === 'A' ? 'Ativo' : 'Inativo'} />
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
export default ViewFieldModal;
