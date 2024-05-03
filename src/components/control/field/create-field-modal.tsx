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
import { ReactNode, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import Talhao from "@/types/talhao";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import SubmitButton from "@/components/submit-button";
import { useAuth } from "@/utils/hooks/useAuth";
import { useGetUnits } from "@/utils/hooks/useGetUnits";
import { parse } from "path";

interface createFieldProps {
    children: ReactNode;
}

type Form = z.infer<typeof editFieldSchema>;

const CreateFieldModal = ({ children }: createFieldProps) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const {
        user,
        isLoading,
    } = useAuth();

    const isGestor = user?.usuario.tipo === "G";

    const form = useForm<z.infer<typeof editFieldSchema>>({
        resolver: zodResolver(editFieldSchema),
        defaultValues: {
            id: 0,
            codigo: "",
            tamanho: "",
            status: "",
            empresa_id: "",
            //   unidade_id: ""
        }
    });

    const { getValues, setValue, watch } = form;
    const watchIdEmpresa = watch("empresa_id");

    const {
        data: { empresas = [] } = {}, // Objeto contendo a lista de empresas
    } = useGetCompanies(isGestor ? parseInt(user?.usuario.empresa_id) : null /*parseInt(user?.grupo_empresarial_id!)*/, null, null, null, null);

    const {
        data: { unidades = [] } = {}, // Objeto contendo a lista de unidades
    } = useGetUnits(true, isGestor ? parseInt(user?.usuario.empresa_id) : null /* parseInt(watchIdEmpresa) */, null, null);


    const [companyOptions, setCompanyOptions] = useState<{ id: number; nome: string }[]>([]);
    const [statusOptions] = useState<{ value: string }[]>([
        { value: 'A' },
        { value: 'I' }
    ]);

    useEffect(() => {
        if (empresas.length > 0) {
            const options = empresas.map((empresa: any) => ({ id: empresa.id, nome: empresa.nome }));
            setCompanyOptions(options);
        }
    }, [empresas, unidades, watchIdEmpresa]);



    const createFieldRequest = async (postData: Talhao | null) => {
        const { data } = await api.post("/talhoes", postData);
        return data;
    };

    const { mutate, isPending, variables } = useMutation({
        mutationFn: createFieldRequest,
        onSuccess: () => {
            toast({
                className: "border-green-500 bg-green-500",
                title: t("success"),
                description: t("postField-success"),
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
            id: null,
            status: typeof data.status === 'string' ? data.status : 'A',
            empresa_id: parseInt(data.empresa_id),
            // unidade_id: parseInt(data.unidade_id),
            gestor_id: user?.usuario.id //sessão ou do seletor se adm/supergestor ter permisssao de criar talhoes  isGestor ? parseInt(user?.usuario.id) : data.gestor_id ,
        };
        // Aqui chama a função mutate do reactquery, jogando os dados formatados pra fazer a logica toda
        mutate(formattedData);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-poppins text-green-950">Criar Talhão</DialogTitle>
                    <DialogDescription>Insira as informações para criar um Talhão.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHandleSubmit)} id="field-form" className="grid grid-cols-2 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="codigo"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Input Icon={Buildings} id="codigo" placeholder="Código" {...field} />
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
                                        <Input Icon={CompassTool} id="tamanho" placeholder="Tamanho" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="empresa_id"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                form.setValue("empresa_id", value);
                                            }}
                                        >
                                            <SelectTrigger Icon={Buildings}>
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
                        {/* <FormField
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
                        /> */


                        }
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
                    <SubmitButton isLoading={isPending} form="field-form" />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateFieldModal;