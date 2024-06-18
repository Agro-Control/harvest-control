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
import { Factory, GasPump, GearSix, Truck, Wrench } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {format} from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createMachineSchema } from "@/utils/validations/createMachineSchema";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/utils/hooks/useAuth";
import { useGetUnits } from "@/utils/hooks/useGetUnits";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import Maquina from "@/types/maquina";
import { DatePicker } from "@/components/ui/date-picker";
import SubmitButton from "@/components/submit-button";
import GetMaquina from "@/types/get-maquina";

interface EditMachineModalProps {
    children: ReactNode;
    maquina: Maquina;
    refetchMachines?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetMaquina, Error>>
}

type Form = z.infer<typeof createMachineSchema>;

const EditMachineModal = ({ maquina,  children, refetchMachines }: EditMachineModalProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";

    const [statusOptions] = useState<{ value: string }[]>([
        { value: 'A' },
        { value: 'I' },
        { value: 'R'}
    ]);

    const form = useForm<z.infer<typeof createMachineSchema>>({
        resolver: zodResolver(createMachineSchema),
        defaultValues: {
            nome: maquina.nome || "",
            fabricante: maquina.fabricante || "",
            modelo: maquina.modelo || "",
            status: maquina.status || "",
            capacidade_operacional: maquina.capacidade_operacional!.toString() || "",
         //   data_aquisicao: new Date(),
            unidade_id: maquina.unidade_id!.toString(),
        },
    });
    const { getValues, setValue, watch } = form;
    const watchIdUnidade = watch("unidade_id");

    useEffect(() => {
    
    }, [watchIdUnidade]);

   /* const {
        data: { unidades = [] } = {}, // Objeto contendo a lista de unidades
    } = useGetUnits(true, isAdmin ? parseInt(user.empresa_id) : (isNaN(parseInt(watchIdEmpresa!)) ? null : parseInt(watchIdEmpresa!)), "A", null);*/

    const createMachineRequest = async (putData: Maquina | null) => {
        const { data } = await api.put("/maquinas", putData);
        return data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: createMachineRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("putMachine-success"),
            });

            refetchMachines?.();
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
            const titleCode = `postMachine-error-${status}`;
            const descriptionCode = `postMachine-description-error-${status}`;

            toast({
                variant: "destructive",
                title: t(titleCode),
                description: t(descriptionCode),
            });
        },
    });

    const onHandleSubmit = (data: Form) => {
        const formattedData = {
            id: maquina.id,
            fabricante: data.fabricante!,
            modelo: data.modelo!,
            nome: data.nome!,
            data_aquisicao: maquina.data_aquisicao, //format(data.data_aquisicao,'yyyy-MM-dd HH:mm:ss') ,
            status: data.status!,
            capacidade_operacional: 0,
            unidade_id: !isAdmin ? parseInt(user!.unidade_id) : parseInt(data.unidade_id),
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Editar Máquina</DialogTitle>
                    <DialogDescription>Insira as informações para editar uma Máquina.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="edit-machine-form" className="grid grid-cols-2 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input Icon={Truck} id="nome" placeholder="Nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="modelo"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input Icon={GearSix} id="modelo" placeholder="Modelo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fabricante"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input Icon={Wrench} id="fabricante" placeholder="Fabricante" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                       {/* <FormField
                            control={form.control}
                            name="capacidade_operacional"
                            render={({ field }) => (
                                <FormItem className="col-span-1 ">
                                    <FormControl>
                                        <Input Icon={GasPump} id="capacidade_operacional" placeholder="Capacidade Operacional" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />*/}

                        {/*isAdmin && <FormField
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
                        />*/}

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
                                            <SelectTrigger className="h-10">
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
                    <SubmitButton isLoading={isPending} form="edit-machine-form" />
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );

};
export default EditMachineModal;
