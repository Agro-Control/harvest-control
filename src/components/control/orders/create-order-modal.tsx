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
    Grains
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
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useGetOperators } from "@/utils/hooks/useGetOperators";
import { useGetMachines } from "@/utils/hooks/useGetMachines";
import { useGetFields } from "@/utils/hooks/useGetFields";
import { DatePicker } from "@/components/ui/date-picker";
import { useGetUnits } from "@/utils/hooks/useGetUnits";
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


interface createOrderProps {
    children: ReactNode;
}

type Form = z.infer<typeof createOrderSchema>;

const addTimeToDate = (date: Date): Date => {
    // Cria uma nova data baseada na data fornecida
    const newDate = new Date(date);

    // Obtém a hora, minuto e segundo atuais
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentSecond = new Date().getSeconds();

    // Define a hora, minuto e segundo atuais na nova data
    newDate.setHours(currentHour);
    newDate.setMinutes(currentMinute);
    newDate.setSeconds(currentSecond);

    return newDate;
};

const CreateOrderModal = ({ children }: createOrderProps) => {
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [enableFlag, setEnableFlag] = useState<boolean>(false);
    const [derivedEnableFlag, setDerivedEnableFlag] = useState<boolean>(false);

    const form = useForm<Form>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            velocidade_minima: "",
            velocidade_maxima: "",
            rpm: "",
            status: "",
            id_talhao: "",
            id_unidade: "",
            id_gestor: "",
            id_maquina: "",
            id_empresa: !isAdmin ? user!.empresa_id.toString() : "",
            operador_manha: "",
            operador_tarde: "",
            operador_noturno: "",
        }
    });

    const { getValues, setValue, watch } = form;
    const watchIdEmpresa = watch("id_empresa");
    const watchIdUnit = watch("id_unidade");
    const watchDataIncio = watch("data_inicio");
    const watchDataFim = watch("data_fim");


    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(isAdmin ? true : false, isAdmin ?user?.grupo_id : null, null, null, "A");

    const {
        data: { unidades = [] } = {}
    } = useGetUnits(enableFlag, !isAdmin ? user!.empresa_id : parseInt(watchIdEmpresa!), null, "A", null);

    const {
        data: { talhoes = [] } = {}
    } = useGetFields(derivedEnableFlag, parseInt(watchIdUnit!), "A", null);

    const {
        data: { maquinas = [] } = {}
    } = useGetMachines(derivedEnableFlag, parseInt(watchIdUnit!), "A", null);

    const {
        data: { operador: operadores_manha = [] } = {}
    } = useGetOperators(derivedEnableFlag, parseInt(watchIdUnit!), "M", "A", null, true);

    const {
        data: { operador: operadores_tarde = [] } = {}
    } = useGetOperators(derivedEnableFlag, parseInt(watchIdUnit!), "T", "A", null, true);

    const {
        data: { operador: operadores_noite = [] } = {}
    } = useGetOperators(derivedEnableFlag, parseInt(watchIdUnit!), "N", "A", null, true);


    useEffect(() => {
        if (watchIdEmpresa !== "" && watchIdEmpresa !== undefined)
            setEnableFlag(true);
        if (watchIdUnit !== "" && watchIdUnit !== undefined)
            setDerivedEnableFlag(true);
        if (!open) {
            setEnableFlag(false);
            setDerivedEnableFlag(false);
        }
    }, [empresas, unidades, watchDataIncio, watchIdEmpresa, watchIdUnit, enableFlag, derivedEnableFlag]);



    const createOrderRequest = async (postData: OrdemServico | null) => {
        const { data } = await api.post("/ordens", postData);
        return data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: createOrderRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("postOrder-success"),
            });
            queryClient.refetchQueries({ queryKey: ["orders"], type: "active", exact: true });
            setEnableFlag(false);
            setDerivedEnableFlag(false);
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
        const startDate = addTimeToDate(data.data_inicio);
        const endDate = addTimeToDate(data.data_fim);

        const formattedData = {
            status: "A",
            empresa_id: !isAdmin ? user!.empresa_id : parseInt(data.id_empresa!),
            talhao_id: parseInt(data.id_talhao!),
            gestor_id: user?.id,
            unidade_id: parseInt(data.id_unidade!),
            maquina_id: parseInt(data.id_maquina!),
            data_inicio: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
            data_fim: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
            velocidade_minima: parseFloat(data.velocidade_minima),
            velocidade_maxima: parseFloat(data.velocidade_maxima),
            rpm: parseInt(data.rpm),
            operadores_ids: [parseInt(data.operador_manha!),
            parseInt(data.operador_tarde!),
            parseInt(data.operador_noturno!)
            ]
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
                    <DialogTitle className="font-poppins text-green-950">Criar Ordem</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma Ordem.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="create-order-form" className="grid grid-cols-2 gap-4 py-4">
                        {isAdmin && <FormField
                            control={form.control}
                            name="id_empresa"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("id_empresa", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Buildings} className="h-10">
                                                <SelectValue placeholder="Selecione a Empresa" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {empresas.map((company: any) => (
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
                        />}
                        <FormField
                            control={form.control}
                            name="id_unidade"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("id_unidade", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Factory} className="h-10">
                                                <SelectValue placeholder="Selecione a Unidade" {...field} />
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
                        <FormField
                            control={form.control}
                            name="id_maquina"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("id_maquina", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Truck} className="h-10">
                                                <SelectValue placeholder="Selecione a Máquina" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {maquinas.map((machine) => (
                                                    <SelectItem key={machine.id} value={machine.id!.toString()}>
                                                        {machine.nome}
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
                            name="data_inicio"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                       <DatePicker placeHolder={"Data Início"} {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="data_fim"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <DatePicker placeHolder={"Data de Finalização"} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="operador_manha"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("operador_manha", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={SunHorizon} className="h-10 ">
                                                <SelectValue placeholder="Selecione o Operador do Turno da Manhã" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
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
                                            onValueChange={(value) => {
                                                form.setValue("operador_tarde", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Sun} className="h-10">
                                                <SelectValue placeholder="Selecione o Operador do Turno da Tarde" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
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
                                            onValueChange={(value) => {
                                                form.setValue("operador_noturno", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Moon} className="h-10">
                                                <SelectValue placeholder="Selecione o Operador do Turno da Noite" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
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
                            name="id_talhao"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("id_talhao", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Grains} className="h-10 w-[180px] ">
                                                <SelectValue placeholder="Selecione o Talhão" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {talhoes.map((field) => (
                                                    <SelectItem key={field.id} value={field.id!.toString()}>
                                                        {field.codigo}
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


                    </form>
                </Form>
                <DialogFooter>
                    <SubmitButton isLoading={isPending} form="create-order-form" />
                </DialogFooter>
            </DialogContent >
        </Dialog >
    );
};
export default CreateOrderModal;

