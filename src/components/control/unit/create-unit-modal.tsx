"use client";
import {
    Buildings,
    MapPin,
    MapTrifold,
    NavigationArrow,
    Factory,
    House,
    Hash,
    Flag,
    MagnifyingGlass,
    CircleNotch,
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
import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { handleCepData } from "@/utils/handleCepData";
import { Button } from "@/components/ui/button";


interface createUnitProps {
    children: ReactNode;
}

type Form = z.infer<typeof editUnitSchema>;

const CreateUnitModal = ({ children }: createUnitProps) => {
    const [companyOptions, setCompanyOptions] = useState<{ id: number; nome: string }[]>([]);
    const [open, setOpen] = useState(false);
    const [isLoadingCep, setIsLoadingCep] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";

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
            status: "A",
            empresa_id: !isAdmin ? user!.empresa_id.toString() : "",
        }
    });

    const { getValues, setValue, watch } = form;
    // Variavel usada para monitorar o campo do cnpj
    const watchEmpresaId = watch("empresa_id");

    const watchCep = watch("cep");
    const cepValidLength = watchCep ? watchCep.length === 9 : false;


    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
        error, // Erro retornado pela Api
        isError, // Booleano que indica se houve erro
        isLoading, // Booleano que indica se está carregando
        refetch, // Função que faz a requisição novamente
        isRefetching, // Booleano que indica se está fazendo a requisição novamente
    } = useGetCompanies(isAdmin ? true : false, isAdmin ? user?.grupo_id : null, null, null, "A");


    useEffect(() => {
        if (empresas.length > 0) {
            const options = empresas.map((empresa: any) => ({ id: empresa.id, nome: empresa.nome }));
            setCompanyOptions(options);
        }
    }, [empresas]);

    const onHandleClick = async () => {
        setIsLoadingCep(true);
        const { cep } = getValues();
        const formattedCep = cep.replace(/\D/g, "");
        const isLengthValid = formattedCep.length === 8;

        if (isLengthValid) {
            const response = await handleCepData(formattedCep, setValue);
            if (response.error === true) {
                toast({
                    variant: "destructive",
                    title: "Falha ao preencher dados do CEP",
                    description:
                        "Ocorreu um erro na busca, ou excedeu o limite de tentativas. Por favor, tente novamente mais tarde.",
                });
            }
        }

        setIsLoadingCep(false);
    };

    const createUnitRequest = async (postData: Unidade | null) => {
        const { data } = await api.post("/unidades", postData);
        return data;
    };

    const { mutate, isPending } = useMutation({
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
        const empresaSelecionada = empresas.find(empresa => empresa.id === parseInt(data.empresa_id));
        const formattedData = {
            ...data,
            //telefone: data.telefone.replace(/\D/g, ""),
            cep: data.cep.replace(/\D/g, ""),
            status: "A",
            empresa_id: !isAdmin ? user?.empresa_id : parseInt(data.empresa_id),
            gestor_id: !isAdmin ? user?.id : empresaSelecionada?.gestor_id!
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
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
                                <FormItem className="col-span-2 flex w-full flex-row items-start justify-center gap-3 space-y-0">
                                    <div className="flex w-full flex-col gap-2">
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
                                    </div>
                                    <Button
                                        onClick={onHandleClick}
                                        disabled={cepValidLength ? false : true}
                                        type="button"
                                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                                    >
                                        {isLoadingCep ? (
                                            <CircleNotch className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <MagnifyingGlass className="h-5 w-5" />
                                        )}
                                    </Button>
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
                                            disabled
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

                        {isAdmin && <FormField
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
                                            <SelectTrigger Icon={Buildings} className="h-10">
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