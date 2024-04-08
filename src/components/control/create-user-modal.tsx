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
import {createUserSchema} from "@/utils/validations/createUserSchema";

interface CreateUserModalProps {
    children: ReactNode;
}

const CreateUserModal = ({children}: CreateUserModalProps) => {
    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            password: "",
            identifier: "",
            phone: "",
            address: "",
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            number: "",
            company: "",
        },
    });

    function onSubmit(data: z.infer<typeof createUserSchema>) {
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar usuário</DialogTitle>
                    <DialogDescription>Insira as informações do novo usuário.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id="user-form" className="grid grid-cols-2 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input className="" id="name" placeholder="Nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("role", value);
                                            }}
                                        >
                                            <SelectTrigger className="h-10 w-[180px] ">
                                                <SelectValue placeholder="Cargo" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="manager">Gestor</SelectItem>
                                                <SelectItem value="operator">Operador</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input id="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <PasswordInput {...field} placeholder="Senha" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="identifier" placeholder="CPF" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="phone" placeholder="Telefone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("company", value);
                                            }}
                                        >
                                            <SelectTrigger className="h-10 w-[180px] ">
                                                <SelectValue placeholder="Empresa" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="company1">Empresa 1</SelectItem>
                                                <SelectItem value="company2">Empresa 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="address" placeholder="CEP" {...field} />
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
                            name="street"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="street" placeholder="Rua" {...field} />
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
                    </form>
                </Form>
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
export default CreateUserModal;
