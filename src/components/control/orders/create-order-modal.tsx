"use client";
import { Buildings, Factory, Truck, MapPin, Gauge, Sun, SunHorizon, Moon, Grains } from "@phosphor-icons/react";
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
import { InvalidateQueryFilters, QueryCache, QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCompanies } from "@/utils/hooks/useGetCompanies";
import { useGetOperators } from "@/utils/hooks/useGetOperators";
import { useGetMachines } from "@/utils/hooks/useGetMachines";
import { useGetFields } from "@/utils/hooks/useGetFields";
import { DatePicker } from "@/components/ui/date-picker";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useGetUnits } from "@/utils/hooks/useGetUnits";
import { ReactNode, useCallback, useEffect, useState } from "react";
import SubmitButton from "@/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/utils/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { api } from "@/lib/api";
import { z } from "zod";
import OrdemServicoPost from "@/types/ordem-de-servico-post";
import GetOrdemDeServico from "@/types/get-ordem-de-servico";
import GetOperador from "@/types/get-operador";
import { useGetMorningOperators } from "@/utils/hooks/useGetMorningOperators";
import { useGetAfternoonOperators } from "@/utils/hooks/useGetAfternoonOperators";
import { useGetNightOperators } from "@/utils/hooks/useGetNightOperators";

interface createOrderProps {
    children: ReactNode;
    refetchOrders?: (options?: RefetchOptions) => Promise<QueryObserverResult<GetOrdemDeServico, Error>>;

}
type Form = z.infer<typeof createOrderSchema>;


const CreateOrderModal = ({ children, refetchOrders }: createOrderProps) => {
    const queryCache = new QueryCache();
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
        },
    });

    const { getValues, setValue, watch } = form;
    const watchIdEmpresa = watch("id_empresa");
    const watchIdUnit = watch("id_unidade");
    const watchDataIncio = watch("data_inicio");
    const watchDataFim = watch("data_fim");

    const invalidateOperatorsQueries = (
        queryClient: any,
        derivedEnableFlag: boolean,
        watchIdUnit: string | undefined
    ) => {
        queryClient.invalidateQueries(['morningoperators', derivedEnableFlag, parseInt(watchIdUnit!), "M", "A", null, true]);

        queryClient.invalidateQueries(['afternoonoperators', derivedEnableFlag, parseInt(watchIdUnit!), "T", "A", null, true]);

        queryClient.invalidateQueries(['nightoperators', derivedEnableFlag, parseInt(watchIdUnit!), "N", "A", null, true]);
    };
    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(isAdmin ? true : false, isAdmin ? user?.grupo_id : null, null, null, "A", false);

    const { data: { unidades = [] } = {} } = useGetUnits(
        enableFlag,
        !isAdmin ? user!.empresa_id : parseInt(watchIdEmpresa!),
        null,
        "A",
        null,
    );

    const { data: { talhoes = [] } = {}, refetch: refetchU } = useGetFields(
        derivedEnableFlag,
        null,
        parseInt(watchIdUnit!),
        "A",
        null,
    );

    const { data: { maquinas = [] } = {}, refetch: refetchM } = useGetMachines(
        derivedEnableFlag,
        null,
        parseInt(watchIdUnit!),
        "A",
        null,
    );

    const { data: { operador: operadores_manha = [] } = {}, refetch: refetchOPM } = useGetMorningOperators(
        derivedEnableFlag,
        parseInt(watchIdUnit!),
        "M",
        "A",
        null,
        true,
    );

    const { data: { operador: operadores_tarde = [] } = {}, refetch: refetchOPT } = useGetAfternoonOperators(
        derivedEnableFlag,
        parseInt(watchIdUnit!),
        "T",
        "A",
        null,
        true,
    );

    const { data: { operador: operadores_noite = [] } = {}, refetch: refetchOPN } = useGetNightOperators(
        derivedEnableFlag,
        parseInt(watchIdUnit!),
        "N",
        "A",
        null,
        true,
    );

    useEffect(() => {
        queryClient.clear();
        if (watchIdEmpresa !== "" && watchIdEmpresa !== undefined) setEnableFlag(true);
        if (watchIdUnit !== "" && watchIdUnit !== undefined) {
            setDerivedEnableFlag(true);
            invalidateOperatorsQueries(queryClient, derivedEnableFlag, watchIdUnit);
            refetchOPM();
            refetchOPT();
            refetchOPN();
        }
    }, [open,
        queryClient,
        watchIdEmpresa,
        watchIdUnit,
        derivedEnableFlag
    ]);



    const createOrderRequest = async (postData: OrdemServicoPost | null) => {
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
            refetchOrders?.();
            setEnableFlag(false);
            setDerivedEnableFlag(false);
            setOpen(false);
            invalidateOperatorsQueries(queryClient, derivedEnableFlag, watchIdUnit);
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

    const handleOpenChange = useCallback(() => {
        setOpen(prev => !prev);
        invalidateOperatorsQueries(queryClient, derivedEnableFlag, watchIdUnit);
        form.reset();
        queryClient.clear();
        setEnableFlag(false);
        setDerivedEnableFlag(false);


    }, []);

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
        if (data.operador_tarde == "nenhum" && data.operador_manha == "nenhum" && data.operador_noturno == "nenhum") {
            // Impede a submissão e exibe uma mensagem de erro
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Selecione pelo menos um operador!",
            });
            return;
        }

        const formattedData = {
            status: "A",
            empresa_id: !isAdmin ? user!.empresa_id : parseInt(data.id_empresa!),
            talhao_id: parseInt(data.id_talhao!),
            gestor_id: user?.id,
            unidade_id: parseInt(data.id_unidade!),
            maquina_id: parseInt(data.id_maquina!),
            data_inicio: format(data.data_inicio, "yyyy-MM-dd HH:mm:ss"),
            data_previsao_fim: format(data.data_fim, "yyyy-MM-dd HH:mm:ss"),
            velocidade_minima: parseFloat(data.velocidade_minima.replace(',', '.')),
            velocidade_maxima: parseFloat(data.velocidade_maxima.replace(',', '.')),
            rpm: parseInt(data.rpm),
            operadores: operadoresSelecionados,
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };

    // adicionar Campo data previsao (1 dia minimo)
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar Ordem</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma Ordem.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onHandleSubmit)}
                        id="create-order-form"
                        className="grid grid-cols-2 gap-4 py-4"
                    >
                        {isAdmin && (
                            <FormField
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
                            />
                        )}
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
                                            disabled={watchIdUnit === "" ? true : false}
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
                                        <DateTimePicker placeHolder={"Data Início"} {...field} />
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
                                        <DateTimePicker placeHolder={"Data Fim"} {...field} />
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
                                            disabled={watchIdUnit === "" ? true : false}
                                            onValueChange={(value) => {
                                                form.setValue("operador_manha", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={SunHorizon} className="h-10 ">
                                                <SelectValue
                                                    placeholder="Selecione o Operador do Turno da Manhã"
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
                                            disabled={watchIdUnit === "" ? true : false}
                                            onValueChange={(value) => {
                                                form.setValue("operador_tarde", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Sun} className="h-10">
                                                <SelectValue
                                                    placeholder="Selecione o Operador do Turno da Tarde"
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
                                            disabled={watchIdUnit === "" ? true : false}
                                            onValueChange={(value) => {
                                                form.setValue("operador_noturno", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Moon} className="h-10">
                                                <SelectValue
                                                    placeholder="Selecione o Operador do Turno da Noite"
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
                            name="id_talhao"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormControl>
                                        <Select
                                            disabled={watchIdUnit === "" ? true : false}
                                            onValueChange={(value) => {
                                                form.setValue("id_talhao", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Grains} className="h-10 w-full ">
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
                                        <Input Icon={Gauge} id="rpm" placeholder="RPM" {...field} />
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
            </DialogContent>
        </Dialog>
    );
};
export default CreateOrderModal;
