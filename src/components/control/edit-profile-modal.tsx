import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {PasswordInput} from "@/components/ui/password-input";
import {EnvelopeSimple, User} from "@phosphor-icons/react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {ReactNode} from "react";

interface DialogDemoProps {
    children: ReactNode;
}

const EditProfileModal = ({children}: DialogDemoProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Editar perfil</DialogTitle>
                    <DialogDescription>Edite as informações pessoais do seu perfil.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <Input
                         Icon={User}
                        id="name"
                        placeholder="Nome"
                        className="col-span-2"
                    />
                    <Input
                     Icon={EnvelopeSimple}
                        id="email"
                        placeholder="Email"
                        className="col-span-2 "
                    />
                    <PasswordInput
                        id="password"
                        placeholder="Senha Atual"
                        className="col-span-1 "
                    />
                    <PasswordInput
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
