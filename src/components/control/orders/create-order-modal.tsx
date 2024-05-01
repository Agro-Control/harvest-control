"use client";
import {
    Buildings,
    Factory,
    Truck,
    MapPin,
    Gauge,
    IdentificationBadge,
    Sun,
    SunHorizon,
    Moon
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
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { MaskedInput } from "@/components/ui/masked-input";
import { useTranslation } from "react-i18next";
import OrdemServico from "@/types/ordem-de-servico";
import { createOrderSchema } from "@/utils/validations/createOrderSchema";
import { useGetUnits } from "@/utils/hooks/useGetUnits";
import { useGetFields } from "@/utils/hooks/useGetFields";
import { useGetOperators } from "@/utils/hooks/useGetOperators";
import { useGetMachines } from "@/utils/hooks/useGetMachines";
import { useAuth } from "@/utils/hooks/useAuth";


interface createOrderProps {
    children: ReactNode;
}

type Form = z.infer<typeof createOrderSchema>;

const CreateOrderModal = ({ children }: createOrderProps) => {
    const auth = useAuth();
    const user = auth.user?.usuario!;
    const isGestor = user?.tipo === "G";
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const [flag, setFlag] = useState<boolean>(false); //Contexto/Redux?


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
            id_empresa: "",
            operador_manha: "",
            operador_tarde: "",
            operador_noturno: "",
        }
    });

    const { getValues, setValue, watch } = form;
    const watchIdEmpresa = watch("id_empresa");
    const getTalhao = getValues("id_talhao");

    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(isGestor ? parseInt(user.empresa_id) : null, null, null, null, null);


    const {
        data: { unidades = [] } = {}
    } = useGetUnits(flag, parseInt(watchIdEmpresa!), "A", null);

    const {
        data: { talhoes = [] } = {}
    } = useGetFields(flag, parseInt(watchIdEmpresa!), "A", null);

    const {
        data: { maquinas = [] } = {}
    } = useGetMachines(flag, parseInt(watchIdEmpresa!), "A", null);

    const {
        data: { operador: operadores_manha = [] } = {}
    } = useGetOperators(flag, parseInt(watchIdEmpresa!), "Manhã", "A", null, true);

    const {
        data: { operador: operadores_tarde = [] } = {}
    } = useGetOperators(flag, parseInt(watchIdEmpresa!), "Tarde", "A", null, true);

    const {
        data: { operador: operadores_noite = [] } = {}
    } = useGetOperators(flag, parseInt(watchIdEmpresa!), "Noite", "A", null, true);


    useEffect(() => {
        if (watchIdEmpresa !== "" && watchIdEmpresa !== undefined)
            setFlag(true);

        console.log("talhao:" + getTalhao);
    }, [empresas, watchIdEmpresa, flag]);



    const createCompanyRequest = async (postData: OrdemServico | null) => {
        const { data } = await api.post("/ordens", postData);
        return data;
    };

    const { mutate, isPending, variables } = useMutation({
        mutationFn: createCompanyRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: "Sucesso!",
                description: "A ordem foi cadastrada no sistema com sucesso.",
            });
            queryClient.refetchQueries({ queryKey: ["orders"], type: "active", exact: true });
            setFlag(false);
            setOpen(false);
            form.reset();
        },
        onError: (error: AxiosError) => {
            toast({
                variant: "destructive",
                title: "Erro!",
                description: "Ocorreu um erro ao cadastrar a ordem.",
            });
        },
    });

    const onHandleSubmit = (data: Form) => {
        const formattedData = {
            status: "A",
            id_empresa: parseInt(data.id_empresa!),
            id_talhao: parseInt(data.id_talhao!),
            id_gestor: user.id,
            id_unidade: parseInt(data.id_unidade!),
            id_maquina: parseInt(data.id_maquina!),
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar Ordem</DialogTitle>
                    <DialogDescription>Insira as informações para criar uma Ordem.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="company-form" className="grid grid-cols-2 gap-4 py-4">
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
                                                {empresas.map((company : any) => (
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
                        
                        <FormField
                            control={form.control}
                            name="id_maquina"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
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
                            name="id_unidade"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
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
                                            <SelectTrigger Icon={MapPin} className="h-10 w-[180px] ">
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
                                            placeholder="Velociadade Mínima"
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


                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="company-form"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    );
};
export default CreateOrderModal;

