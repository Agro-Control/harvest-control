"use client";
import {
    Buildings,
    CompassTool,
    Factory,
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
import { editFieldSchema } from "@/utils/validations/editFieldSchema";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useUpdateField } from "@/utils/hooks/useUpdateField";
import ResponseDialog from "@/components/response-dialog";
import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Empresa from "@/types/empresa";
import Talhao from "@/types/talhao";
import { z } from "zod";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/utils/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import SubmitButton from "@/components/submit-button";
import { useGetUnits } from "@/utils/hooks/useGetUnits";
import { useQueryState } from "nuqs";

interface editFieldProps {
    children: ReactNode;
    field: Talhao;
}

type Form = z.infer<typeof editFieldSchema>;

const EditFieldModal = ({ children, field }: editFieldProps) => {
    const [open, setOpen] = useState(false);
    const [statusOptions, setStatusOptions] = useState<{ value: string }[]>([{ value: "A" }, { value: "I" }]);
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [unidade] = useQueryState("Unidades");
    const [empresa] = useQueryState("Empresas");
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";

    const form = useForm<z.infer<typeof editFieldSchema>>({
        resolver: zodResolver(editFieldSchema),
        defaultValues: {
            id: field.id || undefined,
            codigo: field.codigo,
            tamanho: field.tamanho,
            status: field.status,
            unidade_id: field?.unidade_id?.toString(),
        },
    });

    const { getValues, setValue, watch } = form;
    const watchUnidadeId = watch("unidade_id");

    /*
    
    const {
        data: { unidades = [] } = {}, // Objeto contendo a lista de unidades
    } = useGetUnits(true, !isAdmin ? parseInt(user.empresa_id) : (isNaN(parseInt(unidade!)) ? null : parseInt(unidade!)),  null, null);*/



    const editFieldRequest = async (putData: Talhao | null) => {
        const { data } = await api.put("/talhoes", putData);
        return data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: editFieldRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("putField-success"),
            });
            // Refetch na lista de empresas
            queryClient.refetchQueries({ queryKey: ["fields"], type: "active", exact: true });
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
            const titleCode = `postField-error-${status}`;
            const descriptionCode = `postField-description-error-${status}`;

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
            id: field.id,
            status: data.status!,
            unidade_id: parseInt(data.unidade_id),
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Editar Talhão</DialogTitle>
                    <DialogDescription>Modifique as informações para alterar um Talhão.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onHandleSubmit)}
                        id="edit-field-form"
                        className="grid grid-cols-2 gap-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="codigo"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input id="codigo" placeholder="Código" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tamanho"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input id="tamanho" placeholder="Tamanho" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                      {/*<FormField
                            control={form.control}
                            name="unidade_id"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("unidade_id", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Factory}>
                                                <SelectValue placeholder="Selecione a Unidade" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {unidades.map((unidade) => (
                                                    <SelectItem key={unidade.id} value={unidade.id!.toString()}>
                                                        {unidade.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
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
                    <SubmitButton isLoading={isPending} form="edit-field-form" />
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
};
export default EditFieldModal;
