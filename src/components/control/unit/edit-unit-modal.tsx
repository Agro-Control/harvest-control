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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { editUnitSchema } from "@/utils/validations/editUnitSchema";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useUpdateUnit } from "@/utils/hooks/useUpdateUnit";
import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Unidade from "@/types/unidade";
import { z } from "zod";
import { useAuth } from "@/utils/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import SubmitButton from "@/components/submit-button";


interface EditUnitProps {
    unit: Unidade;
    children: ReactNode;
}

type Form = z.infer<typeof editUnitSchema>;

const EditUnitModal = ({ children, unit }: EditUnitProps) => {
    const updateUnit = useUpdateUnit();
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const user = auth.user?.usuario;
    const isGestor = user?.tipo === "G";
    const [companyOptions, setCompanyOptions] = useState<{ id: number; nome: string }[]>([]);
    const [statusOptions, setStatusOptions] = useState<{ value: string; }[]>([
        { value: 'A' },
        { value: 'I' }
    ]);
    const form = useForm<Form>({
        resolver: zodResolver(editUnitSchema),
        defaultValues: {
            id: unit.id,
            nome: unit.nome,
            cnpj: unit.cnpj,
            // telefone: unit.telefone,
            cep: unit.cep,
            estado: unit.estado,
            cidade: unit.cidade,
            bairro: unit.bairro,
            logradouro: unit.logradouro,
            numero: unit.numero,
            complemento: unit.complemento,
            status: unit.status,
            empresa_id: unit.empresa_id?.toString()
        }
    });

    const { data: { empresas = [] } = {} } = useGetCompanies(isGestor ? parseInt(user.empresa_id) : null, null, null, null, null);


    const { getValues, setValue, watch } = form;
    // Variavel usada para monitorar o campo do cnpj
    const watchEmpresaId = watch("empresa_id");
    const watchCnpj = watch("cnpj");


    useEffect(() => {
        if (empresas.length > 0) {
            const options = empresas.map((empresa: any) => ({ id: empresa.id, nome: empresa.nome }));
            setCompanyOptions(options);
        }
    }, [empresas]);


    const editUnitRequest = async (putData: Unidade | null) => {
        const { data } = await api.post("/unidades", putData);
        return data;
    };

    const { mutate, isPending, variables } = useMutation({
        mutationFn: editUnitRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("putUnit-success"),
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
            cnpj: data.cnpj.replace(/\D/g, ""),
            //telefone: data.telefone.replace(/\D/g, ""),
            cep: data.cep.replace(/\D/g, ""),
            status: data.status,
            empresa_id: isGestor ? parseInt(user?.empresa_id) : parseInt(data.empresa_id),
            gestor_id: user?.id //sessão ou do seletor se adm/supergestor ter permisssao de criar unidades:  isGestor ? parseInt(user?.id) : data.gestor_id ,
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Editar Unidade</DialogTitle>
                    <DialogDescription>Modifique as informações para alterar a Unidade.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="unit-form" className="grid grid-cols-2 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input id="nome" placeholder="Nome da Unidade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cnpj"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input disabled id="cnpj" placeholder="CNPJ" {...field} readOnly />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*    <FormField
                            control={form.control}
                            name="telefone"
                            render={({field}) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="telefone" placeholder="Telefone da Empresa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}*/}

                        <FormField
                            control={form.control}
                            name="cep"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input id="cep" placeholder="CEP" {...field} />
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
                                        <Input id="estado" placeholder="Estado" {...field} />
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
                                        <Input id="cidade" placeholder="Cidade" {...field} />
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
                                        <Input id="bairro" placeholder="Bairro" {...field} />
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
                                        <Input id="logradouro" placeholder="Endereço" {...field} />
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
                                        <Input id="numero" placeholder="Número" {...field} />
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
                                        <Input id="complemento" placeholder="Complemento" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
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
                                            <SelectTrigger className="h-10 w-[180px] ">
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
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("status", value);
                                            }}
                                        >
                                            <SelectTrigger className="h-10 w-[180px]">
                                                <SelectValue placeholder="Selecione o Status" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {t(option.value)}
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
                    <SubmitButton isLoading={isPending} form="unit-form" />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default EditUnitModal;