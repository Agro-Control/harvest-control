import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ReactNode} from "react";

interface DialogDemoProps {
    children: ReactNode;
}

const EditProfileModal = ({children}: DialogDemoProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Editar perfil</DialogTitle>
                    <DialogDescription>Edite as informações pessoais do seu perfil.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input
                        id="name"
                        placeholder="Nome"
                        className="col-span-2"
                    />
                    <Input
                        id="email"
                        placeholder="Email"
                        className="col-span-2 "
                    />
                    <Input
                        id="password"
                        placeholder="Senha Atual"
                        className="col-span-1 "
                    />
                    <Input
                        id="new-password"
                        placeholder="Nova Senha"
                        className="col-span-1 "
                    />
                </div>
                <DialogFooter>
                    <Button
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
export default EditProfileModal;
