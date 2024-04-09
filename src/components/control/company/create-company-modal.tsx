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
import {ReactNode} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import Company from "@/types/company";
import { editCompanySchema } from "@/utils/validations/editCompanySchema";

interface CreateCompanyProps {
    company: Company;
    children: ReactNode;
}

const  CreateCompanyModal = ({children, company}: CreateCompanyProps) => {
    const form = useForm<z.infer<typeof editCompanySchema>>({
        resolver: zodResolver(editCompanySchema),
        defaultValues: {
            name: "",
            cnpj: "",
            phone: "",
            zipCode: "",
            state: "",
            city: "",
            neighborhood: "",
            adress: "",
            number: "",
            complement: "",
            responsiblePhone: "",
            responsibleEmail: "",
            responsibleName: "",
        }
    });




    function onSubmit(data: z.infer<typeof editCompanySchema>) {
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar Empresa</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma empresa.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="company-form" className="grid grid-cols-2 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input id="name" placeholder="Nome da Empresa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                       <FormField
                            control={form.control}
                            name="cnpj"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="cnpj" placeholder="CNPJ" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="phone" placeholder="Telefone da Empresa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="zipCode" placeholder="CEP" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="state"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="state" placeholder="Estado" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="city" placeholder="Cidade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="neighborhood"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="neighborhood" placeholder="Bairro" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="adress"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="adress" placeholder="Endereço" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="number"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="number" placeholder="Número" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="complement"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="complement" placeholder="Complemento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="responsibleName"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="responsibleName" placeholder="Nome do Responsável" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="responsibleEmail"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="responsibleEmail" placeholder="Email do Responsável" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="responsiblePhone"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="responsiblePhone" placeholder="Telefone do Responsável" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="company-form"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateCompanyModal;
