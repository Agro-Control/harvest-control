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
import {ReactNode, useState} from "react";
import {Eye, EyeClosed} from "@phosphor-icons/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {z} from "zod";

interface DialogDemoProps {
    children: ReactNode;
}

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Campo obrigatório",
    }),
    role: z.string(),
    email: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    password: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    identifier: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    phone: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    address: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    state: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    city: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    neighborhood: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    street: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    number: z.string().min(2, {
        message: "Os campos não podem estar vazios",
    }),
    company: z.string(),
});

const CreateUserModal = ({children}: DialogDemoProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
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

    function onSubmit(data: z.infer<typeof FormSchema>) {
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
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="name" placeholder="Nome" {...field} />
                                    </FormControl>
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
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <div className="relative w-full">
                                            <div
                                                className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <Eye className="h-5 w-5" color="#052e14" />
                                                ) : (
                                                    <EyeClosed className="h-5 w-5" color="#052e14" />
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Senha"
                                                className="pr-9"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
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
