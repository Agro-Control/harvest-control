"use client";
import {
    Buildings,
    Factory,
    Truck,
    MapPin,
    Gauge,
    Sun,
    SunHorizon,
    Moon,
    Hash
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
import { createOrderSchema } from "@/utils/validations/createOrderSchema";
import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import SubmitButton from "@/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import OrdemServico from "@/types/ordem-de-servico";
import { useAuth } from "@/utils/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { api } from "@/lib/api";
import { z } from "zod";
import Orders from "@/app/control/orders/page";
import { editOrderSchema } from "@/utils/validations/editOrderSchema";
import OrdemServicoPost from "@/types/ordem-de-servico-post";
import { useGetOperators } from "@/utils/hooks/useGetOperators";
import GetOrdemDeServico from "@/types/get-ordem-de-servico";


interface editOrderProps {
    children: ReactNode;
    ordem: OrdemServico;
    refetchOrders?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetOrdemDeServico, Error>>;
}

type Form = z.infer<typeof editOrderSchema>;




const EditOrderModal = ({ children, ordem, refetchOrders }: editOrderProps) => {
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [statusOptions, setStatusOptions] = useState<{ value: string }[]>([{ value: "A" }, { value: "I" }, { value: "E" }, { value: "C" }, { value: "F" }]);
    const morningOperator = ordem.operadores!.find(operator => operator.turno === 'M');
    const afternoonOperator = ordem.operadores!.find(operator => operator.turno === 'T');
    const nightOperator = ordem.operadores!.find(operator => operator.turno === 'N');


    const form = useForm<Form>({
        resolver: zodResolver(editOrderSchema),
        defaultValues: {
            velocidade_minima: ordem.velocidade_minima!.toString(),
            velocidade_maxima: ordem.velocidade_maxima!.toString(),
            rpm: ordem.rpm!.toString(),
            status: ordem.status,
            operador_manha: morningOperator ? morningOperator.id.toString()! : "nenhum",
            operador_tarde: afternoonOperator ? afternoonOperator.id.toString()! : "nenhum",
            operador_noturno: nightOperator ? nightOperator.id.toString()! : "nenhum",
        }
    });

    const { data: { operador: operadores_manha = [] } = {}, refetch: refetchOPM } = useGetOperators(
        true,
        ordem.unidade_id!,
        "M",
        "A",
        null,
        true,
    );

    const { data: { operador: operadores_tarde = [] } = {}, refetch: refetchOPT } = useGetOperators(
        true,
        ordem.unidade_id!,
        "T",
        "A",
        null,
        true,
    );


    const { data: { operador: operadores_noite = [] } = {}, refetch: refetchOPN } = useGetOperators(
        true,
        ordem.unidade_id!,
        "N",
        "A",
        null,
        true,
    );

    useEffect(() => {
        refetchOPM;
        refetchOPT;
        refetchOPN;
        if (morningOperator && !operadores_manha.some(op => op.id === morningOperator.id)) {
            operadores_manha.push(morningOperator);
        }
        if (afternoonOperator && !operadores_tarde.some(op => op.id === afternoonOperator.id)) {
            operadores_tarde.push(afternoonOperator);
        }
        if (nightOperator && !operadores_noite.some(op => op.id === nightOperator.id)) {
            operadores_noite.push(nightOperator);
        }
        if (onclose)
            form.reset();
    }, [morningOperator, afternoonOperator, nightOperator, operadores_manha, operadores_tarde, operadores_noite, onclose]);



    const editOrderRequest = async (putData: OrdemServicoPost | null) => {
        const { data } = await api.put("/ordens", putData);
        return data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: editOrderRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("putOrder-success"),
            });
            refetchOrders?.();
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
            const titleCode = `postOrder-error-${status}`;
            const descriptionCode = `postOrder-description-error-${status}`;

            toast({
                variant: "destructive",
                title: t(titleCode),
                description: t(descriptionCode),
            });
        },
    });

    const onHandleSubmit = (data: Form) => {
        const operadoresSelecionados = [];

        if (data.operador_manha !== null && data.operador_manha !== "nenhum") {
            operadoresSelecionados.push(parseInt(data.operador_manha));
        }
        if (data.operador_tarde !== null && data.operador_tarde !== "nenhum") {
            operadoresSelecionados.push(parseInt(data.operador_tarde));
        }
        if (data.operador_noturno !== null && data.operador_noturno !== "nenhum") {
            operadoresSelecionados.push(parseInt(data.operador_noturno));
        }

        const operadorIds: number[] = ordem.operadores!.map((operador) => operador.id);

        // Formata os dados com os IDs dos operadores
        const formattedData = {
            id: ordem.id,
            status: data.status,
            velocidade_minima: parseFloat(data.velocidade_minima),
            velocidade_maxima: parseFloat(data.velocidade_maxima),
            rpm: parseInt(data.rpm),
            operadores: operadoresSelecionados ? operadoresSelecionados : operadorIds, // Substitui ordem.operadores pelos IDs extraídos
        };

        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };

    // adicionar Campo data previsao (1 dia minimo)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Atualizar Ordem</DialogTitle>
                    <DialogDescription>Insira as informações para atualziar uma Ordem.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="edit-order-form" className="grid grid-cols-2 gap-4 py-4">
                        <Input disabled Icon={Hash} className=" col-span-2" id="id" placeholder="Código da Ordem" value={ordem.id! || "Não informado"} />
                        <FormField
                            control={form.control}
                            name="operador_manha"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            disabled={ordem.status == "E"}
                                            onValueChange={(value) => {
                                                form.setValue("operador_manha", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={SunHorizon} className="h-10 ">
                                                <SelectValue
                                                    placeholder={morningOperator?.nome || "Selecione o Operador do Turno da Manhã"}
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={"nenhum"}>Nenhum</SelectItem>
                                                {operadores_manha.map((operador) => (
                                                    <SelectItem key={operador.id} value={operador.id!.toString()}>
                                                        {operador.nome}
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
                            name="operador_tarde"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            disabled={ordem.status == "E"}
                                            onValueChange={(value) => {
                                                form.setValue("operador_tarde", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Sun} className="h-10">
                                                <SelectValue
                                                    placeholder={afternoonOperator?.nome || "Selecione o Operador do Turno da Tarde"}
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={"nenhum"}>Nenhum</SelectItem>
                                                {operadores_tarde.map((operador) => (
                                                    <SelectItem key={operador.id} value={operador.id!.toString()}>
                                                        {operador.nome}
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
                            name="operador_noturno"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            disabled={ordem.status == "E"}
                                            onValueChange={(value) => {
                                                form.setValue("operador_noturno", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Moon} className="h-10">
                                                <SelectValue
                                                    placeholder={nightOperator?.nome || "Selecione o Operador do Turno da Noite"}
                                                    {...field}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={"nenhum"}>Nenhum</SelectItem>
                                                {operadores_noite.map((operador) => (
                                                    <SelectItem key={operador.id} value={operador.id!.toString()}>
                                                        {operador.nome}
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
                            disabled={ordem.status == "E"}
                            name="velocidade_maxima"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input
                                            Icon={Gauge}
                                            id="velocidade_maxima"
                                            placeholder="Velocidade Máxima"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            disabled={ordem.status == "E"}
                            name="velocidade_minima"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input
                                            Icon={Gauge}
                                            id="velocidade_minima"
                                            placeholder="Velocidade Mínima"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            disabled={ordem.status == "E"}
                            name="rpm"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Input
                                            Icon={Gauge}
                                            id="rpm"
                                            placeholder="RPM"
                                            {...field}
                                        />
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
                                            <SelectTrigger className="h-10">
                                                <SelectValue placeholder={t(ordem.status!)} {...field} />
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
                    <SubmitButton isLoading={isPending} form="edit-order-form" />
                </DialogFooter>
            </DialogContent >
        </Dialog >
    );
};
export default EditOrderModal;


