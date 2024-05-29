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
import {UsersThree, User, EnvelopeSimple, IdentificationCard, Phone, SunHorizon, Factory} from "@phosphor-icons/react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {createUserSchema} from "@/utils/validations/createUserSchema";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MaskedInput} from "@/components/ui/masked-input";
import {useGetUnits} from "@/utils/hooks/useGetUnits";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/utils/hooks/useAuth";
import {useTranslation} from "react-i18next";
import {InputMask} from "@react-input/mask";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useToast} from "../ui/use-toast";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";
import Operador from "@/types/operador";
import {Gestor} from "@/types/gestor";
import {AxiosError} from "axios";
import api from "@/lib/api";
import {z} from "zod";

interface CreateUserModalProps {
    children: ReactNode;
}

type Form = z.infer<typeof createUserSchema>;
type PostData = Omit<Operador, "id" | "matricula">;

const CreateUserModal = ({children}: CreateUserModalProps) => {
    const [open, setOpen] = useState(false);
    const {toast} = useToast();
    const {t} = useTranslation();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const empresa_id =  user && user?.empresa_id;
    const grupo_id = user && user?.grupo_id;
    const gestor_id =  user && user?.id;
    const whichRoleCreate = isAdmin ? "Gestor" : "Operador";
    const {data: {unidades = []} = {}} = useGetUnits(!isAdmin, empresa_id, null, "A", null);

    const form = useForm<Form>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            nome: "",
            email: "",
            tipo: whichRoleCreate,
            cpf: "",
            telefone: "",
            turno: "",
            unidade_id: "",
        },
    });

    const createUserRequest = async (postData: PostData | null) => {
        const url = isAdmin ? "/gestores" : "/operadores";
        const {data} = await api.post(url, postData);
        return data;
    };

    const {mutate, isPending} = useMutation({
        mutationFn: createUserRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t(`post${whichRoleCreate}-success`),
            });

            const queryKey = isAdmin ? "managers" : "operators";
            queryClient.refetchQueries({queryKey: [queryKey], type: "active", exact: false});
            setOpen(false);
            form.reset();
        },
        onError: (error: AxiosError) => {
            const {response} = error;
            if (!response) {
                toast({
                    variant: "destructive",
                    title: t("network-error"),
                    description: t("network-error-description"),
                });
                return;
            }

            const {status} = response;
            const titleCode = `post${whichRoleCreate}-error-${status}`;
            const descriptionCode = `post${whichRoleCreate}-description-error-${status}`;

            toast({
                variant: "destructive",
                title: t(titleCode),
                description: t(descriptionCode),
            });
        },
    });

    const onHandleSubmit = (data: Form) => {
        if (isAdmin) {
            return;
        }

        const formattedData = {
            ...data,
            tipo: data.tipo.substring(0, 1),
            status: "A",
            data_contratacao: new Date().toISOString(),
            gestor_id:  gestor_id != null ? gestor_id.toString() : null,
            empresa_id: empresa_id,
            grupo_id: grupo_id,
        };
        mutate(formattedData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar usuário</DialogTitle>
                    <DialogDescription>Insira as informações do novo usuário.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onHandleSubmit)}
                        id="user-form"
                        className="grid grid-cols-2 gap-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({field}) => (
                                <FormItem className="col-span-2 ">
                                    <FormControl>
                                        <Input Icon={User} className="" id="name" placeholder="Nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tipo"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input
                                            disabled
                                            Icon={UsersThree}
                                            className=""
                                            id="role"
                                            placeholder="Cargo"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="turno"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("turno", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={SunHorizon} className="h-10 w-full ">
                                                <SelectValue placeholder="Turno" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="M">Manhã</SelectItem>
                                                <SelectItem value="T">Tarde</SelectItem>
                                                <SelectItem value="N">Noite</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <MaskedInput
                                            maskInput={{
                                                input: InputMask,
                                                mask: "___.___.___-__",
                                            }}
                                            Icon={IdentificationCard}
                                            id="identifier"
                                            placeholder="CPF"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input Icon={EnvelopeSimple} id="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <MaskedInput
                                            maskInput={{
                                                input: InputMask,
                                                mask: "(__) _____-____",
                                            }}
                                            Icon={Phone}
                                            id="phone"
                                            placeholder="Telefone"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unidade_id"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("unidade_id", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Factory} className="h-10 w-full ">
                                                <SelectValue placeholder="Unidade" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {unidades.map((unit) => (
                                                    <SelectItem key={unit.id} value={unit.id!.toString()}>
                                                        {unit.nome}
                                                    </SelectItem>
                                                ))}
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
