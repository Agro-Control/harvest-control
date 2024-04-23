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

interface EditUserProps {
    userInformation: {
        matricula: string;
        name: string;
        status: string;
        profile: string;
        contract: string;
    };
    children: ReactNode;
}

const ViewUserModal = ({children, userInformation}: EditUserProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Usuário</DialogTitle>
                    <DialogDescription>Você está visualizando as informações do usuário.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input disabled className=" col-span-1" id="name" placeholder="Nome" value={userInformation.name} />

                    <Input
                        disabled
                        className="col-span-1 "
                        id="role"
                        placeholder="Cargo"
                        value={userInformation.name}
                    />

                    <Input disabled className="col-span-2 " id="email" placeholder="Email" />

                    <Input disabled className="col-span-1 " id="identifier" placeholder="CPF" />

                    <Input disabled className="col-span-1 " id="phone" placeholder="Telefone" />

                    <Input disabled className="col-span-1 " id="address" placeholder="CEP" />

                    <Input disabled className="col-span-1 " id="state" placeholder="Estado" />

                    <Input disabled className="col-span-1 " id="city" placeholder="Cidade" />

                    <Input disabled className="col-span-1 " id="neighborhood" placeholder="Bairro" />

                    <Input disabled className="col-span-1 " id="street" placeholder="Rua" />

                    <Input disabled className="col-span-1 " id="number" placeholder="Número" />

                    <Input disabled className="col-span-1 " id="company" placeholder="Empresa" />
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
export default ViewUserModal;
