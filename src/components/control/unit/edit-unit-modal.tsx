"use client";
import {
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
import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Unidade from "@/types/unidade";
import { z } from "zod";
import { useAuth } from "@/utils/hooks/useAuth";
import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import SubmitButton from "@/components/submit-button";
import { handleCepData } from "@/utils/handleCepData";
import { Button } from "@/components/ui/button";
import GetUnidade from "@/types/get-unidade";



interface EditUnitProps {
    unit: Unidade;
    children: ReactNode;
    refetchUnits: (options?: RefetchOptions) => Promise<QueryObserverResult<GetUnidade, Error>>
}

type Form = z.infer<typeof editUnitSchema>;

const EditUnitModal = ({ children, unit, refetchUnits }: EditUnitProps) => {
    const [isLoadingCep, setIsLoadingCep] = useState(false);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const auth = useAuth();
    const user = auth.user;
    const isAdmin = user?.tipo === "D";
    const [statusOptions, setStatusOptions] = useState<{ value: string; }[]>([
        { value: 'A' },
        { value: 'I' }
    ]);
    const form = useForm<Form>({
        resolver: zodResolver(editUnitSchema),
        defaultValues: {
            id: unit.id,
            nome: unit.nome,
            cep: unit.cep,
            estado: unit.estado,
            cidade: unit.cidade,
            bairro: unit.bairro,
            logradouro: unit.logradouro || "",
            numero: unit.numero || "",
            complemento: unit.complemento || "",
            status: unit.status,
            empresa_id: unit.empresa_id?.toString()
        }
    });

    const { getValues, setValue, watch } = form;
    const watchCep = watch("cep");
    const cepValidLength = watchCep ? watchCep.length === 8 : false;

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

    const editUnitRequest = async (putData: Unidade | null) => {
        const { data } = await api.put("/unidades", putData);
        return data;
    };

    const { mutate, isPending } = useMutation({
        mutationFn: editUnitRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("putUnit-success"),
            });
            // Refetch na lista de empresas
            refetchUnits?.();
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
            cep: data.cep.replace(/\D/g, ""),
            empresa_id: !isAdmin ? user?.empresa_id : parseInt(data.empresa_id),
            gestor_id: unit.gestor_id,
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Editar Unidade</DialogTitle>
                    <DialogDescription>Modifique as informações para alterar a Unidade.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="update-unit-form" className="grid grid-cols-2 gap-4 py-4">
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
                                            <Input
                                                {...field}
                                                Icon={NavigationArrow}
                                                placeholder="CEP"
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
                                        <Input disabled Icon={MapPin} id="cidade" placeholder="Cidade" {...field} />
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

                        {/*isAdmin && <FormField
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
                        {isAdmin && <FormField
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
                    <SubmitButton isLoading={isPending} form="update-unit-form" />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default EditUnitModal;