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
import {QueryObserverResult, RefetchOptions, useMutation, useQueryClient} from "@tanstack/react-query";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {createUserSchema} from "@/utils/validations/createUserSchema";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import {MaskedInput} from "@/components/ui/masked-input";
import {useGetUnits} from "@/utils/hooks/useGetUnits";
import SubmitButton from "@/components/submit-button";
import {ReactNode, useState, useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import GetOperador from "@/types/get-operador";
import {useAuth} from "@/utils/hooks/useAuth";
import {useTranslation} from "react-i18next";
import {InputMask} from "@react-input/mask";
import {Input} from "@/components/ui/input";
import GetGestor from "@/types/get-gestor";
import {useToast} from "../ui/use-toast";
import {useForm} from "react-hook-form";
import Operador from "@/types/operador";
import {AxiosError} from "axios";
import api from "@/lib/api";
import {z} from "zod";

interface CreateUserModalProps {
    children: ReactNode;
    refetchOperators?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetOperador, Error>>;
    refetchManager?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetGestor, Error>>;
}

type Form = z.infer<typeof createUserSchema>;
type PostData = Omit<Operador, "id" | "matricula" | "empresa" | "unidade">;

const CreateUserModal = ({children, refetchOperators, refetchManager}: CreateUserModalProps) => {
    const [open, setOpen] = useState(false);
    const {toast} = useToast();
    const {t} = useTranslation();
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const empresa_id = user && user?.empresa_id;
    const grupo_id = user && user?.grupo_id;
    const gestor_id = user && user?.id;
    const whichRoleCreate = isAdmin ? "Gestor" : "Operador";
    const {data: {unidades = []} = {}} = useGetUnits(!isAdmin, empresa_id, null, "A", null);

    const {data: {empresas = []} = {}, refetch: refetchCompanies} = useGetCompanies(false, grupo_id, null, null, "A", true);

    useEffect(() => {
        if(isAdmin) {
            refetchCompanies();
        }
    },[])

    const form = useForm<Form>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            nome: "",
            email: "",
            tipo: whichRoleCreate,
            cpf: "",
            telefone: "",
            turno: "",
            place_id: "",
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
                duration: 1000,
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t(`post${whichRoleCreate}-success`),
            });
            isAdmin ? refetchManager?.() : refetchOperators?.();
            setOpen(false);
            form.reset();
        },
        onError: (error: AxiosError) => {
            const {response} = error;
            if (!response) {
                toast({
                    duration: 1000,
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
                duration: 1000,
                variant: "destructive",
                title: t(titleCode),
                description: t(descriptionCode),
            });
        },
    });

    const onHandleSubmit = (data: Form) => {
        const { place_id, ...cleanedData } = data;
        if (isAdmin) {   
            const formattedData = {
                ...cleanedData,
                empresa_id: Number(data.place_id),
                cpf: data.cpf.replace(/\D/g, ""),
                telefone: data.telefone.replace(/\D/g, ""),
                tipo: data.tipo.substring(0, 1),
                status: "A",
                data_contratacao: new Date().toISOString(),
                gestor_id: null,
                unidade_id: null,
                grupo_id: grupo_id,
            };
            mutate(formattedData);
            return;
        }

        const formattedData = {
            ...cleanedData,
            unidade_id: data.place_id,
            cpf: data.cpf.replace(/\D/g, ""),
            telefone: data.telefone.replace(/\D/g, ""),
            tipo: data.tipo.substring(0, 1),
            status: "A",
            data_contratacao: new Date().toISOString(),
            gestor_id: gestor_id != null ? gestor_id.toString() : null,
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
                      {!isAdmin ? (<FormField
                            control={form.control}
                            name="place_id"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("place_id", value);
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
                        />)
                            : (
                                <FormField
                            control={form.control}
                            name="place_id"
                            render={({field}) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("place_id", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Factory} className="h-10 w-full ">
                                                <SelectValue placeholder="Empresa" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                empresas.map((company) => (
                                                    <SelectItem key={company.id} value={company.id!.toString()}>
                                                        {company.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            )
                    }
                    </form>
                </Form>
                <DialogFooter>
                    <SubmitButton isLoading={isPending} form="user-form" />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateUserModal;
