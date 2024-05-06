"use client";
import {
    Buildings,
    UserPlus,
    MapPin,
    MapTrifold,
    NavigationArrow,
    Factory,
    House,
    Hash,
    Flag,
} from "@phosphor-icons/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { editUnitSchema } from "@/utils/validations/editUnitSchema";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnitCnpjData } from "@/utils/handleCnpjData";
import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import Unidade from "@/types/unidade";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { MaskedInput } from "@/components/ui/masked-input";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/utils/hooks/useAuth";
import SubmitButton from "@/components/submit-button";
import { useGetManagers } from "@/utils/hooks/useGetManagers";


interface createUnitProps {
    children: ReactNode;
}

type Form = z.infer<typeof editUnitSchema>;

const CreateUnitModal = ({ children }: createUnitProps) => {
    const [companyOptions, setCompanyOptions] = useState<{ id: number; nome: string }[]>([]);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const user = auth.user?.usuario;
    const isGestor = user?.tipo === "G";

    const form = useForm<Form>({
        resolver: zodResolver(editUnitSchema),
        defaultValues: {
            nome: "",
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            logradouro: "",
            numero: "",
            complemento: "",
            status: "",
            empresa_id: isGestor ? user.empresa_id.toString() : "",
            gestor_id: isGestor ? user.id.toString() : "",
        }
    });

    const { getValues, setValue, watch } = form;
    // Variavel usada para monitorar o campo do cnpj
    const watchEmpresaId = watch("empresa_id");

    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(!isGestor ? true : false,!isGestor ? parseInt(user?.grupo_id!) : null, null, null, null, null);

    const {
        data: { gestor: gestores = [] } = {}, // Objeto contendo a lista de gestores
    } = useGetManagers(!isGestor ? parseInt(user?.grupo_id!) : null, null, null);

    useEffect(() => {
        if (empresas.length > 0) {
            const options = empresas.map((empresa: any) => ({ id: empresa.id, nome: empresa.nome }));
            setCompanyOptions(options);
        }
    }, [empresas]);

    const createUnitRequest = async (postData: Unidade | null) => {
        const { data } = await api.post("/unidades", postData);
        return data;
    };

    const { mutate, isPending, variables } = useMutation({
        mutationFn: createUnitRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("postUnit-success"),
            });
            // Refetch na lista de empresas
            queryClient.refetchQueries({ queryKey: ["units"], type: "active", exact: true });
            setOpen(false);
            form.reset();
        },
        onError: (error: AxiosError) => {
            const { response } = error;
            if (!response) {
                toast({
                    variant: "destructive",
                    title: t("network-error"),
                    description: t("network-error-description"),
                });
                return;
            }

            const { status } = response;
            const titleCode = `postUnit-error-${status}`;
            const descriptionCode = `postUnit-description-error-${status}`;

            toast({
                variant: "destructive",
                title: t(titleCode),
                description: t(descriptionCode),
            });
        },
    });

    const onHandleSubmit = (data: Form) => {
        const formattedData = {
            ...data,
            //telefone: data.telefone.replace(/\D/g, ""),
            cep: data.cep.replace(/\D/g, ""),
            status: data.status,
            empresa_id: isGestor ? parseInt(user?.empresa_id) : parseInt(data.empresa_id),
            gestor_id: isGestor ? user?.id : parseInt(data.gestor_id),
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar Unidade</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma Unidade.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="unit-form" className="grid grid-cols-2 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input
                                            Icon={Factory}
                                            id="nome"
                                            placeholder="Nome da Unidade"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="cep"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <MaskedInput
                                            {...field}
                                            Icon={NavigationArrow}
                                            placeholder="CEP"
                                            maskInput={{
                                                input: InputMask,
                                                mask: "_____-___",
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input
                                            
                                            Icon={MapTrifold}
                                            id="estado"
                                            placeholder={t(field.name)}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cidade"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input Icon={MapPin} id="cidade" placeholder="Cidade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bairro"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input Icon={Factory} id="bairro" placeholder="Bairro" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="logradouro"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input Icon={House} id="logradouro" placeholder="Endereço" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numero"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input Icon={Hash} id="numero" placeholder="Número" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="complemento"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input Icon={Flag} id="complemento" placeholder="Complemento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isGestor && <FormField
                            control={form.control}
                            name="empresa_id"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input disabled Icon={Buildings} id="empresa_id" placeholder={companyOptions[0].nome || "Nome da Empresa"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}

                        {!isGestor && <FormField
                            control={form.control}
                            name="empresa_id"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("empresa_id", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Buildings} className="h-10 w-[180px] ">
                                                <SelectValue placeholder="Selecione a Empresa" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {companyOptions.map((company) => (
                                                    <SelectItem key={company.id} value={company.id.toString()}>
                                                        {company.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {!isGestor && <FormField
                            control={form.control}
                            name="gestor_id"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("gestor_id", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={UserPlus}>
                                                <SelectValue placeholder="Selecione o Gestor" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {gestores.map((gestor) => (
                                                    <SelectItem key={gestor.id} value={gestor.id.toString() || ""}>
                                                        {gestor.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                    </form>
                </Form>
                <DialogFooter>
                    <SubmitButton isLoading={isPending} form="unit-form" />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateUnitModal;