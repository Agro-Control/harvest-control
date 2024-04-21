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
import {ReactNode, useEffect} from "react";
import Talhao from "@/types/talhao";
import { useGetCompanie } from "@/utils/hooks/useGetCompanie";



interface EditFieldProps {
    field: Talhao;
    children: ReactNode;
}




const ViewFieldModal = ({children, field}: EditFieldProps) => {

    const {
        data: empresa, 
        error, 
        isError, 
        isLoading, 
        refetch, 
        isRefetching, 
    } = useGetCompanie(field.empresa_id);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Talhão</DialogTitle>
                    <DialogDescription>Você está visualizando as informações do Talhão.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input disabled className=" col-span-2" id="codigo" placeholder="Codigo" value={field.codigo} />
                    <Input disabled className="col-span-1 " id="tamanho" placeholder="Tamanho" value={field.tamanho + "ha"} />
                    <Input disabled className="col-span-1 " id="Empresa" placeholder="Empresa" value={empresa?.nome} />
                    <Input disabled className="col-span-1 " id="status" placeholder="Status" value={field.status === 'A' ? 'Ativo' : 'Inativo'} />
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
export default ViewFieldModal;
