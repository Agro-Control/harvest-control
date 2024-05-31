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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {PasswordInput} from "@/components/ui/password-input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {ReactNode} from "react";
import {z} from "zod";

interface EditUserProps {
    userInformation: Operador | Gestor;
    children: ReactNode;
}



const EditUserModal = ({children}: EditUserProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Editar usuário</DialogTitle>
                    <DialogDescription>Insira as informações para alterar o usuário.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="user-form" className="grid grid-cols-2 gap-4 py-4">
                      
                    </form>
                </Form>
                <DialogFooter>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default EditUserModal;
