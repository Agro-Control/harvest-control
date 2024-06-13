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
import { useMutation, useQueryClient } from "@tanstack/react-query";
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


interface editOrderProps {
    children: ReactNode;
    ordem: OrdemServico;
}

type Form = z.infer<typeof editOrderSchema>;




const EditOrderModal = ({ children, ordem }: editOrderProps) => {
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [statusOptions, setStatusOptions] = useState<{ value: string }[]>([{ value: "A" }, { value: "I" }, { value: "E" }, { value: "C" }, { value: "F" }]);

    const form = useForm<Form>({
        resolver: zodResolver(editOrderSchema),
        defaultValues: {
            velocidade_minima: ordem.velocidade_minima!.toString(),
            velocidade_maxima: ordem.velocidade_maxima!.toString(),
            rpm: ordem.rpm!.toString(),
            status: ordem.status,
        }
    });



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
            queryClient.refetchQueries({ queryKey: ["orders"], type: "active", exact: true });
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
        const operadorIds: number[] = ordem.operadores!.map((operador) => operador.id);

    // Formata os dados com os IDs dos operadores
    const formattedData = {
        id: ordem.id,
        status: data.status,
        velocidade_minima: parseFloat(data.velocidade_minima),
        velocidade_maxima: parseFloat(data.velocidade_maxima),
        rpm: parseInt(data.rpm),
        operadores: operadorIds, // Substitui ordem.operadores pelos IDs extraídos
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

